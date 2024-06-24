import { ObjectType, Field } from '@nestjs/graphql';
import { TaskEntity } from './task.entity';

@ObjectType()
class ResponseTaskEntity {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;

  @Field(() => Number)
  code: number;

  @Field(() => TaskEntity)
  data: TaskEntity;
}

export { ResponseTaskEntity };
