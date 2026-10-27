import React, { useState } from "react";
import { Star, ShoppingBag, Check, Zap } from "lucide-react";

export const ProductCard = ({ product, onAddToCart, onBuyNow, onSelectProduct }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    onBuyNow(product);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #eef2f6",
        boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
      }}
      className="product-card"
      onClick={() => onSelectProduct && onSelectProduct(product)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(15, 27, 43, 0.1)";
        e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(15, 23, 42, 0.05)";
        e.currentTarget.style.borderColor = "#eef2f6";
      }}
    >
      {/* Product Image & Badges */}
      <div
        className="product-card-img-wrap"
        style={{
          position: "relative",
          height: "230px",
          backgroundColor: "#f8fafc",
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {/* Badge (Bestseller, Hot, etc.) - On mobile, hide when discount exists so only the prominent savings badge is shown */}
        {product.badge && (
          <span
            className={`product-card-badge-main ${product.oldPrice && product.oldPrice > product.price ? "hide-on-mobile-has-discount" : ""}`}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: product.badge === "HOT" ? "#ef4444" : "#0f1b2b",
              color: product.badge === "HOT" ? "#ffffff" : "#d4af37",
              fontSize: "0.68rem",
              fontWeight: 800,
              padding: "3px 8px",
              borderRadius: "4px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              border: product.badge === "HOT" ? "none" : "1px solid rgba(212, 175, 55, 0.4)",
              zIndex: 2,
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Discount Tag */}
        {product.oldPrice && product.oldPrice > product.price && (
          <span
            className="product-card-badge-discount"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#d4af37",
              color: "#0f1b2b",
              fontSize: "0.68rem",
              fontWeight: 800,
              padding: "3px 6px",
              borderRadius: "4px",
              zIndex: 2,
            }}
          >
            -৳{product.oldPrice - product.price}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div
        className="product-card-body"
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Rating and Reviews */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", color: "#f59e0b" }}>
            <Star size={13} fill="#f59e0b" />
            <Star size={13} fill="#f59e0b" />
            <Star size={13} fill="#f59e0b" />
            <Star size={13} fill="#f59e0b" />
            <Star size={13} fill="#f59e0b" />
          </div>
          <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
            {product.rating} ({product.reviewsCount || 18})
          </span>
        </div>

        {/* Title */}
        <h3
          className="product-card-title"
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "8px",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "38px",
          }}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Pricing */}
        <div
          className="product-card-price-wrap"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "14px",
            marginTop: "auto",
            flexWrap: "wrap",
          }}
        >
          <span
            className="product-card-price"
            style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f1b2b" }}
          >
            ৳{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: "0.82rem",
                color: "#94a3b8",
                textDecoration: "line-through",
              }}
            >
              ৳{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Dual Actions: Add to Cart + Buy COD Now */}
        <div
          className="product-card-buttons"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          <button
            onClick={handleAdd}
            className="btn-add-cart"
            style={{
              padding: "9px 6px",
              borderRadius: "50px",
              border: "1.5px solid #0f1b2b",
              backgroundColor: added ? "#10b981" : "#ffffff",
              color: added ? "#ffffff" : "#0f1b2b",
              fontWeight: 700,
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {added ? (
              <>
                <Check size={14} /> <span className="btn-text">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> <span className="btn-text">Add</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuy}
            className="btn-gold btn-order-cod"
            style={{
              padding: "9px 6px",
              fontSize: "0.8rem",
              borderRadius: "50px",
              whiteSpace: "nowrap",
            }}
          >
            <Zap size={13} fill="#ffffff" style={{ flexShrink: 0 }} />
            <span className="cod-text-full">Order COD</span>
            <span className="cod-text-short">Order</span>
          </button>
        </div>
      </div>

      <style>{`
        .btn-order-cod .cod-text-short {
          display: none;
        }
        @media (max-width: 640px) {
          .hide-on-mobile-has-discount {
            display: none !important;
          }
          .product-card-badge-discount {
            top: 7px !important;
            right: 7px !important;
            font-size: 0.65rem !important;
            padding: 2px 6px !important;
          }
          .product-card-badge-main {
            top: 7px !important;
            left: 7px !important;
            font-size: 0.65rem !important;
            padding: 2px 6px !important;
          }
          .product-card {
            min-width: 0 !important;
            overflow: hidden !important;
          }
          .product-card-img-wrap {
            height: 145px !important;
          }
          .product-card-body {
            padding: 9px 8px !important;
          }
          .product-card-title {
            font-size: 0.82rem !important;
            min-height: 32px !important;
            margin-bottom: 5px !important;
          }
          .product-card-price {
            font-size: 1rem !important;
          }
          .product-card-buttons {
            display: flex !important;
            gap: 5px !important;
            align-items: center !important;
            width: 100% !important;
          }
          .btn-add-cart {
            width: 32px !important;
            min-width: 32px !important;
            height: 32px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            flex-shrink: 0 !important;
          }
          .btn-add-cart .btn-text {
            display: none !important;
          }
          .btn-order-cod {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            height: 32px !important;
            padding: 0 8px !important;
            font-size: 0.74rem !important;
            gap: 4px !important;
            border-radius: 30px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .btn-order-cod span {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
        }
        @media (max-width: 360px) {
          .btn-order-cod .cod-text-full {
            display: none !important;
          }
          .btn-order-cod .cod-text-short {
            display: inline !important;
          }
          .product-card-body {
            padding: 8px 6px !important;
          }
        }
      `}</style>
    </div>
  );
};
