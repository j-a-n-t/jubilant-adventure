import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose from 'mongoose';

@ObjectType({ description: 'Task Entity' })
class TaskEntity {
  @Field(() => ID)
  taskId: mongoose.Types.ObjectId;

  @Field(() => String)
  title: string;

  @Field(() => String)
  task: string;

  @Field(() => Date)
  createAt: Date;

  @Field(() => Date)
  updateAt: Date;
}

export { TaskEntity };
