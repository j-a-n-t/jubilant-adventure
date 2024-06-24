import { Mutation, Query, Resolver, Subscription, Args, ID } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { TaskService } from "./task.service";
import { TaskEntity } from "./entities/task.entity";
import { CreateTaskInput } from "./dto/inputs/create.task.input";
import { TaskAdapter } from "./adapter";
import { responseEntity } from "./entities/response.entity";
import { ResponseDto } from "../common/dto/response.dto";
import { EditTaskInput } from "./dto/inputs/edit.task.input";
import { ValidateEditInputPipe } from "./pipes/validate.edit.input.pipe";
import { EditTaskDto } from "./dto/edit.task.dto";
import mongoose from "mongoose";
import { ValidateMongoosePipe } from "../common/pipes/validate.mongoose.pipe";

@Resolver(() => TaskEntity)
class TaskResolver {
  private pubSub: PubSub = new PubSub();

  constructor(
    private readonly taskService: TaskService,
    private readonly taskAdapter: TaskAdapter) {
  }

  @Mutation(() => responseEntity)
  public async createTask(@Args("createTaskInput") createTaskInput: CreateTaskInput): Promise<ResponseDto<TaskEntity>> {
    await this.pubSub.publish("taskAdded", {
      taskAdded: "Registro almacenado!"
    });
    return this.taskService.createTask(
      this.taskAdapter.createTaskInputToDto(createTaskInput)
    );
  }

  @Mutation(() => responseEntity)
  public async updateTask(@Args("editTaskInput", ValidateEditInputPipe) editTaskInput: EditTaskInput): Promise<ResponseDto<TaskEntity>> {
    const dataMapper: EditTaskDto = this.taskAdapter.editTaskInputToDto(editTaskInput);
    return this.taskService.updateTask(dataMapper);
  }

  @Mutation(() => responseEntity)
  public async deleteTask(@Args("taskId", {type: ()=> ID, nullable:true}, ValidateMongoosePipe) taskId: mongoose.Types.ObjectId): Promise<ResponseDto<TaskEntity>>{
    return this.taskService.deleteTask(taskId);
  }

  @Query(() => responseEntity)
  public async getTasks(): Promise<ResponseDto<TaskEntity[]>> {
    return await this.taskService.getTasks();
  }

  @Query(() => responseEntity)
  public async getTask(@Args("taskId", {type: ()=> ID, nullable:true}, ValidateMongoosePipe) taskId: mongoose.Types.ObjectId): Promise<ResponseDto<TaskEntity>>{
    return await this.taskService.getTaskById(taskId);
  }

  @Subscription(() => String)
  async taskAdded() {
    return this.pubSub.asyncIterator("taskAdded");
  }
}

export { TaskResolver };
