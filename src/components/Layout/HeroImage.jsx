import mealsImage from "../../assets/meals.jpg";
import classes from "./HeroImage.module.css";

const HeroImage = () => {
  return (
    <div className={classes["main-image"]}>
      <img src={mealsImage} alt="A table full of delicious food!" />
    </div>
  );
};

export default HeroImage;
