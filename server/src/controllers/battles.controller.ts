import type { Request, Response, NextFunction } from 'express';
import type { BattleResponse, GetBattlesResponse } from '../types/battles';

import * as BattlesService from '../services/battles.service';
import * as BattleValidator from '../validators/battles.validator';

export const createBattle = async (
  req: Request,
  res: Response<BattleResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const currentUserId = req.user!.id;
    const body: BattleValidator.CreateBattleInput = req.valid!.body;

    const battle = await BattlesService.createBattle(
      currentUserId,
      body.opponentId,
      body.grammarTopic,
      body.translationDirection,
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
    const currentUserId = req.user!.id;

    const battles = await BattlesService.getBattles(currentUserId);

    res.status(200).json({ battles });
  } catch (err) {
    next(err);
  }
};

export const updateBattle = async (
  req: Request,
  res: Response<BattleResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const params: BattleValidator.UpdateBattleInputParams = req.valid!.params;
    const body: BattleValidator.UpdateBattleInputBody = req.valid!.body;
    const currentUserId = req.user!.id;

    const updatedBattle = await BattlesService.updateBattle(
      currentUserId,
      params.battleId,
      body.status,
    );

    res.status(200).json({ battle: updatedBattle });
  } catch (err) {
    next(err);
  }
};
