import { Title } from '@/components';
import Link from 'next/link';
import { PlaceOrder } from './ui/PlaceOrder';
import { ProductsInCart } from './ui/ProductsInCart';

const CheckoutPage = () => {
  return (
    <div className="flex justify-center items-center mb-10 md:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Modify elements</span>
            <Link href="/cart" className="underline mb-3">
              Modify cart
            </Link>

            <ProductsInCart />
          </div>

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
