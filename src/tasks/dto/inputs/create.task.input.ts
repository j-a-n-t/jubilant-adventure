import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateTaskInput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  task: string;
}
export { CreateTaskInput };
