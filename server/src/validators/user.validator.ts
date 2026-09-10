import z from 'zod';

export const searchUserQuerySchema = z.object({
  username: z.string().trim().min(1, 'Username query parameter is required'),
});
export type SearchUserQuery = z.infer<typeof searchUserQuerySchema>;
