import { Title } from '@/components';
import { initialData } from '@/database/products';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const CheckoutPage = () => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Modify elements</span>
            <Link href="/cart" className="underline mb-3">
              Modify cart
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
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  By clicking on &quot;Place Order&quot;, you agree to our{' '}
                  <a href="#" className="underline">
                    terms and conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="underline">
                    privacy policy
                  </a>{' '}
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
