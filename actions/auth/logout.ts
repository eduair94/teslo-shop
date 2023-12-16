'use server';
import { signOut } from '@/auth.config';

export const logout = async () => {
  console.log('logout');
  await signOut();
};
