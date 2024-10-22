/* eslint-disable prettier/prettier */

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpStatus,
//   HttpException,
// } from '@nestjs/common';
// import { MongoServerError } from 'mongodb';
// import { Response } from 'express';
// import { MongooseError } from 'mongoose';
// import { QueryFailedError } from 'typeorm';
// import { splitOracleError } from 'src/utils/error.util';

// /**
//  * Bắt các lỗi về xử lý, tránh tối đa tình trạng lỗi 500
//  */
// @Catch(HttpException, MongoServerError, MongooseError, Error)
// export class AllExceptionFilter implements ExceptionFilter {
//   private static handleResponse(
//     response: Response,
//     responseBody: any,
//     statusCode: number,
//   ): void {
//     response.status(statusCode).json(responseBody);
//   }

//   private static formatTimestamp(): string {
//     const date = new Date();
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
//     const year = date.getFullYear();
//     return `${hours}:${minutes}:${seconds} --- ${day}/${month}/${year}`;
//   }

//   catch(
//     exception: MongoServerError | HttpException | Error | QueryFailedError,
//     host: ArgumentsHost,
//   ) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     let responseBody;

//     if (exception instanceof HttpException) {
//       const errRes = exception.getResponse();
//       responseBody = {
//         ...(typeof errRes === 'object' ? { ...errRes } : { message: errRes }),
//         statusCode: exception.getStatus(),
//       };
//     } else if (exception instanceof MongoServerError) {
//       if (exception.code === 11000) {
//         responseBody = {
//           message: 'Duplicate key error!',
//           statusCode: HttpStatus.CONFLICT,
//         };
//       } else {
//         responseBody = {
//           message: exception.message,
//           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         };
//       }
//     } else if (exception instanceof MongooseError) {
//       responseBody = {
//         message: exception.message,
//         statusCode: HttpStatus.BAD_REQUEST,
//       };
//     } else if (exception instanceof QueryFailedError) {
//       if (exception.message.includes('ORA-00001')) {
//         responseBody = {
//           message: 'Duplicate key error!',
//           statusCode: HttpStatus.CONFLICT,
//         };
//       } else {
//         const { errorCode, errorDetails } = splitOracleError(
//           exception?.message,
//         );

//         errorCode === ''
//           ? (responseBody = {
//               message: `Database query error: ${exception?.message}`,
//               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//             })
//           : (responseBody = {
//               message: `Database query error: ${errorDetails}`,
//               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//               databaseCode: errorCode,
//             });
//       }
//     } else if (exception instanceof Error) {
//       responseBody = {
//         message: exception.message,
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//       };
//     } else {
//       responseBody = {
//         message: 'Internal server error',
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//       };
//     }

//     AllExceptionFilter.handleResponse(
//       response,
//       response?.statusCode === HttpStatus.INTERNAL_SERVER_ERROR
//         ? 'Internal server error!'
//         : {
//             path: request.url,
//             timestamp: AllExceptionFilter.formatTimestamp(),
//             ...responseBody,
//           },
//       responseBody?.statusCode,
//     );

//     // response.status(responseBody.statusCode).json({
//     //     ...responseBody,
//     //     timestamp: new Date().toISOString(),
//     //     path: request.url,
//     //   });
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { QueryFailedError } from 'typeorm';
import { splitOracleError } from 'src/utils/error.util';

/**
 * Bắt các lỗi về xử lý, tránh tối đa tình trạng lỗi 500
 */
@Catch(HttpException, MongoServerError, MongooseError, Error)
export class AllExceptionFilter implements ExceptionFilter {
  private static handleResponse(
    response: Response,
    responseBody: any,
    statusCode: number,
  ): void {
    response.status(statusCode).json(responseBody);
  }

  private static formatTimestamp(): string {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${hours}:${minutes}:${seconds} --- ${day}/${month}/${year}`;
  }

  private static createResponseBody(
    exception: MongoServerError | HttpException | Error | QueryFailedError,
  ) {
    let exceptionRes;

    switch (true) {
      case exception instanceof HttpException:
        const errRes = exception.getResponse();
        exceptionRes = {
          ...(typeof errRes === 'object' ? { ...errRes } : { message: errRes }),
          statusCode: exception.getStatus(),
        };
        break;

      case exception instanceof MongoServerError:
        exceptionRes = {
          message:
            exception.code === 11000
              ? 'Duplicate key error!'
              : exception.message,
          statusCode:
            exception.code === 11000
              ? HttpStatus.CONFLICT
              : HttpStatus.INTERNAL_SERVER_ERROR,
        };
        break;

      case exception instanceof MongooseError:
        exceptionRes = {
          message: exception.message,
          statusCode: HttpStatus.BAD_REQUEST,
        };
        break;

      case exception instanceof QueryFailedError:
        if (exception.message.includes('ORA-00001')) {
          exceptionRes = {
            message: 'Duplicate key error!',
            statusCode: HttpStatus.CONFLICT,
          };
        } else {
          const { errorCode, errorDetails } = splitOracleError(
            exception?.message,
          );
          exceptionRes =
            errorCode === ''
              ? {
                  message: `Database query error: ${exception?.message}`,
                  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                }
              : {
                  message: `Database query error: ${errorDetails}`,
                  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                  databaseCode: errorCode,
                };
        }
        break;

      default:
        exceptionRes = {
          message: exception.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
        break;
    }

    return exceptionRes;
  }

  catch(
    exception: MongoServerError | HttpException | Error | QueryFailedError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseBody = AllExceptionFilter.createResponseBody(exception);

    AllExceptionFilter.handleResponse(
      response,
      response?.statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Internal server error!'
        : {
            path: request.url,
            timestamp: AllExceptionFilter.formatTimestamp(),
            ...responseBody,
          },
      responseBody?.statusCode,
    );
  }
}
