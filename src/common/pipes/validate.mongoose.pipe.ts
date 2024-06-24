import { ArgumentMetadata, HttpStatus, PipeTransform } from "@nestjs/common";
import mongoose from "mongoose";
import { GraphQLError } from "graphql/error";

class ValidateMongoosePipe implements PipeTransform {
  transform(value: mongoose.Types.ObjectId, metadata: ArgumentMetadata): mongoose.Types.ObjectId {
    if (!value) throw new GraphQLError("Id empty", { extensions: { code: HttpStatus.BAD_REQUEST } });
    if (!mongoose.isValidObjectId(value)) throw new GraphQLError("Invalid ID", { extensions: { code: HttpStatus.BAD_REQUEST } });
    return new mongoose.Types.ObjectId(value);
  }

}

export { ValidateMongoosePipe };