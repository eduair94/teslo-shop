'use server';
import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
    return {
      ok: true,
      message: 'Address deleted successfully',
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      message: 'Cannot delete address',
    };
  }
};
