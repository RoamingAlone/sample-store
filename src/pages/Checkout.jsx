import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function Checkout() {
  const { totalPrice, clearCart } = useCart();

  // Billing + Shipping controlled inputs so we can sync them.
  const [billing, setBilling] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [shipping, setShipping] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Credit card fields (still just cosmetic, but controlled)
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleBillingChange = (field, value) => {
    setBilling((prev) => {
      const updated = { ...prev, [field]: value };

      // If "same as billing" is on, keep shipping in sync
      if (sameAsBilling) {
        setShipping(updated);
      }

      return updated;
    });
  };

  const handleShippingChange = (field, value) => {
    // Only allow manual editing when NOT sameAsBilling
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handleSameAsBillingToggle = (e) => {
    const checked = e.target.checked;
    setSameAsBilling(checked);

    if (checked) {
      // Copy current billing values into shipping
      setShipping(billing);
    }
    // If unchecked, we simply stop syncing – user can edit shipping fields
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalPrice === 0) {
      alert("Your cart is empty.");
      return;
    }

    // In a real app you’d send data to a server here
    alert("Payment processed! Thank you for your purchase.");
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
                  className="form-control"
                  required
                  value={billing.street}
                  onChange={(e) =>
                    handleBillingChange("street", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">City*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  required
                  value={billing.city}
                  onChange={(e) =>
                    handleBillingChange("city", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">State</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={billing.state}
                  onChange={(e) =>
                    handleBillingChange("state", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-0">
              <label className="col-sm-3 col-form-label">ZIP Code*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  required
                  value={billing.zip}
                  onChange={(e) => handleBillingChange("zip", e.target.value)}
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
            onChange={handleSameAsBillingToggle}
          />
          <label className="form-check-label" htmlFor="sameAsBilling">
            Same as billing address
          </label>
        </div>

        {/* Shipping Address */}
        <div className="card mb-3">
          <div className="card-header fw-bold">Shipping Address</div>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Street*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  required
                  disabled={sameAsBilling}
                  value={shipping.street}
                  onChange={(e) =>
                    handleShippingChange("street", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">City*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  required
                  disabled={sameAsBilling}
                  value={shipping.city}
                  onChange={(e) =>
                    handleShippingChange("city", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">State</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  disabled={sameAsBilling}
                  value={shipping.state}
                  onChange={(e) =>
                    handleShippingChange("state", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mb-0">
              <label className="col-sm-3 col-form-label">ZIP Code*</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  required
                  disabled={sameAsBilling}
                  value={shipping.zip}
                  onChange={(e) =>
                    handleShippingChange("zip", e.target.value)
                  }
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
                  className="form-control"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Expiry + CVV row, labels directly above inputs */}
            <div className="row mb-0">
              <div className="col-sm-6">
                <label className="form-label">Expiry Date*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">CVV*</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
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
