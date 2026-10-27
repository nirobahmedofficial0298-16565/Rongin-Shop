import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
  Zap,
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  MessageCircle,
  Share2,
  Copy,
} from "lucide-react";
import { ProductCard } from "../components/ProductCard";

export const ProductDetailsPage = ({
  products,
  onAddToCart,
  onBuyNow,
  storeSettings = {},
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (product) {
      document.title = `${product.title} | Rongin Luxury Store`;
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "16px", color: "#0f1b2b" }}>
          Product Not Found
        </h2>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          The product you are looking for might have been removed or is unavailable.
        </p>
        <Link to="/products" className="btn-gold" style={{ padding: "12px 28px", textDecoration: "none" }}>
          Back to All Products
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow({ ...product, quantity });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} at Rongin!`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const insideFee = storeSettings.insideDhakaFee ?? storeSettings.insideDhakaFee ?? 70;
  const outsideFee = storeSettings.outsideDhakaFee ?? storeSettings.outsideDhakaFee ?? 130;
  const freeThreshold = storeSettings.freeDeliveryThreshold ?? 2500;
  const whatsappNum = (storeSettings.whatsapp || "8801700000000").replace(/[^0-9]/g, "");

  return (
    <div className="product-details-page">
      {/* Breadcrumb Navigation */}
      <nav className="pdp-breadcrumbs-bar" aria-label="Breadcrumb">
        <div className="container">
          <div className="pdp-breadcrumbs-content">
            <Link to="/">Home</Link>
            <ChevronRight size={13} className="crumb-sep" />
            <Link to="/products">Products</Link>
            <ChevronRight size={13} className="crumb-sep" />
            <Link to={`/products?category=${product.category}`} className="crumb-cat">
              {product.category}
            </Link>
            <ChevronRight size={13} className="crumb-sep" />
            <span className="crumb-current">{product.title}</span>
          </div>
        </div>
      </nav>

      <div className="container pdp-main-container">


        {/* Product Main Showcase Card */}
        <section className="pdp-card">
          {/* Left Column: Image Showcase */}
          <div className="pdp-gallery-col">
            <div className="pdp-image-frame">
              <img
                src={product.image}
                alt={product.title}
                className="pdp-main-image"
                loading="eager"
              />

              {/* Product Badge */}
              {product.badge && (
                <span
                  className="pdp-badge"
                  style={{
                    backgroundColor: product.badge === "HOT" ? "#ef4444" : product.badge === "BESTSELLER" ? "#d4af37" : "#0f1b2b",
                  }}
                >
                  {product.badge}
                </span>
              )}

              {/* Share Button on Top Right of Image */}
              <button
                onClick={handleShare}
                className="pdp-share-btn"
                title="Share product link"
                aria-label="Share product"
              >
                {copiedLink ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
              </button>
            </div>
            {copiedLink && (
              <div className="pdp-toast-copied">
                <Check size={14} /> Link copied to clipboard!
              </div>
            )}
          </div>

          {/* Right Column: Details & Ordering Actions */}
          <div className="pdp-info-col">
            {/* Category Tag & Stock Status */}
            <div className="pdp-meta-row">
              <span className="pdp-category-tag">{product.category}</span>
              <span className="pdp-meta-sep">•</span>
              <span className="pdp-stock-status">
                <span className="pdp-pulse-dot"></span>
                In Stock ({product.stock || 12} units available)
              </span>
            </div>

            {/* Product Title */}
            <h1 className="pdp-title">{product.title}</h1>

            {/* Star Rating & Reviews */}
            <div className="pdp-rating-row">
              <div className="pdp-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="pdp-rating-score">{product.rating || 5.0}</span>
              <span className="pdp-reviews-count">
                ({product.reviewsCount || 42} Customer Reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="pdp-price-box">
              <div className="pdp-price-current">
                ৳{product.price.toLocaleString()}
              </div>
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="pdp-price-old-wrap">
                  <span className="pdp-price-old">
                    ৳{product.oldPrice.toLocaleString()}
                  </span>
                  <span className="pdp-save-badge">
                    Save ৳{(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="pdp-description">
              {product.description ||
                "Crafted with premium materials and high precision, this item exemplifies timeless luxury. Ideal for personal style or gifting."}
            </p>

            {/* ========================================================
                PURCHASE ACTIONS SECTION:
                Row 1: Quantity Stepper + "Add to Cart" Button
                Row 2: "Buy Now (Cash on Delivery)" Button directly underneath!
                ======================================================== */}
            <div className="pdp-purchase-actions">
              {/* Row 1: Stepper + Add to Cart */}
              <div className="pdp-actions-row-top">
                <div className="pdp-qty-stepper" aria-label="Quantity selector">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="pdp-qty-btn"
                  >
                    −
                  </button>
                  <span className="pdp-qty-val">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="pdp-qty-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`pdp-btn-cart ${added ? "added" : ""}`}
                >
                  {added ? (
                    <>
                      <Check size={18} className="pdp-spin-check" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Buy Now (Cash on Delivery) - Directly underneath Add to Cart */}
              <button
                type="button"
                onClick={handleBuy}
                className="pdp-btn-cod"
                title="ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
              >
                <div className="pdp-btn-cod-inner">
                  <Zap size={20} className="pdp-btn-cod-icon" />
                  <span className="pdp-btn-cod-main">Buy Now (Cash on Delivery)</span>
                </div>
              </button>
            </div>

            {/* Guarantees & Perks Card */}
            <div className="pdp-perks-card">
              <div className="pdp-perk-item">
                <div className="pdp-perk-icon-wrap gold">
                  <Truck size={17} />
                </div>
                <div className="pdp-perk-text">
                  <strong>ডেলিভারি চার্জ:</strong> জামালপুরের ভেতরে ৳{insideFee} • বাইরে ৳{outsideFee}{" "}
                  {freeThreshold && (
                    <span className="pdp-perk-highlight">
                      (৳{freeThreshold}+ অর্ডারে ফ্রি ডেলিভারি)
                    </span>
                  )}
                </div>
              </div>

              <div className="pdp-perk-item">
                <div className="pdp-perk-icon-wrap green">
                  <ShieldCheck size={17} />
                </div>
                <div className="pdp-perk-text">
                  <strong>ক্যাশ অন ডেলিভারি:</strong> পার্সেল ডেলিভারি ম্যানের সামনে খুলে দেখে মূল্য পরিশোধ করতে পারবেন।
                </div>
              </div>

              <div className="pdp-perk-item">
                <div className="pdp-perk-icon-wrap blue">
                  <RotateCcw size={17} />
                </div>
                <div className="pdp-perk-text">
                  <strong>১০০% অরিজিনাল:</strong> কোয়ালিটি গ্যারান্টি এবং ৭ দিনের সহজ রিপ্লেসমেন্ট সুবিধা।
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Assistance */}
            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(
                `Hello Rongin Store, I am interested in: ${product.title} (Price: ৳${product.price}). Please share more details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pdp-whatsapp-help"
            >
              <MessageCircle size={18} color="#25D366" />
              <span>প্রোডাক্ট সম্পর্কে কোনো প্রশ্ন আছে? সরাসরি WhatsApp এ কথা বলুন</span>
            </a>
          </div>
        </section>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="pdp-related-section">
            <div className="pdp-related-header">
              <h2 className="pdp-related-title">Related Collection Items</h2>
              <Link to={`/products?category=${product.category}`} className="pdp-related-view-all">
                View All {product.category}
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="pdp-related-grid">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                  onSelectProduct={(selected) => navigate(`/product/${selected.id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Scoped Responsive Styles */}
      <style>{`
        /* --- Base Page Layout --- */
        .product-details-page {
          background-color: #f8fafc;
          min-height: 100vh;
          padding-bottom: 24px;
        }

        .pdp-main-container {
          margin-top: 24px;
        }

        /* --- Breadcrumb Bar --- */
        .pdp-breadcrumbs-bar {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 12px 0;
        }

        .pdp-breadcrumbs-content {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #64748b;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
        }

        .pdp-breadcrumbs-content::-webkit-scrollbar {
          display: none;
        }

        .pdp-breadcrumbs-content a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .pdp-breadcrumbs-content a:hover {
          color: #d4af37;
        }

        .crumb-sep {
          flex-shrink: 0;
          color: #cbd5e1;
        }

        .crumb-cat {
          text-transform: capitalize;
        }

        .crumb-current {
          color: #0f172a;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 280px;
        }

        /* --- Back Button --- */
        .pdp-back-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 16px;
          padding: 6px 0;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .pdp-back-btn:hover {
          color: #0f1b2b;
          transform: translateX(-3px);
        }

        /* --- Main Product Card --- */
        .pdp-card {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1.05fr 1.15fr;
          gap: 44px;
          align-items: start;
        }

        /* --- Left Column: Gallery --- */
        .pdp-gallery-col {
          position: sticky;
          top: 90px;
        }

        .pdp-image-frame {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #eef2f6;
          background-color: #f1f5f9;
          position: relative;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);
        }

        .pdp-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pdp-image-frame:hover .pdp-main-image {
          transform: scale(1.04);
        }

        .pdp-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 5px 14px;
          border-radius: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          text-transform: uppercase;
          z-index: 2;
        }

        .pdp-share-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          border: 1px solid #e2e8f0;
          color: #334155;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 2;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }

        .pdp-share-btn:hover {
          background-color: #ffffff;
          transform: scale(1.08);
          color: #d4af37;
        }

        .pdp-toast-copied {
          margin-top: 10px;
          font-size: 0.82rem;
          color: #059669;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 6px 12px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        /* --- Right Column: Info & Actions --- */
        .pdp-info-col {
          display: flex;
          flex-direction: column;
        }

        .pdp-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .pdp-category-tag {
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #d4af37;
        }

        .pdp-meta-sep {
          color: #cbd5e1;
        }

        .pdp-stock-status {
          font-size: 0.8rem;
          color: #059669;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pdp-pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pdpPulse 1.8s infinite;
        }

        @keyframes pdpPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .pdp-title {
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: clamp(1.5rem, 2.8vw, 2.15rem);
          font-weight: 800;
          color: #0f1b2b;
          line-height: 1.25;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }

        .pdp-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .pdp-stars {
          display: flex;
          gap: 2px;
          color: #f59e0b;
        }

        .pdp-rating-score {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
        }

        .pdp-reviews-count {
          font-size: 0.84rem;
          color: #64748b;
        }

        /* --- Price Box --- */
        .pdp-price-box {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 14px 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .pdp-price-current {
          font-size: clamp(1.75rem, 2.5vw, 2.15rem);
          font-weight: 900;
          color: #0f1b2b;
          letter-spacing: -0.5px;
        }

        .pdp-price-old-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pdp-price-old {
          font-size: 1.15rem;
          color: #94a3b8;
          text-decoration: line-through;
          font-weight: 500;
        }

        .pdp-save-badge {
          font-size: 0.78rem;
          font-weight: 800;
          color: #dc2626;
          background-color: #fee2e2;
          padding: 3px 9px;
          border-radius: 6px;
          letter-spacing: 0.2px;
        }

        .pdp-description {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 22px;
        }

        /* ========================================================
           PURCHASE ACTIONS (Row 1: Stepper + Add to Cart | Row 2: COD)
           ======================================================== */
        .pdp-purchase-actions {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .pdp-actions-row-top {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
        }

        /* Stepper */
        .pdp-qty-stepper {
          display: flex;
          align-items: center;
          border: 1.5px solid #cbd5e1;
          border-radius: 50px;
          background-color: #ffffff;
          padding: 4px;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .pdp-qty-btn {
          width: 38px;
          height: 38px;
          border: none;
          background: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: 700;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .pdp-qty-btn:hover {
          background-color: #f1f5f9;
          color: #0f1b2b;
        }

        .pdp-qty-val {
          width: 36px;
          text-align: center;
          font-weight: 800;
          font-size: 1.05rem;
          color: #0f1b2b;
          user-select: none;
        }

        /* Add to Cart Button */
        .pdp-btn-cart {
          flex: 1;
          padding: 13px 22px;
          background-color: #0f1b2b;
          color: #ffffff;
          border: 2px solid #0f1b2b;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.96rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: all 0.22s ease;
          box-shadow: 0 4px 14px rgba(15, 27, 43, 0.15);
          height: 48px;
        }

        .pdp-btn-cart:hover {
          background-color: #1e293b;
          border-color: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(15, 27, 43, 0.22);
        }

        .pdp-btn-cart.added {
          background-color: #059669;
          border-color: #059669;
          color: #ffffff;
        }

        /* Row 2: Buy Now (Cash on Delivery) - Prominent, full-width */
        .pdp-btn-cod {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #0f1b2b 0%, #1e293b 100%);
          color: #ffffff;
          border: 2px solid #d4af37;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.22);
          position: relative;
          overflow: hidden;
        }

        .pdp-btn-cod::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .pdp-btn-cod:hover::before {
          left: 100%;
        }

        .pdp-btn-cod:hover {
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
          color: #0f1b2b;
          border-color: #b8860b;
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(212, 175, 55, 0.45);
        }

        .pdp-btn-cod:active {
          transform: scale(0.985);
        }

        .pdp-btn-cod-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .pdp-btn-cod-icon {
          color: #d4af37;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .pdp-btn-cod:hover .pdp-btn-cod-icon {
          color: #0f1b2b;
          transform: scale(1.15);
        }

        .pdp-btn-cod-main {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.3px;
        }

        .pdp-btn-cod-bengali {
          font-size: 0.78rem;
          font-weight: 600;
          opacity: 0.85;
          letter-spacing: 0.2px;
        }

        /* --- Perks & Trust Card --- */
        .pdp-perks-card {
          border-top: 1px solid #e2e8f0;
          padding-top: 18px;
          margin-top: 4px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pdp-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pdp-perk-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pdp-perk-icon-wrap.gold {
          background-color: rgba(212, 175, 55, 0.12);
          color: #d4af37;
        }

        .pdp-perk-icon-wrap.green {
          background-color: rgba(16, 185, 129, 0.12);
          color: #10b981;
        }

        .pdp-perk-icon-wrap.blue {
          background-color: rgba(59, 130, 246, 0.12);
          color: #3b82f6;
        }

        .pdp-perk-text {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.5;
        }

        .pdp-perk-text strong {
          color: #1e293b;
        }

        .pdp-perk-highlight {
          color: #059669;
          font-weight: 700;
        }

        /* WhatsApp Direct Assistance */
        .pdp-whatsapp-help {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #f0fdf4;
          border: 1px dashed #86efac;
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 18px;
          text-decoration: none;
          color: #166534;
          font-size: 0.84rem;
          font-weight: 600;
          transition: all 0.2s ease;
          text-align: center;
        }

        .pdp-whatsapp-help:hover {
          background-color: #dcfce7;
          border-color: #4ade80;
          transform: translateY(-1px);
        }

        /* --- Related Products Section --- */
        .pdp-related-section {
          margin-top: 50px;
        }

        .pdp-related-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pdp-related-title {
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          color: #0f1b2b;
          font-weight: 800;
        }

        .pdp-related-view-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #d4af37;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .pdp-related-view-all:hover {
          gap: 8px;
        }

        .pdp-related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        /* ========================================================
           RESPONSIVE BREAKPOINTS (Mobile & Tablet)
           ======================================================== */
        @media (max-width: 1024px) {
          .pdp-card {
            grid-template-columns: 1fr 1fr;
            padding: 28px 24px;
            gap: 30px;
          }
          .pdp-related-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 860px) {
          .pdp-card {
            grid-template-columns: 1fr;
            padding: 22px 18px;
            gap: 24px;
            border-radius: 16px;
          }

          .pdp-gallery-col {
            position: relative;
            top: 0;
            max-width: 520px;
            margin: 0 auto;
            width: 100%;
          }

          .pdp-related-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 540px) {
          .pdp-main-container {
            margin-top: 14px;
            padding-left: 12px;
            padding-right: 12px;
          }

          .pdp-card {
            padding: 16px 14px;
            border-radius: 14px;
            box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
          }

          .pdp-title {
            font-size: 1.35rem;
            margin-bottom: 8px;
          }

          .pdp-price-box {
            padding: 12px 14px;
            gap: 10px;
          }

          .pdp-price-current {
            font-size: 1.6rem;
          }

          .pdp-price-old {
            font-size: 1rem;
          }

          /* Stepper + Add to Cart Row on Mobile */
          .pdp-actions-row-top {
            gap: 10px;
          }

          .pdp-qty-stepper {
            padding: 2px;
          }

          .pdp-qty-btn {
            width: 34px;
            height: 34px;
            font-size: 1.1rem;
          }

          .pdp-qty-val {
            width: 28px;
            font-size: 0.95rem;
          }

          .pdp-btn-cart {
            font-size: 0.9rem;
            padding: 10px 14px;
            height: 44px;
          }

          /* COD Button on Mobile */
          .pdp-btn-cod {
            padding: 12px 16px;
            border-radius: 40px;
          }

          .pdp-btn-cod-main {
            font-size: 0.96rem;
          }

          .pdp-btn-cod-bengali {
            font-size: 0.72rem;
          }

          /* Perks on mobile */
          .pdp-perks-card {
            gap: 10px;
            padding-top: 14px;
          }

          .pdp-perk-text {
            font-size: 0.8rem;
          }

          .pdp-whatsapp-help {
            font-size: 0.78rem;
            padding: 9px 10px;
          }

          /* Related 2-Column Grid on Mobile */
          .pdp-related-section {
            margin-top: 36px;
          }

          .pdp-related-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};
