import { type BattleStatus, type TranslationDirection } from '@prisma/client';

export interface BattleSummaryResponse {
  id: string;
  grammarTopic: string;
  promptSentence: string;
  translationDirection: TranslationDirection;
  status: BattleStatus;
  challenger: {
    id: string;
    username: string;
  };
  opponent: {
    id: string;
    username: string;
  };
  createdAt: string | Date;
}

export interface GetBattlesResponse {
  battles: BattleSummaryResponse[];
}

export interface UpdateBattleResponse {
  battle: {
    id: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    opponentId: string;
    challengerId: string;
    grammarTopic: string;
    promptSentence: string;
    translationDirection: TranslationDirection;
    status: BattleStatus;
  };
}
