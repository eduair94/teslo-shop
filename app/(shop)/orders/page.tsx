// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getOrdersByUser } from '@/actions';
import { Pagination, Title } from '@/components';

import { redirect } from 'next/navigation';
import { OrderListItem } from './ui/OrderListItem';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { ok, orders, totalPages } = await getOrdersByUser({ page });
  if (!ok) {
    redirect('/auth/login');
  }
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10 overflow-auto w-100">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderListItem key={order.id} order={order} />
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages as number} />
      </div>
    </>
  );
}
