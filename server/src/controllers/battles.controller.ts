import { type Request, type Response, type NextFunction } from 'express';
import * as battlesService from '../services/battles.service';

export const createBattle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const battle = await battlesService.createBattle(
      req.valid!.body,
      req.user!.id,
    );
    res.status(201).json({ battle });
  } catch (err) {
    next(err);
  }
};
