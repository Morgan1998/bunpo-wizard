import { type Request, type Response, type NextFunction } from 'express';
import * as userService from '../services/user.service';

export const createUser = async (
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

export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchTerm = req.valid?.query.username;
    const currentUserId = req.user!.id;

    const users = await userService.searchUsersByUsername(
      searchTerm,
      currentUserId,
    );

    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};
