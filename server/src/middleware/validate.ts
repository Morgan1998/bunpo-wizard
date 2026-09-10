import { type Request, type Response, type NextFunction } from 'express';
import { type ZodType } from 'zod';

type RequestLocation = 'body' | 'query' | 'params';

export const validate = (
  schema: ZodType,
  location: RequestLocation = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[location]);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request payload',
          details: errorMessages,
        },
      });
      return;
    }

    if (!req.valid) {
      req.valid = {};
    }
    req.valid[location] = result.data;

    next();
  };
};
