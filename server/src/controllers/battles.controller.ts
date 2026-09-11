import { type Request, type Response, type NextFunction } from 'express';
import * as battlesService from '../services/battles.service';
import { threadName } from 'node:worker_threads';

export const createBattle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const battle = await battlesService.createBattle(
      req.valid.body,
      req.body.id,
    );
    res.status(201).json({ battle });
  } catch (err) {
    next(err);
  }
};
