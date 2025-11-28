import React from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section className="page page-cart">
      <h1>Shopping Cart</h1>
      <p>
        This page will show all products in the cart, with quantity controls and
        total price.
      </p>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>ProductId</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: map over cart items here */}
          <tr>
            <td>[Thumbnail]</td>
            <td>EXAMPLE_ID</td>
            <td>$999.99</td>
            <td>
              <button className="btn-qty">-</button>
              <span className="qty-value">1</span>
              <button className="btn-qty">+</button>
            </td>
            <td>$999.99</td>
          </tr>
        </tbody>
      </table>

      <div className="cart-summary">
        {/* TODO: calculate real total */}
        <p>Total: $999.99</p>
        <button className="btn-primary" onClick={handleCheckout}>
          Check out
        </button>
      </div>
    </section>
  );
}

export default Cart;
