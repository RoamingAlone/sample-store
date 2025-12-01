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
      <section className="page page-cart container py-4">
        <h1 className="mb-3">Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="page page-cart container py-4">
      <h1 className="mb-4">Shopping Cart</h1>

      <table className="table align-middle">
        <thead className="table-primary">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">ProductId</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const price = Number(item.price) || 0;
            const qty = item.quantity || 0;
            const lineTotal = price * qty;

            return (
              <tr key={item.productId}>
                <td>
                  <img
                    src={item.imageUrl || item.imageUrls?.[0]}
                    alt={item.productId}
                    className="img-thumbnail cart-thumb"
                  />
                </td>
                <td>{item.productId}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <div className="d-inline-flex align-items-center gap-1">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(item.productId, -1)}
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQuantity(item.productId, +1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${lineTotal.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="fs-5 mb-0">
          Total: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <button className="btn btn-primary" onClick={handleCheckout}>
          Check out
        </button>
      </div>
    </section>
  );
}

export default Cart;
