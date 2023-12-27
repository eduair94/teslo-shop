'use client';
import { useUIStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoSearchOutline } from 'react-icons/io5';

interface FormInputs {
  search: string;
}

interface Params {
  keep?: boolean;
}

export const SearchBar: FC<Params> = ({ keep = false }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      search: searchParams.q ?? '',
    },
  });

  const onSubmit = (data: FormInputs) => {
    const search = data.search;
    closeSideMenu();
    if (!keep) reset();
    NProgress.start();
    router.push(`/search?q=${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-0 sm:gap-3 w-full flex-wrap relative"
    >
      <IoSearchOutline size={20} className="absolute top-2 left-2" />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-gray-50 sm:rounded pl-10 py-1 pr-3 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
        {...register('search', { required: true })}
      />
      <button className="btn-primary-tile w-full flex-1">Search</button>
    </form>
  );
};
