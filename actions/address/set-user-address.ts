'use server';
import { IAddress } from '@/interfaces';
import prisma from '@/lib/prisma';

const createOrReplaceAddress = async (address: IAddress, userId: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { country: _, ...rest } = address;
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (storeAddress) {
      await prisma.userAddress.update({
        where: {
          userId,
        },
        data: {
          ...rest,
          countryId: address.country,
        },
      });
    } else {
      await prisma.userAddress.create({
        data: {
          ...rest,
          userId,
          countryId: address.country,
        },
      });
    }
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: 'Cannot save/update address',
    };
  }
};

export const setUserAddress = async (address: IAddress, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: 'Cannot save address',
    };
  }
};
