import type { BattleStatus, TranslationDirection } from '@prisma/client';
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

export interface SubmissionSummary {
  id: string;
  userId: string;
  translationsText: string;
  submittedAt: string | Date;
}

export interface BattleDetail extends BattleSummary {
  winnerId: string | null;
  llmFeedback: string | null;
  submissions: SubmissionSummary[];
}

export interface BattleResponse {
  battle: BattleSummary;
}

export interface GetBattlesResponse {
  battles: BattleSummary[];
}
