import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <section className="page page-cart">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="page page-cart">
      <h1>Shopping Cart</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>ProductId</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const thumbSrc =
              item.imageUrl ||
              item.images?.[0] ||
              "https://via.placeholder.com/60";
            const price = item.price || 0;
            const qty = item.quantity || 0;
            const lineTotal = price * qty;

            return (
              <tr key={item.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <img
                      src={thumbSrc}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.id}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn-qty"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    className="btn-qty"
                    onClick={() => updateQuantity(item.id, +1)}
                  >
                    +
                  </button>
                </td>
                <td>${lineTotal.toFixed(2)}</td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="cart-summary">
        <p>
          Total: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <button className="btn-primary" onClick={handleCheckout}>
          Check out
        </button>
      </div>
    </section>
  );
}

export default Cart;