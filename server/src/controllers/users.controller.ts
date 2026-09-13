import { type Request, type Response, type NextFunction } from 'express';

import type { SearchUsersResponse } from '../types/users';
import type { AuthResponse } from '../types/auth';

import * as UserService from '../services/users.service';

export const createUser = async (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await UserService.createUser(req.body);

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
  res: Response<SearchUsersResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchTerm = req.valid?.query.username;
    const currentUserId = req.user!.id;

    const users = await UserService.searchUsersByUsername(
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
