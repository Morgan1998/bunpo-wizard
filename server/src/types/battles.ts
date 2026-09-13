import { type BattleStatus, type TranslationDirection } from '@prisma/client';
import type { PublicUser } from './users';

export interface BattleSummary {
  id: string;
  challenger: PublicUser;
  opponent: PublicUser;
  grammarTopic: string;
  translationDirection: TranslationDirection;
  promptSentence: string;
  status: BattleStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BattleResponse {
  battle: BattleSummary;
}

export interface GetBattlesResponse {
  battles: BattleSummary[];
}
