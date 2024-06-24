class ResponseDto<T> {
  success: boolean;
  message: string;
  code: number;
  data: T | null;
}

export { ResponseDto };
