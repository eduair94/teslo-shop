// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { Pagination, Title } from '@/components';

import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';
import { UserTable } from './ui/UserTable';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function UserPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { ok, users, totalPages } = await getPaginatedUsers({ page });
  if (!ok) {
    redirect('/auth/login');
  }
  return (
    <>
      <Title title="User's Panel" />

      <div className="mb-10 overflow-auto w-100">
        <UserTable users={users} />
        <Pagination totalPages={totalPages as number} />
      </div>
    </>
  );
}
