import { type Request, type Response, type NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { type ApiErrorResponse } from '../types/api';

export const errorHandler = (
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
        details: err.details,
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
          code: err.code,
          message: err.message,
        },
      };
      res.status(409).json({
        response,
      });
      return;
    }
  }

  console.log('Unhandled Error:', err);

  res.status(500).json({
    err: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected server error occurred.',
    },
  });
};
