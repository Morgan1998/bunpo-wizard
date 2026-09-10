import bcrypt from 'bcrypt';
import { db } from '../config/db';
import { type RegisterInput } from '../validators/auth.validator';

export const createUser = async (input: RegisterInput) => {
  const { username, email, password } = input;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      username,
      email,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};
