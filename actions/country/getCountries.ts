'use server';

import { ICountry } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getCountries = async (): Promise<ICountry[]> => {
  try {
    const countries = await prisma.country.findMany();
    return countries;
  } catch (e) {
    console.log(e);
    throw new Error('error with countries');
  }
};
