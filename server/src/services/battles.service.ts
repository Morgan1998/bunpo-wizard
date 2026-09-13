import { db } from '../config/db';

import { AppError } from '../utils/AppError';

import type { BattleStatus, TranslationDirection } from '@prisma/client';

import * as LlmService from './llm.service';

export const createBattle = async (
  currentUserId: string,
  opponentId: string,
  grammarTopic: string,
  translationDirection: TranslationDirection,
) => {
  if (opponentId === currentUserId) {
    throw new AppError(
      'You cannot challenge yourself you silly goose!',
      400,
      'INVALID_REQUEST',
    );
  }

  const opponent = await db.user.findFirst({
    where: {
      id: opponentId,
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
      opponentId: opponentId,
      grammarTopic: grammarTopic,
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

  const promptSentence = await LlmService.generatePromptSentence(
    grammarTopic,
    translationDirection,
  );

  const battle = await db.battle.create({
    data: {
      grammarTopic: grammarTopic,
      promptSentence: promptSentence,
      translationDirection: translationDirection,
      challengerId: currentUserId,
      opponentId: opponentId,
    },
    select: {
      id: true,
      challenger: { select: { id: true, username: true } },
      opponent: { select: { id: true, username: true } },
      grammarTopic: true,
      translationDirection: true,
      promptSentence: true,
      status: true,
      createdAt: true,
      updatedAt: true,
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
      challenger: { select: { id: true, username: true } },
      opponent: { select: { id: true, username: true } },
      grammarTopic: true,
      translationDirection: true,
      promptSentence: true,
      status: true,
      createdAt: true,
      updatedAt: true,
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
      challenger: { select: { id: true, username: true } },
      opponent: { select: { id: true, username: true } },
      grammarTopic: true,
      translationDirection: true,
      promptSentence: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedBattle;
};
