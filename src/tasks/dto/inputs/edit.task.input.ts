import { InputType, Field, ID } from "@nestjs/graphql";
import mongoose from "mongoose";

@InputType()
class EditTaskInput {
  @Field(() => ID, { nullable: true })
  taskId: mongoose.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  task: string;
}

export { EditTaskInput };