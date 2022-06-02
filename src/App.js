import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import HeroImage from "./components/Layout/HeroImage";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={() => setCartIsShown(false)} />}
      <Header onShowCart={() => setCartIsShown(true)} />
      <HeroImage/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
