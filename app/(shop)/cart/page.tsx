import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/database/products';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
                  <p>${product.price}</p>
                  <QuantitySelector quantity={2} />

                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="right-2 bg-white rounded-xl shadow-xl p-7 h-fit">
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
