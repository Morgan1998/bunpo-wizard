import { db } from '../config/db';
import { AppError } from '../utils/AppError';
import { type CreateBattleInput } from '../validators/battles.validator';
import * as llmService from '../services/llm.services';

export const createBattle = async (
  input: CreateBattleInput,
  currentUserIdId: string,
): Promise<object> => {
  if (input.opponentId === currentUserIdId) {
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
        id: currentUserIdId,
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

  const promptSentence = await llmService.generatePromptSentence(
    input.grammarTopic,
    input.translationDirection,
  );
  const battle = await db.battle.create({
    data: {
      grammarTopic: input.grammarTopic,
      promptSentence: promptSentence,
      translationDirection: input.translationDirection,
      challengerId: currentUserIdId,
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
