import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import {
  jwtPayloadSchema,
  type JwtPayload,
} from '../validators/auth.validator';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication token required. Please log in',
      },
    });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined!');
  }

  try {
    const rawDecoded = jwt.verify(token, secret);

    const result = jwtPayloadSchema.safeParse(rawDecoded);

    if (!result.success) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Malformed token payload. Please log in again.',
        },
      });
      return;
    }

    const payload: JwtPayload = result.data;

    req.user = { id: payload.userId };
    next();
  } catch (err) {
    res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token. Please log in again.',
      },
    });
  }
};
