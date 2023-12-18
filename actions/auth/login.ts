'use server';
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Error';
        default:
          return 'Error';
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { ok: true };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: 'Cannot login',
    };
  }
};
