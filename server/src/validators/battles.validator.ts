import * as z from 'zod';
import { TranslationDirection } from '@prisma/client';

export const createBattleInputSchema = z.object({
  opponentId: z.string().trim().pipe(z.uuid('Invalid opponent ID format')),
  grammarTopic: z.string().trim().min(1).max(400),
  translationDirection: z.enum(TranslationDirection),
});
export type CreateBattleInput = z.infer<typeof createBattleInputSchema>;

export const responseStatusSchema = z.enum(['IN_PROGRESS', 'DECLINED']);
export type ResponseStatus = z.infer<typeof responseStatusSchema>;

export const updateBattleInputBodySchema = z.object({
  status: responseStatusSchema,
});
export type UpdateBattleInputBody = z.infer<typeof updateBattleInputBodySchema>;

export const updateBattleInputParamsSchema = z.object({
  battleId: z.uuid(),
});
export type UpdateBattleInputParams = z.infer<
  typeof updateBattleInputParamsSchema
>;
