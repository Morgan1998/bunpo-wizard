import { type BattleStatus, type TranslationDirection } from '@prisma/client';
import { jwtPayloadSchema } from '../validators/auth.validator';

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
