'use client';

import { changeUserPassword } from '@/actions';
import NProgress from 'nprogress';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormInputs {
  password: string;
}

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    NProgress.start();
    const res = await changeUserPassword(data.password);
    NProgress.done();
    if (res.ok) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <span className="block mb-2">Set Password</span>
      <div className="flex flex-wrap gap-1">
        <input
          type="password"
          placeholder="New password"
          className="p-2 border rounded-md bg-gray-200 w-full flex-1"
          {...register('password', { required: true, minLength: 6 })}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
      <div>
        {errors?.password?.type === 'required' && (
          <span className="text-red-500 pb-2">Password is required</span>
        )}
        {errors?.password?.type === 'minLength' && (
          <span className="text-red-500 pb-2">
            Password must contain at least 6 characters
          </span>
        )}
      </div>
    </form>
  );
};
