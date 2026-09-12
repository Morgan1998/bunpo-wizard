import { type Request, type Response, type NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { type ApiErrorResponse } from '../types/errors';

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    const response: ApiErrorResponse = {
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
      },
    };

    res.status(err.statusCode).json(response);

    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(',') || 'field';

      const response: ApiErrorResponse = {
        error: {
          code: 'CONFLICT',
          message: `A record with this ${target} already exists`,
        },
      };
      res.status(409).json(response);
      return;
    }
  }

  console.log('Unhandled Error:', err);

  const response: ApiErrorResponse = {
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected server error occurred',
    },
  };

  res.status(500).json(response);
};
