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

export const searchUsersByUsername = async (
  searchTerm: string,
  currentUserId: string,
) => {
  const users = await db.user.findMany({
    where: {
      username: {
        contains: searchTerm,
        mode: 'insensitive',
      },
      deletedAt: null,
      id: {
        not: currentUserId, // can't send a battle invite to yourself hahahaha
      },
    },
    select: {
      id: true,
      username: true,
    },
    take: 10,
  });

  return users;
};
