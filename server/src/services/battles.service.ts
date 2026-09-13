import { db } from '../config/db';
import { AppError } from '../utils/AppError';
import { type CreateBattleInput } from '../validators/battles.validator';
import * as llmService from '../services/llm.services';
import type { BattleStatus } from '@prisma/client';

export const createBattle = async (
  input: CreateBattleInput,
  currentUserId: string,
) => {
  if (input.opponentId === currentUserId) {
    throw new AppError(
      'You cannot challenge yourself you silly goose!',
      400,
      'INVALID_REQUEST',
    );
  }
  const opponent = await db.user.findFirst({
    where: {
      id: input.opponentId,
      deletedAt: null,
      NOT: {
        id: currentUserId,
      },
    },
  });

  if (!opponent) {
    throw new AppError(
      `Couldn't find the selected user or you chose yourself!`,
      400,
      'INVALID_REQUEST',
    );
  }

  const existingPendingDuel = await db.battle.findFirst({
    where: {
      challengerId: currentUserId,
      opponentId: input.opponentId,
      grammarTopic: input.grammarTopic,
      status: 'PENDING',
    },
  });

  if (existingPendingDuel) {
    throw new AppError(
      `You already have a pending challenge with this player for this grammar topic! oopsies :D`,
      409,
      'CONFLICT',
    );
  }

  const promptSentence = await llmService.generatePromptSentence(
    input.grammarTopic,
    input.translationDirection,
  );
  const battle = await db.battle.create({
    data: {
      grammarTopic: input.grammarTopic,
      promptSentence: promptSentence,
      translationDirection: input.translationDirection,
      challengerId: currentUserId,
      opponentId: input.opponentId,
    },
    select: {
      id: true,
      status: true,
      opponentId: true,
    },
  });

  return battle;
};

export const getBattles = async (currentUserId: string) => {
  const battles = await db.battle.findMany({
    where: {
      OR: [{ challengerId: currentUserId }, { opponentId: currentUserId }],
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      grammarTopic: true,
      promptSentence: true,
      translationDirection: true,
      status: true,
      challenger: {
        select: {
          id: true,
          username: true,
        },
      },
      opponent: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
    },
  });

  return battles;
};

export const updateBattle = async (
  currentUserId: string,
  battleId: string,
  status: BattleStatus,
) => {
  const battle = await db.battle.findUnique({
    where: {
      id: battleId,
    },
    select: {
      opponentId: true,
      status: true,
    },
  });

  if (!battle) {
    throw new AppError('Battle not found!', 404, 'NOT_FOUND');
  }

  if (battle.opponentId !== currentUserId) {
    throw new AppError(
      'Only the challenged opponent can respond!',
      403,
      'FORBIDDEN',
    );
  }

  if (battle.status !== 'PENDING') {
    throw new AppError('This battle is no longer pending', 400, 'BAD_REQUEST');
  }

  const updatedBattle = await db.battle.update({
    where: { id: battleId },
    data: { status: status },
    select: {
      id: true,
      updatedAt: true,
      createdAt: true,
      opponentId: true,
      challengerId: true,
      grammarTopic: true,
      promptSentence: true,
      translationDirection: true,
      status: true,
    },
  });

  return updatedBattle;
};
