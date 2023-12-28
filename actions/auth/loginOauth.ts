import { signIn } from 'next-auth/react';

export const loginOauth = async (provider: 'github' | 'google') => {
  try {
    await signIn(provider);
    return { ok: true };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: 'Cannot login',
    };
  }
};
