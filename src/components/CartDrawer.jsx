import React from "react";
import { Link } from "react-router-dom";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  deliveryCity,
  setDeliveryCity,
  storeSettings,
}) => {
  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery Fee calculation
  const isFreeDelivery = subtotal >= storeSettings.freeDeliveryThreshold;
  const insideFee = storeSettings.insideDhakaFee ?? storeSettings.insideJamalpurFee ?? 70;
  const outsideFee = storeSettings.outsideDhakaFee ?? storeSettings.outsideJamalpurFee ?? 130;
  const deliveryFee = isFreeDelivery
    ? 0
    : (deliveryCity === "Dhaka" || deliveryCity === "Jamalpur")
      ? insideFee
      : outsideFee;

  const grandTotal = subtotal + deliveryFee;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(9, 18, 29, 0.65)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 35px rgba(15, 27, 43, 0.25)",
        }}
        className="animate-slide-cart"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eef2f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0f1b2b",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} style={{ color: "#d4af37" }} />
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
              Your Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#ffffff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div
          style={{
            backgroundColor: "#fef9c3",
            padding: "10px 24px",
            fontSize: "0.8rem",
            color: "#854d0e",
            fontWeight: 600,
            borderBottom: "1px solid #fef08a",
            textAlign: "center",
          }}
        >
          {isFreeDelivery ? (
            <span>🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong>!</span>
          ) : (
            <span>
              Add <strong>৳{(storeSettings.freeDeliveryThreshold - subtotal).toLocaleString()}</strong> more to get <strong>FREE Delivery</strong>!
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "20px 24px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto",
                  color: "#94a3b8",
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
                Your cart is empty
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "20px" }}>
                Explore our luxury accessories and pick your favorites.
              </p>
              <button onClick={onClose} className="btn-navy" style={{ padding: "10px 24px" }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #f1f5f9",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <h5
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h5>
                    <div style={{ color: "#d4af37", fontWeight: 800, fontSize: "0.95rem", marginBottom: "8px" }}>
                      ৳{item.price.toLocaleString()}
                    </div>
                    {/* Quantity controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, minWidth: "16px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      padding: "6px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Total & Checkout */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #eef2f6",
              backgroundColor: "#f8fafc",
            }}
          >
            {/* Delivery Location Selector */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Delivery Destination:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button
                  onClick={() => setDeliveryCity("Dhaka")}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: deliveryCity === "Dhaka" ? "1.5px solid #d4af37" : "1px solid #cbd5e1",
                    backgroundColor: deliveryCity === "Dhaka" ? "rgba(212, 175, 55, 0.15)" : "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    color: "#0f172a",
                  }}
                >
                  Inside Dhaka (৳{insideFee})
                </button>
                <button
                  onClick={() => setDeliveryCity("outside")}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: deliveryCity === "outside" ? "1.5px solid #d4af37" : "1px solid #cbd5e1",
                    backgroundColor: deliveryCity === "outside" ? "rgba(212, 175, 55, 0.15)" : "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    color: "#0f172a",
                  }}
                >
                  Outside Dhaka (৳{outsideFee})
                </button>
              </div>
            </div>

            {/* Calculations */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "6px" }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 700, color: "#0f172a" }}>৳{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "12px" }}>
              <span>Delivery Charge:</span>
              <span style={{ fontWeight: 700, color: isFreeDelivery ? "#10b981" : "#0f172a" }}>
                {isFreeDelivery ? "FREE" : `৳${deliveryFee}`}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#0f1b2b",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "12px",
                marginBottom: "16px",
              }}
            >
              <span>Total Amount:</span>
              <span style={{ color: "#0f1b2b" }}>৳{grandTotal.toLocaleString()}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onProceedCheckout}
              className="btn-gold"
              style={{ width: "100%", padding: "14px", fontSize: "1rem", marginBottom: "8px" }}
            >
              <span>Proceed to Cash on Delivery</span>
              <ArrowRight size={18} />
            </button>

            <Link
              to="/cart"
              onClick={onClose}
              style={{
                display: "block",
                textAlign: "center",
                padding: "10px",
                borderRadius: "50px",
                border: "1px solid #cbd5e1",
                color: "#1e293b",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              View Full Cart Page
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "12px",
                fontSize: "0.78rem",
                color: "#64748b",
              }}
            >
              <ShieldCheck size={14} style={{ color: "#10b981" }} />
              <span>No advance payment needed • Pay at your doorstep</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
