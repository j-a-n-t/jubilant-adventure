import { CreateTaskDto } from './create.task.dto';
import mongoose from 'mongoose';

class TaskDto extends CreateTaskDto {
  public _id: mongoose.Types.ObjectId;
  public creado: Date;
  public actualizado: Date;
}

export { TaskDto };
