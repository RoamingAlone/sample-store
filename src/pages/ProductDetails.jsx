// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);



// Fetch product details from API
useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // Fetch from both batches and find the product
      const [batch1Response, batch2Response] = await Promise.all([
        fetch("https://sultan-serv00.net/api/products?type=tablet&number=1"),
        fetch("https://sultan-serv00.net/api/products?type=tablet&number=2")
      ]);

      const batch1 = await batch1Response.json();
      const batch2 = await batch2Response.json();
      
      const allProducts = [...batch1, ...batch2];
      const foundProduct = allProducts.find((p) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images?.[0] || "https://via.placeholder.com/400");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      
      // FALLBACK: Use sample data if API fails
      const sampleProducts = [
        {
          id: "IPHONE17",
          name: "iPhone 17",
          price: 799,
          images: [
            "https://via.placeholder.com/400x400/4A90E2/ffffff?text=iPhone+17+Pro+Main",
            "https://via.placeholder.com/400x400/5A9FE2/ffffff?text=iPhone+17+Pro+2",
            "https://via.placeholder.com/400x400/6AAEE2/ffffff?text=iPhone+17+Pro+3",
            "https://via.placeholder.com/400x400/7ABDE2/ffffff?text=iPhone+17+Pro+4"
          ],
          description: "The latest iPhone 17 Pro features an advanced A18 chip, stunning 6.7-inch display, and revolutionary camera system with 5x optical zoom.",
          specs: { storage: "256GB", ram: "8GB", screen: "6.7 inch OLED", battery: "4500mAh" }
        },
        {
          id: "GALAXY_S25",
          name: "Galaxy S25 Ultra",
          price: 1199,
          images: [
            "https://via.placeholder.com/400x400/50C878/ffffff?text=Galaxy+S25+Main",
            "https://via.placeholder.com/400x400/60D888/ffffff?text=Galaxy+S25+2",
            "https://via.placeholder.com/400x400/70E898/ffffff?text=Galaxy+S25+3",
            "https://via.placeholder.com/400x400/80F8A8/ffffff?text=Galaxy+S25+4"
          ],
          description: "Premium Android flagship with Snapdragon 8 Gen 4, 200MP camera, S Pen support, and all-day battery life.",
          specs: { storage: "512GB", ram: "12GB", screen: "6.8 inch Dynamic AMOLED", battery: "5000mAh" }
        },
        {
          id: "MACBOOK_PRO",
          name: "MacBook Pro M4",
          price: 2499,
          images: [
            "https://via.placeholder.com/400x400/FF6B6B/ffffff?text=MacBook+Pro+Main",
            "https://via.placeholder.com/400x400/FF7B7B/ffffff?text=MacBook+Pro+2",
            "https://via.placeholder.com/400x400/FF8B8B/ffffff?text=MacBook+Pro+3",
            "https://via.placeholder.com/400x400/FF9B9B/ffffff?text=MacBook+Pro+4"
          ],
          description: "Powerful laptop with M4 chip, stunning Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for professionals.",
          specs: { storage: "1TB SSD", ram: "16GB", screen: "14 inch Retina", processor: "M4 Chip" }
        },
        {
          id: "DELL_XPS",
          name: "Dell XPS 15",
          price: 1899,
          images: [
            "https://via.placeholder.com/400x400/9B59B6/ffffff?text=Dell+XPS+Main",
            "https://via.placeholder.com/400x400/AB69C6/ffffff?text=Dell+XPS+2",
            "https://via.placeholder.com/400x400/BB79D6/ffffff?text=Dell+XPS+3",
            "https://via.placeholder.com/400x400/CB89E6/ffffff?text=Dell+XPS+4"
          ],
          description: "High-performance Windows laptop with Intel Core i7, NVIDIA RTX graphics, and stunning InfinityEdge display.",
          specs: { storage: "512GB SSD", ram: "16GB", screen: "15.6 inch 4K", processor: "Intel i7-13700H" }
        },
        {
          id: "IPAD_PRO",
          name: "iPad Pro 13",
          price: 999,
          images: [
            "https://via.placeholder.com/400x400/3498DB/ffffff?text=iPad+Pro+Main",
            "https://via.placeholder.com/400x400/44A8EB/ffffff?text=iPad+Pro+2",
            "https://via.placeholder.com/400x400/54B8FB/ffffff?text=iPad+Pro+3",
            "https://via.placeholder.com/400x400/64C8FF/ffffff?text=iPad+Pro+4"
          ],
          description: "Professional tablet with M4 chip, stunning Liquid Retina display, and Apple Pencil Pro support.",
          specs: { storage: "256GB", ram: "8GB", screen: "13 inch Liquid Retina", chip: "M4" }
        },
        {
          id: "SURFACE_PRO",
          name: "Surface Pro 11",
          price: 1299,
          images: [
            "https://via.placeholder.com/400x400/E74C3C/ffffff?text=Surface+Pro+Main",
            "https://via.placeholder.com/400x400/F75C4C/ffffff?text=Surface+Pro+2",
            "https://via.placeholder.com/400x400/FF6C5C/ffffff?text=Surface+Pro+3",
            "https://via.placeholder.com/400x400/FF7C6C/ffffff?text=Surface+Pro+4"
          ],
          description: "Versatile 2-in-1 device with Intel Core processor, detachable keyboard, and Surface Pen support.",
          specs: { storage: "512GB SSD", ram: "16GB", screen: "13 inch PixelSense", processor: "Intel Core i7" }
        },
        {
          id: "PIXEL_9",
          name: "Google Pixel 9 Pro",
          price: 999,
          images: [
            "https://via.placeholder.com/400x400/F39C12/ffffff?text=Pixel+9+Main",
            "https://via.placeholder.com/400x400/FFAC22/ffffff?text=Pixel+9+2",
            "https://via.placeholder.com/400x400/FFBC32/ffffff?text=Pixel+9+3",
            "https://via.placeholder.com/400x400/FFCC42/ffffff?text=Pixel+9+4"
          ],
          description: "Google's flagship phone with Tensor G4 chip, exceptional camera AI, and pure Android experience.",
          specs: { storage: "256GB", ram: "12GB", screen: "6.7 inch OLED", battery: "5050mAh" }
        },
        {
          id: "ONEPLUS_13",
          name: "OnePlus 13",
          price: 899,
          images: [
            "https://via.placeholder.com/400x400/1ABC9C/ffffff?text=OnePlus+13+Main",
            "https://via.placeholder.com/400x400/2ACCAC/ffffff?text=OnePlus+13+2",
            "https://via.placeholder.com/400x400/3ADCBC/ffffff?text=OnePlus+13+3",
            "https://via.placeholder.com/400x400/4AECCC/ffffff?text=OnePlus+13+4"
          ],
          description: "Flagship killer smartphone with Snapdragon 8 Gen 3, 100W fast charging, and Hasselblad cameras.",
          specs: { storage: "256GB", ram: "12GB", screen: "6.7 inch AMOLED", battery: "5400mAh" }
        },
        {
          id: "LENOVO_THINKPAD",
          name: "Lenovo ThinkPad X1",
          price: 1699,
          images: [
            "https://via.placeholder.com/400x400/34495E/ffffff?text=ThinkPad+Main",
            "https://via.placeholder.com/400x400/44596E/ffffff?text=ThinkPad+2",
            "https://via.placeholder.com/400x400/54697E/ffffff?text=ThinkPad+3",
            "https://via.placeholder.com/400x400/64798E/ffffff?text=ThinkPad+4"
          ],
          description: "Business-class laptop with legendary ThinkPad keyboard, military-grade durability, and all-day battery.",
          specs: { storage: "512GB SSD", ram: "16GB", screen: "14 inch IPS", processor: "Intel i7-1365U" }
        }
      ];
      
      const foundProduct = sampleProducts.find((p) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images[0]);
      }
      
      setLoading(false);
    }
  };

  fetchProduct();
}, [productId]);

  // Add to cart function
  const addToCart = () => {
    if (!product) return;
    
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

  // Handle thumbnail click
  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  if (loading) {
    return (
      <section className="page page-product-details">
        <h1>Loading...</h1>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page page-product-details">
        <h1>Product not found</h1>
        <p>No product with ID: {productId}</p>
      </section>
    );
  }

  return (
    <section className="page page-product-details">
      <h1>{product.name}</h1>

      <div className="product-details-layout">
        {/* Left: thumbnails + main image */}
        <div className="product-details-images">
          <div className="thumbnail-column">
            {product.images && product.images.slice(0, 4).map((imgSrc, index) => (
              <div 
                key={index} 
                className={`thumbnail-placeholder ${mainImage === imgSrc ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(imgSrc)}
                style={{ cursor: "pointer" }}
              >
                <img src={imgSrc} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="main-image-placeholder">
            <img src={mainImage} alt={product.name} />
          </div>
        </div>

        {/* Right: info generated from JSON */}
        <div className="product-details-info">
          <div className="product-id">
            <strong>Product ID:</strong> {product.id}
          </div>
          
          <p className="product-details-price">
            Price: ${product.price?.toFixed(2) || "0.00"}
          </p>
          
          <button 
            className="btn-primary btn-add-to-cart"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description || "No description available."}</p>
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="product-specs">
              <h2>Specifications</h2>
              <ul>
                {Object.entries(product.specs).map(([label, value]) => (
                  <li key={label}>
                    <strong>{label.charAt(0).toUpperCase() + label.slice(1)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;