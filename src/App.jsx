import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home page — “/” */}
        <Route path="/" element={<Home />} />

        {/* Product details page — “/product/:productId” */}
        <Route path="/product/:productId" element={<ProductDetails />} />

        {/* Cart page — “/cart” */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout page — “/checkout” */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Layout>
  );
}

export default App;
