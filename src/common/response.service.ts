import { HttpStatus, Injectable } from "@nestjs/common";
import { ResponseDto } from "./dto/response.dto";

@Injectable()
class ResponseService<T> {
  public clientResponse(success: boolean, message: string, code: HttpStatus, data: T | null): ResponseDto<T> {
    return { success, message, code, data };
  }

  public clientArrayResponse(success: boolean, message: string, code: HttpStatus, data: T[]): ResponseDto<T[]> {
    return { success, message, code, data };
  }
}

export { ResponseService };
