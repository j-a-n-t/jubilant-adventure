import { ArgumentMetadata, HttpStatus, PipeTransform } from "@nestjs/common";
import { EditTaskInput } from "../dto/inputs/edit.task.input";
import { GraphQLError } from "graphql/error";
import mongoose from "mongoose";

class ValidateEditInputPipe implements PipeTransform {
  transform(value: EditTaskInput, metadata: ArgumentMetadata): EditTaskInput {
    if (!value) throw new GraphQLError("EditTaskInput is empty", { extensions: { code: HttpStatus.BAD_REQUEST } });
    if (!value.taskId) throw new GraphQLError("TaskId is required", { extensions: { code: HttpStatus.BAD_REQUEST } });
    if (!mongoose.isValidObjectId(value.taskId)) throw new GraphQLError("TaskId is invalid ID", { extensions: { code: HttpStatus.BAD_REQUEST } });
    if (!value.title) throw new GraphQLError("Title task is required", { extensions: { code: HttpStatus.BAD_REQUEST } });
    if (!value.task) throw new GraphQLError("Task is required", { extensions: { code: HttpStatus.BAD_REQUEST } });
    return value;
  }
}

export { ValidateEditInputPipe };