import { ISize } from '@/interfaces';
import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  selectedSize?: ISize;
  availableSizes: ISize[];
  onSizeChanged: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available sizes </h3>

      <div className="flex">
        {availableSizes.map((size) => {
          return (
            <button
              onClick={() => onSizeChanged(size)}
              key={size}
              className={clsx('mx-2 hover:underline text-lg', {
                underline: size === selectedSize,
              })}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
