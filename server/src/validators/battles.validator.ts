import * as z from 'zod';
import { TranslationDirection } from '@prisma/client';

export const createBattleBodySchema = z.object({
  opponentId: z.string().trim().pipe(z.uuid('Invalid opponent ID format')),
  grammarTopic: z.string().trim().min(1).max(400),
  translationDirection: z.enum(TranslationDirection),
});
export type CreateBattleBody = z.infer<typeof createBattleBodySchema>;

export const responseStatusSchema = z.enum(['IN_PROGRESS', 'DECLINED']);

export const updateBattleBodySchema = z.object({
  status: responseStatusSchema,
});
export type UpdateBattleBody = z.infer<typeof updateBattleBodySchema>;

export const battleIdRouteParamSchema = z.object({
  battleId: z.uuid(),
});
export type BattleIdRouteParam = z.infer<typeof battleIdRouteParamSchema>;
