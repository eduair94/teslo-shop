import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // Check if the product exists in the cart with the selected size
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // 2. I know the product exists, I have to increment its quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity,
            };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      removeProductFromCart: (product) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );
        set({ cart: updatedCartProducts });
      },
      getSummaryInformation: () => {
        const { cart, getTotalItems } = get();
        const subTotal = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = getTotalItems();
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    { name: 'shopping-cart' },
  ),
);
