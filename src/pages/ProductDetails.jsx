import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }
  return 0;
}

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const numericPrice = parsePrice(product?.price);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://huitian.serv00.net/project/?productId=${productId}`
        );
        const data = await res.json();

        setProduct(data);

        const imagesArray =
          data.imageUrls && data.imageUrls.length
            ? data.imageUrls
            : ["https://via.placeholder.com/400"];
        setMainImage(imagesArray[0]);

        setLoading(false);
      } catch (e) {
        console.error("Error fetching product details:", e);
        setProduct(null);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      ...product,
      price: numericPrice, // send numeric price to cart
    });
    alert(`${product.productId} added to cart!`);
  };

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

  const imagesArray =
    (product.imageUrls && product.imageUrls.length
      ? product.imageUrls
      : [mainImage]
    ).slice(0, 4);

  return (
    <section className="page page-product-details">
      <h1>{product.productId}</h1>

      <div className="product-details-layout">
        <div className="product-details-left">
          <div className="product-details-images">
            {imagesArray.length > 1 && (
              <div className="thumbnail-column">
                {imagesArray.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`thumbnail-placeholder ${
                      mainImage === imgSrc ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(imgSrc)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={imgSrc} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}

            <div className="main-image-placeholder">
              <img src={mainImage} alt={product.productId} />
            </div>
          </div>

          <p className="product-details-price">
            Price: ${numericPrice.toFixed(2)}
          </p>

          <button
            className="btn-primary btn-add-to-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Descriptions */}
          <div className="product-description">
            <h2>Description</h2>
            <p>
              {product.shortDescription ||
                "No description available for this product."}
            </p>
          </div>

          {product.longDescription && (
            <div className="product-description">
              <h2>More Details</h2>
              <p>{product.longDescription}</p>
            </div>
          )}

          {/* Specifications */}
          <div className="product-specs">
            <h2>Specifications</h2>
            <ul>
              {product.screenSize && (
                <li>
                  <strong>Screen size:</strong> {product.screenSize}
                </li>
              )}
              {product.weight && (
                <li>
                  <strong>Weight:</strong> {product.weight}
                </li>
              )}
              {product.batterySpec && (
                <li>
                  <strong>Battery:</strong> {product.batterySpec}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
