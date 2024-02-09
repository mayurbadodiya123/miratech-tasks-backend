import { HttpStatus } from '@nestjs/common';

class ResponseDTO {
  static success = (message: string, data: any) => {
    return {
      setting: {
        message,
        status: HttpStatus.OK,
      },
      data: data || [],
    };
  };
  static failure = (message: string, data: any) => {
    return {
      setting: {
        message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      data: data || [],
    };
  };
}

export default ResponseDTO;
