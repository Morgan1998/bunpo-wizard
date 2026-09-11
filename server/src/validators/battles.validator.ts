import * as z from 'zod';

export const createBattleSchema = z.object({
  opponentId: z.string().trim().min(1),
  grammarTopic: z.string().trim().min(1).max(400),
});
export type CreateBattle = z.infer<typeof createBattleSchema>;
