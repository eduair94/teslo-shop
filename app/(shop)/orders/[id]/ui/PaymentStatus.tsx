import clsx from 'clsx';
import { FC } from 'react';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  isPaid: boolean;
}

export const PaymentStatus: FC<Props> = ({ isPaid }) => {
  return (
    <div
      className={clsx(
        'flex items-center rounded-lg py-2 px-3.5 text-sx font-bold text-white mb-5',
        {
          'bg-red-500': !isPaid,
          'bg-green-700': isPaid,
        },
      )}
    >
      <IoCardOutline size={30} />
      {isPaid ? (
        <span className="mx-2">Paid</span>
      ) : (
        <span className="mx-2">Pending payment</span>
      )}
    </div>
  );
};
