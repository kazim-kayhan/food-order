import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { useCartContext } from "../../../store/cart-context";

const MealItem = ({ meal }) => {
  const { id, name, price, description } = meal;
  const { addItem } = useCartContext();

  const formattedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formattedPrice}</div>
      </div>
      <MealItemForm id={id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;
