'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { initialData } from '@/seed/seed';
import bcryptjs from 'bcryptjs';

export const changeUserPassword = async (password: string) => {
  if (password.length < 6)
    return {
      ok: false,
      message: 'Not possible, are you hacking?',
    };
  const session = await auth();
  if (session) {
    const userId = session.user.id;
    const email = session.user.email;
    // Prevent changing password of a test user
    if (initialData.users.some((user) => user.email === email)) {
      return {
        ok: false,
        message: 'You cannot change the password of a test user',
      };
    }
    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: bcryptjs.hashSync(password),
        },
      });
      return {
        ok: true,
        message: 'Password updated successfully',
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        message: 'Unable to update password',
      };
    }
  }
  return {
    ok: false,
    message: 'Unable to update password',
  };
};
