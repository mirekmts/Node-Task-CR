import { HttpException, HttpStatus } from '@nestjs/common';

export function dataNotFound(message = 'Data'): HttpException {
  throw new HttpException(
    `${message} with given id can not be found`,
    HttpStatus.NOT_FOUND,
  );
}