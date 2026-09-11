import * as z from 'zod';

export const jwtPayloadSchema = z.object({
  userId: z.string(),
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: 'Invalid email address' })),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'password cannot exceed 72 characters'),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: 'Invalid email address' })),
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;
