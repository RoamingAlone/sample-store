import React from "react";

function Checkout() {
  return (
    <section className="page page-checkout">
      <h1>Checkout</h1>

      <form className="checkout-form">
        {/* Personal Information */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-row">
            <label>
              First Name*
              <input type="text" name="firstName" required />
            </label>
            <label>
              Last Name*
              <input type="text" name="lastName" required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email*
              <input type="email" name="email" required />
            </label>
            <label>
              Phone*
              <input type="tel" name="phone" required />
            </label>
          </div>
        </fieldset>

        {/* Billing Address */}
        <fieldset>
          <legend>Billing Address</legend>
          {/* TODO: proper address fields */}
          <label>
            Address Line 1*
            <input type="text" name="billingAddress1" required />
          </label>
          <label>
            City*
            <input type="text" name="billingCity" required />
          </label>
          <label>
            Postal Code*
            <input type="text" name="billingPostal" required />
          </label>
        </fieldset>

        {/* Checkbox: same as billing */}
        <div className="form-row">
          <label className="checkbox-label">
            <input type="checkbox" name="sameAsBilling" />
            Same as billing address
          </label>
        </div>

        {/* Delivery Address */}
        <fieldset>
          <legend>Delivery Address</legend>
          {/* TODO: copy billing when checkbox is checked */}
          <label>
            Address Line 1*
            <input type="text" name="deliveryAddress1" required />
          </label>
          <label>
            City*
            <input type="text" name="deliveryCity" required />
          </label>
          <label>
            Postal Code*
            <input type="text" name="deliveryPostal" required />
          </label>
        </fieldset>

        {/* Credit Card */}
        <fieldset>
          <legend>Credit Card</legend>
          <label>
            Card Number*
            <input type="text" name="cardNumber" required />
          </label>
          <div className="form-row">
            <label>
              Expiry (MM/YY)*
              <input type="text" name="expiry" required />
            </label>
            <label>
              CVV*
              <input type="text" name="cvv" required />
            </label>
          </div>
        </fieldset>

        {/* Terms & Pay Now */}
        <div className="form-row">
          <label className="checkbox-label">
            <input type="checkbox" name="terms" />
            I agree to the terms and conditions
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Pay now
        </button>
      </form>
    </section>
  );
}

export default Checkout;
