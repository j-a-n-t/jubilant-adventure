import { CreateTaskDto } from "./create.task.dto";
import mongoose from "mongoose";

class EditTaskDto extends CreateTaskDto {
  taskId: mongoose.Types.ObjectId;
}

export { EditTaskDto };