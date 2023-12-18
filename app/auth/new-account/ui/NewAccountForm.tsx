'use client';
import { login, registerUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export const NewAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);
    console.log('Resp', resp);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
    await login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="mb-3 flex flex-col">
        <label htmlFor="name">Full name*</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded', {
            'border-red-500': errors.name,
          })}
          type="text"
          {...register('name', { required: true })}
        />
        {errors?.name?.type === 'required' && (
          <span className="text-red-500 pb-2">The name is required</span>
        )}
      </div>

      <div className="mb-3 flex flex-col">
        <label htmlFor="email">Email*</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded', {
            'border-red-500': errors.email,
          })}
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors?.email?.type === 'required' && (
          <span className="text-red-500 pb-2">Email is required</span>
        )}
        {errors?.email?.type === 'pattern' && (
          <span className="text-red-500  pb-2">Email is not valid</span>
        )}
      </div>

      <div className="mb-3 flex flex-col">
        <label htmlFor="email">Password*</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded', {
            'border-red-500': errors.password,
          })}
          type="password"
          {...register('password', { required: true })}
        />
        {errors?.password?.type === 'required' && (
          <span className="text-red-500 pb-2">Password is required</span>
        )}
      </div>

      {errorMessage && (
        <span className="text-red-500 pb-2">{errorMessage}</span>
      )}
      <button className="btn-primary">Register</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
