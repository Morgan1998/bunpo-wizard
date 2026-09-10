import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import { type LoginInput, type JwtPayload } from '../validators/auth.validator';
import { AppError } from '../utils/AppError';

export const createToken = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await db.user.findUnique({
    where: { email: email }, // could write just { email }, but i'll keep it explicit for now before I'm comfy with the syntactic sugar
  });

  if (!user || user.deletedAt !== null) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const isValidPassword = await bcrypt.compare(password, user!.passwordHash);
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined!');
  }

  const payload: JwtPayload = { userId: user!.id };
  const token = jwt.sign(payload, secret!, { expiresIn: '7d' });

  return {
    token,
    user: {
      id: user?.id,
      username: user?.username,
      email: user?.email,
    },
  };
};
