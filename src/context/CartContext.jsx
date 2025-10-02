import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [locationTrigger, setLocationTrigger] = useState(false);
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        toast.info("🔁 Quantity updated");
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success("🛒 Product added to cart");
        return [...prevItems, { ...product, quantity }];
      }
    });
    // Show different toast messages

    setLocationTrigger(true);
  };

  const updateQuantity = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
    if (type === "increase") {
      toast.info("➕ Quantity increased");
    } else {
      toast.info("➖ Quantity decreased");
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.error("🗑️ Product removed from cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        locationTrigger,
        setLocationTrigger,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
