import { type Request, type Response, type NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      errs: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(',') || 'field';
      res.status(409).json({
        error: {
          code: 'CONFLICT',
          message: `A record with this ${target} already exists.`,
        },
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
