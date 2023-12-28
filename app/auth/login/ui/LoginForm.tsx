'use client';

import { authenticate, loginOauth } from '@/actions';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io';
import { IoAlertCircleOutline } from 'react-icons/io5';

interface Props {
  text: string;
  onClick?: () => void;
}

function LoginButton({ text, onClick }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={onClick}
      type="submit"
      className={clsx('mb-3', {
        'btn-disabled': pending,
        'btn-primary': !pending,
      })}
    >
      {text}
    </button>
  );
}

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();
  const query = useSearchParams();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get query parameter returnTo
    const returnTo = query.get('returnTo');
    if (state === 'Success') {
      router.push(returnTo ?? '/');
    }
  }, [query, state, router]);

  const setLoginCredentials = (role: 'user' | 'admin') => {
    const user = initialData.users.find((user) => user.role === role);
    if (!user) return;
    if (email.current) email.current.value = user.email;
    if (password.current) password.current.value = '123456';
  };

  return (
    <form action={dispatch} className="flex flex-col mb-10">
      <label htmlFor="email">Email</label>
      <input
        ref={email}
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="password">Password</label>
      <input
        ref={password}
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <LoginButton text="Login" />

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <div className="flex justify-center space-x-3 w-full mb-5">
        <button
          type="button"
          onClick={() => loginOauth('github')}
          className="btn-primary flex items-center space-x-2 flex-1"
        >
          <IoLogoGithub className="h-8 w-full" />
        </button>
        <button
          type="button"
          onClick={() => loginOauth('google')}
          className="btn-primary flex items-center space-x-2 flex-1"
        >
          <IoLogoGoogle className="h-6 w-full" />
        </button>
      </div>

      <LoginButton
        onClick={() => setLoginCredentials('user')}
        text="Login test user"
      />
      <LoginButton
        onClick={() => setLoginCredentials('admin')}
        text="Login test admin"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === 'Error' && (
          <>
            <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{'Invalid Credentials'}</p>
          </>
        )}
      </div>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create a new account
      </Link>
    </form>
  );
};
