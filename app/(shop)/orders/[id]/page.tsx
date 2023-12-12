import { Title } from '@/components';
import { initialData } from '@/database/products';
import clsx from 'clsx';
import Image from 'next/image';
import { IoCardOutline } from 'react-icons/io5';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}
const OrderPage = ({ params }: Props) => {
  const { id } = params;
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order number ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-sx font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                },
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending payment</span> */}
              <span className="mx-2">Paid</span>
            </div>

            {productsInCart.map((product) => (
              <div className="flex mb-5" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p>Subtotal: ${product.price * 3}</p>

                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Herrera</p>
              <p>Av Siempre viva</p>
              <p>Col. Centro</p>
              <p>CP 123213</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>Qty. Products</span>
              <span className="text-right">3 products</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-sx font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  },
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pending payment</span> */}
                <span className="mx-2">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
