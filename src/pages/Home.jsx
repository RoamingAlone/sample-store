import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";


function Home() {
  const [products, setProducts] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(2);
  const [moreProducts, setMoreProducts] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch initial batches (1 and 2) on component mount
  useEffect(() => {
    fetchBatch(1);
    fetchBatch(2);
  }, []);

  // Fetch products from API by batch number
  const fetchBatch = async (batchNumber) => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `https://huitian.serv00.net/project/?type=list&batchNumber=${batchNumber}`
      );
      
      const data = await response.json();
      
      // Add new products to existing products
      setProducts(prevProducts => [...prevProducts, ...data.products]);
      
      // Update moreProducts flag from API response
      setMoreProducts(data.moreProducts);
      
      // Update current batch number
      if (batchNumber > currentBatch) {
        setCurrentBatch(batchNumber);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Load more products (fetch next batch)
  const loadMoreProducts = () => {
    const nextBatch = currentBatch + 1;
    fetchBatch(nextBatch);
  };

  // Add to cart function
  const handleAddToCart = (product, event) => {
    event.preventDefault();
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  // Navigate to product details page
  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading && products.length === 0) {
    return (
      <section className="page page-home">
        <h1>Products</h1>
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section className="page page-home">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((product, index) => (
          <article key={`${product.productId}-${index}`} className="product-card">
            <div 
              className="product-card__image"
              onClick={() => handleImageClick(product.productId)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/200"}
                alt={product.name || product.productId}
              />
            </div>
            <h2 className="product-card__name">{product.name || product.productId}</h2>
            <p className="product-card__id">
              <strong>Product ID:</strong> {product.productId}
            </p>
            <p className="product-card__price">
              {product.price}
            </p>
            <div className="product-card__actions">
              <Link
                to={`/product/${product.productId}`}
                className="btn-secondary"
              >
                View Details
              </Link>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Load more button - only visible if moreProducts is true */}
      {moreProducts && (
        <div className="load-more-container">
          <button
            onClick={loadMoreProducts}
            className="btn-load-more"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more products"}
          </button>
        </div>
      )}
    </section>
  );
}

export default Home;