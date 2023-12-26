import { getOrder } from '@/actions';
import { PaypalButton, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import { notFound } from 'next/navigation';
import { PaymentStatus } from './ui/PaymentStatus';

interface Props {
  params: {
    id: string;
  };
}
const OrderPage = async ({ params }: Props) => {
  const { id } = params;
  const { order } = await getOrder(id);
  if (!order) return notFound();
  const address = order!.OrderAddress;
  if (!address) return notFound();
  const productsInCart = order.OrderItem.map((el) => {
    return {
      ...el.product,
      size: el.size,
      price: el.price,
      quantity: el.quantity,
      images: el.product.ProductImage.map((el) => el.url),
    };
  });
  const itemsInOrder = order.itemsInOrder;
  const { subTotal, tax, total } = order;
  return (
    <div className="flex justify-center items-center mb-10 md:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order number #${order.id.split('-').at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <PaymentStatus isPaid={order.isPaid} />

            {productsInCart.map((product) => (
              <div
                className="flex mb-5"
                key={`${product.slug}-${product.size}`}
              >
                <ProductImage
                  src={product.images[0]}
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
                  <p>
                    {product.title} - {product.size}
                  </p>
                  <p>
                    ${product.price} x {product.quantity}
                  </p>
                  <p>Subtotal: ${product.price * product.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div>
              <p className="text-xl">
                {address.firstName} {address.lastName}
              </p>
              <p>{address.address}</p>
              <p>{address.address2}</p>
              <p>ZIP {address.postalCode}</p>
              <p>
                {address.city}, {address.countryId}
              </p>
              <p>{address.phone}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 my-5"></div>
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>Qty. Products</span>
              <span className="text-right">
                {itemsInOrder === 1 ? '1 article' : `${itemsInOrder} articles`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(subTotal)}</span>

              <span>Taxes (15%)</span>
              <span className="text-right">{currencyFormat(tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">
                {currencyFormat(total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order.isPaid ? (
                <PaymentStatus isPaid={order.isPaid} />
              ) : (
                <PaypalButton orderId={order.id} amount={total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
