import { db } from '../config/db';
import { AppError } from '../utils/AppError';
import { type CreateBattleInput } from '../validators/battles.validator';
import * as llmService from '../services/llm.services';

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
