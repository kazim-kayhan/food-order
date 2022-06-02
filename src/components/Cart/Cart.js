import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useCartContext } from "../../store/cart-context";
import { toast } from 'react-toastify';

const Cart = ({ onClose }) => {
  const { items, totalAmount, addItem, removeItem } = useCartContext();

  const formattedTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const orderClickHandler = () => {
    toast.success('Your order submitted!');
  }
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
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderClickHandler}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
