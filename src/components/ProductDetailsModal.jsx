import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  Plus,
  Minus,
  Check,
  Share2,
} from "lucide-react";

export const ProductDetailsModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  storeSettings,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleDirectBuy = () => {
    onBuyNow({ ...product, quantity });
    onClose();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const cleanWhatsApp = storeSettings?.whatsapp
    ? storeSettings.whatsapp.replace(/[^0-9]/g, "")
    : "8801800000000";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        backgroundColor: "rgba(7, 26, 51, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "920px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
          position: "relative",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: "14px 22px",
            borderBottom: "1px solid #eef2f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            <span>Home</span> / <span style={{ textTransform: "capitalize" }}>{product.category}</span> /{" "}
            <strong style={{ color: "#0f172a" }}>{product.title?.slice(0, 30)}...</strong>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={handleShare}
              style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#475569",
              }}
              title="Share Link"
            >
              {copied ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
            </button>
            <button
              onClick={onClose}
              style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#0f172a",
              }}
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body: Split Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "36px",
            padding: "28px",
            overflowY: "auto",
          }}
          className="product-modal-grid"
        >
          {/* Left Column: Image Showcase */}
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                height: "400px",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
              }}
              className="product-modal-image-box"
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {product.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    backgroundColor: product.badge === "HOT" ? "#ef4444" : "#071A33",
                    color: product.badge === "HOT" ? "#ffffff" : "#d4af37",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: "4px",
                    letterSpacing: "1px",
                  }}
                >
                  {product.badge}
                </span>
              )}

              {product.oldPrice && product.oldPrice > product.price && (
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    backgroundColor: "#d4af37",
                    color: "#071A33",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                  }}
                >
                  SAVE ৳{product.oldPrice - product.price}
                </span>
              )}
            </div>

            {/* Thumbnail mini row */}
            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "2px solid #d4af37",
                  cursor: "pointer",
                }}
              >
                <img src={product.image} alt="Thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Category tag */}
            <div
              style={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#d4af37",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              {product.category} COLLECTION
            </div>

            {/* Title with Red Rose Font */}
            <h1
              style={{
                fontFamily: "'Red Rose', cursive, sans-serif",
                fontSize: "1.9rem",
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1.25,
                marginBottom: "12px",
              }}
              className="product-modal-title"
            >
              {product.title}
            </h1>

            {/* Star Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", color: "#f59e0b" }}>
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
              </div>
              <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                {product.rating} ({product.reviewsCount || 24} customer reviews)
              </span>
              <span style={{ color: "#cbd5e1" }}>•</span>
              <span style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: 700 }}>In Stock (Available)</span>
            </div>

            {/* Price Box */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "14px",
                padding: "12px 18px",
                backgroundColor: "#f8fafc",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "#071A33",
                }}
              >
                ৳{product.price.toLocaleString()} BDT
              </span>
              {product.oldPrice && (
                <span style={{ fontSize: "1.05rem", color: "#94a3b8", textDecoration: "line-through" }}>
                  ৳{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                color: "#475569",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              {product.description ||
                "Crafted with utmost precision and authentic materials. Backed by Rongin's 100% genuine quality assurance and hassle-free Cash on Delivery warranty."}
            </p>

            {/* Action Buttons: Row 1 (Quantity + Add to Cart) | Row 2 (COD) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
                {/* Quantity Stepper */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1.5px solid #cbd5e1",
                    borderRadius: "50px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    padding: "2px",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Minus size={15} />
                  </button>
                  <span
                    style={{
                      width: "36px",
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  style={{
                    flex: 1,
                    backgroundColor: added ? "#10b981" : "#071A33",
                    color: "#ffffff",
                    border: "2px solid #071A33",
                    borderRadius: "50px",
                    padding: "12px",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                    height: "44px",
                  }}
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Buy Now (Cash on Delivery) underneath */}
              <button
                onClick={handleDirectBuy}
                className="btn-gold"
                style={{
                  width: "100%",
                  backgroundColor: "#071A33",
                  color: "#ffffff",
                  border: "2px solid #d4af37",
                  borderRadius: "50px",
                  padding: "13px 20px",
                  fontSize: "0.98rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.25)",
                }}
              >
                <Zap size={18} fill="#d4af37" color="#d4af37" /> Buy Now (Cash on Delivery)
              </button>
            </div>

            {/* Trust Highlights Checklist */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "0.82rem",
                color: "#334155",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={16} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span>সারাদেশে ২-৩ দিনে ক্যাশ অন ডেলিভারি (Pay Cash after inspection)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span>১০০% অথেনটিক কোয়ালিটি ও মান যাচাইয়ের নিশ্চয়তা</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <RefreshCw size={16} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span>৭ দিনের সহজ এক্সচেঞ্জ ও রিটার্ন পলিসি</span>
              </div>
            </div>

            {/* WhatsApp Question Button */}
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Rongin,%20I%20have%20a%20question%20about%20${encodeURIComponent(
                product.title
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "16px",
                color: "#25D366",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              <MessageCircle size={18} />
              <span>এই প্রোডাক্টটি নিয়ে WhatsApp এ প্রশ্ন করুন</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 16px !important;
          }
          .product-modal-image-box {
            height: 250px !important;
          }
          .product-modal-title {
            font-size: 1.45rem !important;
          }
        }
      `}</style>
    </div>
  );
};
