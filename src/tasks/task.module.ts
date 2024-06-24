import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskResolver } from './task.resolver';
import { TaskSchema, TaskModel } from './schemas/task.schema';
import { TaskService } from './task.service';
import { TaskAdapter } from './adapter';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskSchema.name, schema: TaskModel }]),
    CommonModule,
  ],
  providers: [TaskResolver, TaskService, TaskAdapter],
})
class TaskModule {}

export { TaskModule };
