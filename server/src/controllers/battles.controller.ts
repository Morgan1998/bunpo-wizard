import type { Request, Response, NextFunction } from 'express';
import type { BattleResponse, GetBattlesResponse } from '../types/battles';

import * as BattlesService from '../services/battles.service';

export const createBattle = async (
  req: Request,
  res: Response<BattleResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const currentUserId = req.user!.id;
    const body = req.valid!.body;

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
    const battleId = req.valid!.params.battleId;
    const status = req.valid!.body.status;
    const currentUserId = req.user!.id;

    const updatedBattle = await BattlesService.updateBattle(
      currentUserId,
      battleId,
      status,
    );

    res.status(200).json({ battle: updatedBattle });
  } catch (err) {
    next(err);
  }
};

export const getBattleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const currentUserId = req.user!.id;
    const battleId = req.valid!.params.battleId;

    const battle = await BattlesService.getBattleById(currentUserId, battleId);

    res.status(200).json({ battle });
  } catch (err) {
    next(err);
  }
};
