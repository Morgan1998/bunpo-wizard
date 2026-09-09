import { type Request, type Response, type NextFunction } from 'express';
import * as userService from '../services/user.service';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      message: 'User registered successfully! Yay :)',
      user,
    });
  } catch (err) {
    next(err);
  }
};
