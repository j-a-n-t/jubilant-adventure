import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TaskDocument, TaskSchema } from "./schemas/task.schema";
import mongoose, { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create.task.dto";
import { GraphQLError } from "graphql/error";
import { TaskEntity } from "./entities/task.entity";
import { TaskAdapter } from "./adapter";
import { ResponseDto } from "../common/dto/response.dto";
import { ResponseService } from "../common/response.service";
import { EditTaskDto } from "./dto/edit.task.dto";

@Injectable()
class TaskService {
  constructor(
    @InjectModel(TaskSchema.name)
    private readonly taskModel: Model<TaskDocument>,
    private readonly responseService: ResponseService<TaskEntity>,
    private readonly taskAdapter: TaskAdapter
  ) {
  }

  public async createTask(params: CreateTaskDto): Promise<ResponseDto<TaskEntity>> {
    try {
      const document = new this.taskModel(params);
      const saveDocument = await document.save();
      if (!saveDocument)
        return this.responseService.clientResponse(false, "Task not created", HttpStatus.BAD_REQUEST, null);
      return this.responseService.clientResponse(true, "Task created successfully", HttpStatus.CREATED, this.taskAdapter.TaskDtoToEntity(saveDocument)
      );
    } catch (e) {
      if (e.code === 11000) {
        throw new GraphQLError("Task already exists", {
          extensions: { code: HttpStatus.CONFLICT }
        });
      }
      throw new GraphQLError("An error occurred", {
        extensions: { code: HttpStatus.INTERNAL_SERVER_ERROR }
      });
    }
  }

  public async updateTask(params: EditTaskDto) {
    try {
      const document: ResponseDto<TaskEntity> = await this.getTaskById(params.taskId);
      if (!document.data) return document;
      const updateDocument = await this.taskModel.findOneAndUpdate(
        { _id: params.taskId },
        { ...params, actualizado: new Date() },
        { new: true }).exec();
      if (!updateDocument) return this.responseService.clientResponse(false, "Task not updated", HttpStatus.BAD_REQUEST, null);
      return this.responseService.clientResponse(true, "Task updated successfully", HttpStatus.OK, this.taskAdapter.TaskDtoToEntity(updateDocument));
    } catch (e) {
      if (e.code === 11000) {
        throw new GraphQLError("Title Task already exists", {
          extensions: { code: HttpStatus.CONFLICT }
        });
      }
      throw new GraphQLError("An error occurred", {
        extensions: { code: HttpStatus.INTERNAL_SERVER_ERROR }
      });
    }
  }

  public async deleteTask(taskId: mongoose.Types.ObjectId): Promise<ResponseDto<TaskEntity>> {
    try {
      const document: ResponseDto<TaskEntity> = await this.getTaskById(taskId);
      if (!document.data) return document;
      const deleteDocument = await this.taskModel.deleteOne({ _id: taskId }).exec();
      if (!deleteDocument.acknowledged) return this.responseService.clientResponse(false, "Task not deleted", HttpStatus.BAD_REQUEST, null);
      return this.responseService.clientResponse(true, "Task deleted successfully", HttpStatus.OK, null);
    } catch (e) {
      throw new GraphQLError("An error occurred", {
        extensions: { code: HttpStatus.INTERNAL_SERVER_ERROR }
      });
    }
  }

  public async getTasks(): Promise<ResponseDto<TaskEntity[]>> {
    try {
      const document = await this.taskModel.find().sort({ creado: -1 }).exec();
      if (!document) return this.responseService.clientArrayResponse(false, "Tasks not found", HttpStatus.NOT_FOUND, []);
      return this.responseService.clientArrayResponse(true, "Tasks found", HttpStatus.OK, this.taskAdapter.TasksDtoToEntity(document));
    } catch (e) {
      throw new GraphQLError("An error occurred", {
        extensions: { code: HttpStatus.INTERNAL_SERVER_ERROR }
      });
    }
  }

  public async getTaskById(taskId: mongoose.Types.ObjectId): Promise<ResponseDto<TaskEntity>> {
    try {
      const document = await this.taskModel.findOne({ _id: taskId }).exec();
      if (!document) return this.responseService.clientResponse(false, "Task not found", HttpStatus.NOT_FOUND, null);
      return this.responseService.clientResponse(true, "Task found", HttpStatus.OK, this.taskAdapter.TaskDtoToEntity(document));
    } catch (e) {
      throw new GraphQLError("An error occurred", {
        extensions: { code: HttpStatus.INTERNAL_SERVER_ERROR }
      });
    }
  }
}

export { TaskService };
