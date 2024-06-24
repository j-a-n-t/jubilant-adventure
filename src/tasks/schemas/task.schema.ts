import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

type TaskDocument = HydratedDocument<TaskSchema>;

@Schema({ collection: 'tareas', timestamps: false })
class TaskSchema {
  @Prop({ required: true, unique: true, type: String })
  titulo: string;

  @Prop({ required: true, type: String })
  tarea: string;

  @Prop({ required: true, type: Date, default: new Date() })
  creado: Date;

  @Prop({ required: true, type: Date, default: new Date() })
  actualizado: Date;
}

const TaskModel: mongoose.Schema<TaskSchema> =
  SchemaFactory.createForClass(TaskSchema);

export { TaskSchema, TaskModel, TaskDocument };
