import { type BattleStatus, type TranslationDirection } from '@prisma/client';

export interface BattleSummary {
  id: string;
  challenger: {
    id: string;
    username: string;
  };
  opponent: {
    id: string;
    username: string;
  };
  grammarTopic: string;
  translationDirection: TranslationDirection;
  promptSentence: string;
  status: BattleStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface GetBattlesResponse {
  battles: BattleSummary[];
}

export interface UpdateBattleResponse {
  battle: BattleSummary;
}
