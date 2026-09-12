import { type Request, type Response, type NextFunction } from 'express';
import { type ZodType } from 'zod';
import { AppError } from '../utils/AppError';
import { type ApiErrorDetail } from '../types/errors';

type RequestLocation = 'body' | 'query' | 'params';

export const validate = (
  schema: ZodType,
  location: RequestLocation = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[location]);

    if (!result.success) {
      const errorMessages: ApiErrorDetail[] = result.error.issues.map(
        (issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }),
      );

      return next(
        new AppError(
          'Invalid request ${location}',
          400,
          'VALIDATION_ERROR',
          errorMessages,
        ),
      );
    }

    if (!req.valid) {
      req.valid = {};
    }
    req.valid[location] = result.data;

    next();
  };
};
