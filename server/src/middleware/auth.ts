import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import {
  jwtPayloadSchema,
  type JwtPayload,
} from '../validators/auth.validator';
import { AppError } from '../utils/AppError';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token;

  if (!token) {
    return next(
      new AppError(
        'Authentication token required. Please login.',
        401,
        'UNAUTHORIZED',
      ),
    );
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new Error('JWT_SECRET environment variable is not defined!'));
  }

  try {
    const rawDecoded = jwt.verify(token, secret);
    const result = jwtPayloadSchema.safeParse(rawDecoded);

    if (!result.success) {
      return next(
        new AppError(
          'Malformed token payload. Please log in again.',
          401,
          'UNAUTHORIZED',
        ),
      );
    }

    const payload: JwtPayload = result.data;
    req.user = { id: payload.userId };
    next();
  } catch {
    return next(
      new AppError(
        'Invalid or expired token. Please log in again.',
        401,
        'UNAUTHORIZED',
      ),
    );
  }
};
