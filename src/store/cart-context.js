import { createContext, useContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  clearCart: () => {},
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;

export const useCartContext = () => useContext(CartContext);
