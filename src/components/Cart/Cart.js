import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useCartContext } from "../../store/cart-context";
import { toast } from "react-toastify";
import Checkout from "./Checkout";
import { useState } from "react";

const Cart = ({ onClose }) => {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useCartContext();

  const formattedTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const orderClickHandler = () => {
    setIsCheckoutVisible(true);
  };

  const onCancel = () => {
    setIsCheckoutVisible(false);
  };

  const submitOrderHandler = async (userData) => {
    const response = await fetch(
      "https://food-order-13bf4-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: items,
        }),
      }
    );
    if (response.ok) {
      clearCart();
      setIsCheckoutVisible(false);
      toast.success("Your orders have been successfully places.");
    } else {
      clearCart();
      setIsCheckoutVisible(false);
      toast.error("Woops! Placing your orders failed.");
    }
  };
  const cartItems = items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={onClose}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      {hasItems ? (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{formattedTotalAmount}</span>
        </div>
      ) : (
        <div className={classes.total}>
          <span>Your cart is empty.</span>
        </div>
      )}

      {isCheckoutVisible ? (
        <Checkout onCancel={onCancel} onConfirm={submitOrderHandler} />
      ) : (
        modalActions
      )}
    </Modal>
  );
};

export default Cart;
