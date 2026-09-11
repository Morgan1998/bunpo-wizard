import * as z from 'zod';
import { TranslationDirection } from '@prisma/client';

export const createBattleInputSchema = z.object({
  opponentId: z.string().trim().pipe(z.uuid('Invalid opponent ID format')),
  grammarTopic: z.string().trim().min(1).max(400),
  translationDirection: z.enum(TranslationDirection),
});
export type CreateBattleInput = z.infer<typeof createBattleInputSchema>;
