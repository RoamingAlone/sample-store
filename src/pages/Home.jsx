import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from both API endpoints
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API
        const [batch1Response, batch2Response] = await Promise.all([
          fetch("https://sultan-serv00.net/api/products?type=tablet&number=1"),
          fetch("https://sultan-serv00.net/api/products?type=tablet&number=2")
        ]);
  
        const batch1 = await batch1Response.json();
        const batch2 = await batch2Response.json();
  
        // Combine both batches
        const allProducts = [...batch1, ...batch2];
        setProducts(allProducts);
        setDisplayedProducts(allProducts.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        
        // FALLBACK: Use sample data if API fails
        const sampleProducts = [
          {
            id: "IPHONE17",
            name: "iPhone 17",
            price: 799,
            images: ["https://via.placeholder.com/300x300/4A90E2/ffffff?text=iPhone+17+Pro"],
            description: "Latest iPhone with amazing features",
            specs: { storage: "256GB", ram: "8GB", screen: "6.7 inch" }
          },
          {
            id: "GALAXY_S25",
            name: "Galaxy S25 Ultra",
            price: 1199,
            images: ["https://via.placeholder.com/300x300/50C878/ffffff?text=Galaxy+S25"],
            description: "Premium Android smartphone",
            specs: { storage: "512GB", ram: "12GB", screen: "6.8 inch" }
          },
          {
            id: "MACBOOK_PRO",
            name: "MacBook Pro M4",
            price: 2499,
            images: ["https://via.placeholder.com/300x300/FF6B6B/ffffff?text=MacBook+Pro"],
            description: "Powerful laptop for professionals",
            specs: { storage: "1TB", ram: "16GB", screen: "14 inch" }
          },
          {
            id: "DELL_XPS",
            name: "Dell XPS 15",
            price: 1899,
            images: ["https://via.placeholder.com/300x300/9B59B6/ffffff?text=Dell+XPS"],
            description: "High-performance Windows laptop",
            specs: { storage: "512GB", ram: "16GB", screen: "15.6 inch" }
          },
          {
            id: "IPAD_PRO",
            name: "iPad Pro 13",
            price: 999,
            images: ["https://via.placeholder.com/300x300/3498DB/ffffff?text=iPad+Pro"],
            description: "Professional tablet with M4 chip",
            specs: { storage: "256GB", ram: "8GB", screen: "13 inch" }
          },
          {
            id: "SURFACE_PRO",
            name: "Surface Pro 11",
            price: 1299,
            images: ["https://via.placeholder.com/300x300/E74C3C/ffffff?text=Surface+Pro"],
            description: "Versatile 2-in-1 device",
            specs: { storage: "512GB", ram: "16GB", screen: "13 inch" }
          },
          {
            id: "PIXEL_9",
            name: "Google Pixel 9 Pro",
            price: 999,
            images: ["https://via.placeholder.com/300x300/F39C12/ffffff?text=Pixel+9"],
            description: "Google's flagship phone",
            specs: { storage: "256GB", ram: "12GB", screen: "6.7 inch" }
          },
          {
            id: "ONEPLUS_13",
            name: "OnePlus 13",
            price: 899,
            images: ["https://via.placeholder.com/300x300/1ABC9C/ffffff?text=OnePlus+13"],
            description: "Flagship killer smartphone",
            specs: { storage: "256GB", ram: "12GB", screen: "6.7 inch" }
          },
          {
            id: "LENOVO_THINKPAD",
            name: "Lenovo ThinkPad X1",
            price: 1699,
            images: ["https://via.placeholder.com/300x300/34495E/ffffff?text=ThinkPad"],
            description: "Business-class laptop",
            specs: { storage: "512GB", ram: "16GB", screen: "14 inch" }
          }
        ];
        
        setProducts(sampleProducts);
        setDisplayedProducts(sampleProducts.slice(0, 6));
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  // Load more products (3 at a time)
  const loadMoreProducts = () => {
    const newCount = productsToShow + 3;
    setProductsToShow(newCount);
    setDisplayedProducts(products.slice(0, newCount));
  };

  // Add to cart function
  const addToCart = (product, event) => {
    event.preventDefault();
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Increase quantity if exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item with quantity 1
      existingCart.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    alert(`${product.name} added to cart!`);
  };

  // Navigate to product details when image is clicked
  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
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
        {displayedProducts.map((product) => (
          <article key={product.id} className="product-card">
            <div 
              className="product-card__image"
              onClick={() => handleImageClick(product.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/200"}
                alt={product.name}
              />
            </div>
            <h2 className="product-card__name">{product.name}</h2>
            <p className="product-card__price">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
            <div className="product-card__actions">
              <Link
                to={`/product/${product.id}`}
                className="btn-secondary"
              >
                View Details
              </Link>
              <button
                onClick={(e) => addToCart(product, e)}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Load more button */}
      {displayedProducts.length < products.length && (
        <div className="load-more-container">
          <button
            onClick={loadMoreProducts}
            className="btn-load-more"
          >
            Load more products
          </button>
        </div>
      )}
    </section>
  );
}

export default Home;
