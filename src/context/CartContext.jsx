import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// 🔹 helper: turn "$1699" or "1699" into 1699
function parsePrice(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }
  return 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // product from Home/ProductDetails: { productId, name, price, imageUrl, ... }
  const addToCart = (product) => {
    setItems((prev) => {
      const normalizedProduct = {
        ...product,
        // 🔹 ensure price is a number INSIDE the cart
        price: parsePrice(product.price),
      };

      const idx = prev.findIndex(
        (p) => p.productId === normalizedProduct.productId
      );
      if (idx === -1) {
        return [...prev, { ...normalizedProduct, quantity: 1 }];
      }
      const copy = [...prev];
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
      return copy;
    });
  };

  const updateQuantity = (productId, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
