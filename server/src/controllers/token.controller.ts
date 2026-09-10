import { type Request, type Response, type NextFunction } from 'express';
import * as tokenService from '../services/token.service';

export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token, user } = await tokenService.createToken(req.body);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Logged in successfully! Welcome home wizard',
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteToken = (req: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({
    message: 'Logged out successfully! See ya later Wizard',
  });
};
