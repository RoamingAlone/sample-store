import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function Checkout() {
  const { totalPrice, clearCart } = useCart();
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment processed! (Fake checkout for assignment)");
    clearCart();
  };

  return (
    <section className="page page-checkout container my-5">
      <h1 className="mb-2">Checkout</h1>
      <p className="text-muted mb-4">
        Order total: <strong>${totalPrice.toFixed(2)}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="card mb-3">
          <div className="card-header fw-bold">Personal Information</div>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">First Name*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Last Name*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Email*</label>
              <div className="col-sm-9">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row mb-0">
              <label className="col-sm-3 col-form-label">Mobile*</label>
              <div className="col-sm-9">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="card mb-3">
          <div className="card-header fw-bold">Billing Address</div>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Street*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="billingStreet"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">City*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="billingCity"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">State</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="billingState"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-0">
              <label className="col-sm-3 col-form-label">ZIP Code*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="billingZip"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Same as billing checkbox */}
        <div className="form-check mb-3 ms-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="sameAsBilling"
            checked={sameAsBilling}
            onChange={(e) => setSameAsBilling(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="sameAsBilling">
            Same as billing address
          </label>
        </div>

        {/* Delivery / Shipping Address */}
        <div className="card mb-3">
          <div className="card-header fw-bold">Shipping Address</div>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Street*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="shippingStreet"
                  className="form-control"
                  required
                  disabled={sameAsBilling}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">City*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="shippingCity"
                  className="form-control"
                  required
                  disabled={sameAsBilling}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">State</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="shippingState"
                  className="form-control"
                  disabled={sameAsBilling}
                />
              </div>
            </div>
            <div className="row mb-0">
              <label className="col-sm-3 col-form-label">ZIP Code*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="shippingZip"
                  className="form-control"
                  required
                  disabled={sameAsBilling}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Credit Card */}
        <div className="card mb-3">
          <div className="card-header fw-bold">Credit Card Information</div>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Card Number*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="cardNumber"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Expiry Date*</label>
              <div className="col-sm-3">
                <input
                  type="text"
                  name="expiry"
                  className="form-control"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <label className="col-sm-3 col-form-label">CVV*</label>
              <div className="col-sm-3">
                <input
                  type="text"
                  name="cvv"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms + Pay Now */}
        <div className="form-check mb-3 ms-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="terms"
            required
          />
          <label className="form-check-label" htmlFor="terms">
            I agree to the Terms and Conditions
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Pay Now
        </button>
      </form>
    </section>
  );
}

export default Checkout;
