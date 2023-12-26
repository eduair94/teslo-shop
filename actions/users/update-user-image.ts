'use server';
import prisma from '@/lib/prisma';
import { AvatarGenerator } from 'random-avatar-generator';

export const updateUserImage = async (userId: string) => {
  const generator = new AvatarGenerator();

  // Simply get a random avatar
  const avatar = generator.generateRandomAvatar();
  try {
    // Update user image.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: avatar,
      },
    });
    return {
      ok: true,
      image: avatar,
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      image: '',
    };
  }
};
