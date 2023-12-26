'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { AvatarGenerator } from 'random-avatar-generator';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const generator = new AvatarGenerator();
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        image: generator.generateRandomAvatar(),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: 'User created',
    };
  } catch (e) {
    return {
      ok: false,
      message: 'Cannot create user',
    };
  }
};
