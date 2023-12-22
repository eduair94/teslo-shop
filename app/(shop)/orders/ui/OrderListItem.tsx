import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import { IoCardOutline } from 'react-icons/io5';

type IOrder = {
  OrderAddress: {
    firstName: string;
    lastName: string;
  } | null;
} & {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

interface Props {
  order: IOrder;
}

export const OrderListItem: FC<Props> = ({ order }) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.id.split('-').at(-1)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
      </td>
      <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <IoCardOutline
          className={clsx('', {
            'text-red-800': !order.isPaid,
            'text-green-800': order.isPaid,
          })}
        />
        <span
          className={clsx('mx-2', {
            'text-red-800': !order.isPaid,
            'text-green-800': order.isPaid,
          })}
        >
          {order.isPaid ? 'Paid' : 'Pending payment'}
        </span>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 ">
        <Link
          href={`/orders/${order.id}`}
          className="hover:underline text-nowrap"
        >
          See order
        </Link>
      </td>
    </tr>
  );
};
