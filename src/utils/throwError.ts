import { HttpException, HttpStatus } from '@nestjs/common';

export function throwException(status: HttpStatus = HttpStatus.BAD_REQUEST, message: string) {
  throw new HttpException(
    {
      status,
      error: message,
    },
    status,
  );
}
