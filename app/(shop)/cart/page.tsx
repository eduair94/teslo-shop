import { Title } from '@/components';
import Link from 'next/link';
import { OrderSummary } from './ui/OrderSummary';
import { ProductsInCart } from './ui/ProductsInCart';

const CartPage = () => {
  //redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-3">
              Keep shopping
            </Link>

            <ProductsInCart />
          </div>

          <div className="right-2 bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <OrderSummary />
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
