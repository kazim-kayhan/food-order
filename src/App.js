import { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import HeroImage from "./components/Layout/HeroImage";
import { ToastContainer } from "react-toastify";


const portalElement = document.getElementById("overlays");
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
      {ReactDOM.createPortal(
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />,
        portalElement
      )}
    </CartProvider>
  );
}

export default App;
