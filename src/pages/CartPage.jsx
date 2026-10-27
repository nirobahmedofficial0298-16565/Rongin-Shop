import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, ArrowLeft } from "lucide-react";

export const CartPage = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  deliveryCity,
  setDeliveryCity,
  storeSettings,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Shopping Cart | Rongin Shop";
  }, []);

  const subtotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const isFreeDelivery = subtotal >= storeSettings.freeDeliveryThreshold;
  const insideFee = storeSettings.insideDhakaFee ?? storeSettings.insideJamalpurFee ?? 70;
  const outsideFee = storeSettings.outsideDhakaFee ?? storeSettings.outsideJamalpurFee ?? 130;
  const deliveryFee = isFreeDelivery
    ? 0
    : (deliveryCity === "Dhaka" || deliveryCity === "Jamalpur")
      ? insideFee
      : outsideFee;
  const grandTotal = subtotal + deliveryFee;

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / storeSettings.freeDeliveryThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ backgroundColor: "#f8fafc", minHeight: "80vh", padding: "80px 20px" }}>
        <div className="container" style={{ maxWidth: "600px", textAlign: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              color: "#d4af37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}
          >
            <ShoppingBag size={38} />
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "#0f1b2b", marginBottom: "12px" }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.6, marginBottom: "28px" }}>
            You haven’t added any items to your bag yet. Discover our latest collections and exclusive gifts!
          </p>
          <Link to="/products" className="btn-gold" style={{ padding: "14px 32px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>Explore Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "50px 20px 80px 20px" }}>
      <div className="container">
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2.4rem",
            color: "#0f1b2b",
            marginBottom: "30px",
          }}
        >
          Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "36px",
            alignItems: "flex-start",
          }}
          className="cart-grid"
        >
          {/* Left: Cart Items List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Free Shipping Progress */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "16px 20px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: 700, marginBottom: "8px" }}>
                <span>
                  {isFreeDelivery
                    ? "🎉 Congratulations! You have unlocked FREE Delivery!"
                    : `Add ৳${(storeSettings.freeDeliveryThreshold - subtotal).toLocaleString()} more for FREE Delivery`}
                </span>
                <span style={{ color: "#d4af37" }}>{freeDeliveryProgress}%</span>
              </div>
              <div style={{ height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${freeDeliveryProgress}%`,
                    backgroundColor: isFreeDelivery ? "#10b981" : "#d4af37",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Item Rows */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)",
                }}
                className="cart-item-row"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-img"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    backgroundColor: "#f8fafc",
                    flexShrink: 0,
                  }}
                />

                <div className="cart-item-info" style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: "0.95rem", color: "#d4af37", fontWeight: 800 }}>
                    ৳{item.price.toLocaleString()}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div
                  className="cart-item-qty"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "2px",
                  }}
                >
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    style={{ width: "32px", height: "32px", border: "none", background: "none", cursor: "pointer", fontSize: "1rem" }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ width: "32px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{ width: "32px", height: "32px", border: "none", background: "none", cursor: "pointer", fontSize: "1rem" }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="cart-item-total" style={{ width: "90px", textAlign: "right", fontWeight: 800, fontSize: "1.05rem", color: "#0f172a" }}>
                  ৳{(item.price * item.quantity).toLocaleString()}
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="cart-item-delete"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: "6px",
                  }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <Link
              to="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#64748b",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                marginTop: "10px",
              }}
            >
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Right: Order Summary Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
              position: "sticky",
              top: "100px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.4rem",
                color: "#0f1b2b",
                marginBottom: "20px",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "12px",
              }}
            >
              Order Summary
            </h3>

            {/* Delivery Destination Toggle */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "8px" }}>
                Delivery Destination:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button
                  onClick={() => setDeliveryCity("Dhaka")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: deliveryCity === "Dhaka" ? "1.5px solid #d4af37" : "1px solid #cbd5e1",
                    backgroundColor: deliveryCity === "Dhaka" ? "#0f1b2b" : "#ffffff",
                    color: deliveryCity === "Dhaka" ? "#f3dc8d" : "#334155",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Inside Dhaka (৳{storeSettings.insideDhakaFee})
                </button>
                <button
                  onClick={() => setDeliveryCity("outside")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: deliveryCity === "outside" ? "1.5px solid #d4af37" : "1px solid #cbd5e1",
                    backgroundColor: deliveryCity === "outside" ? "#0f1b2b" : "#ffffff",
                    color: deliveryCity === "outside" ? "#f3dc8d" : "#334155",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Outside Dhaka (৳{storeSettings.outsideDhakaFee})
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.95rem", marginBottom: "10px" }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 700, color: "#0f172a" }}>৳{subtotal.toLocaleString()}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.95rem", marginBottom: "16px" }}>
              <span>Delivery Fee:</span>
              <span style={{ fontWeight: 700, color: isFreeDelivery ? "#10b981" : "#0f172a" }}>
                {isFreeDelivery ? "FREE" : `৳${deliveryFee}`}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#0f1b2b",
                borderTop: "1.5px solid #e2e8f0",
                paddingTop: "14px",
                marginBottom: "24px",
              }}
            >
              <span>Total Payable:</span>
              <span style={{ color: "#0f1b2b" }}>৳{grandTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn-gold"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                borderRadius: "50px",
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                fontSize: "0.82rem",
                color: "#10b981",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={16} />
              <span>Cash on Delivery (No advance required)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
