import { type Request, type Response, type NextFunction } from 'express';
import * as battlesService from '../services/battles.service';
import { type GetBattlesResponse } from '../types/battles';
import type { UpdateBattleInputBody } from '../validators/battles.validator';
import type { UpdateBattleInputParams } from '../validators/battles.validator';

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

export const getBattles = async (
  req: Request,
  res: Response<GetBattlesResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const battles = await battlesService.getBattles(req.user!.id);
    res.status(200).json({ battles });
  } catch (err) {
    next(err);
  }
};

export const updateBattle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params: UpdateBattleInputParams = req.valid!.params;
    const body: UpdateBattleInputBody = req.valid!.body;
    const userId = req.user!.id;
    const updatedBattle = await battlesService.updateBattle(
      userId,
      params.battleId,
      body.status,
    );

    res.status(200).json({ battle: updatedBattle });
  } catch (err) {
    next(err);
  }
};
