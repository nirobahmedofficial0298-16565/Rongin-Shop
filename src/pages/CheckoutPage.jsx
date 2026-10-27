import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle,
  Phone,
  User,
  MapPin,
  FileText,
  Truck,
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { sendChromeOrderNotification } from "../services/notifications";

export const CheckoutPage = ({
  cartItems,
  onOrderSuccess,
  deliveryCity,
  setDeliveryCity,
  storeSettings,
  directBuyItem,
}) => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Cash On Delivery Checkout | Rongin Shop";
  }, []);

  const itemsToBuy = directBuyItem ? [{ ...directBuyItem, quantity: directBuyItem.quantity || 1 }] : cartItems;

  const subtotal = itemsToBuy.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const isFreeDelivery = subtotal >= storeSettings.freeDeliveryThreshold;
  const insideFee = storeSettings.insideDhakaFee ?? storeSettings.insideJamalpurFee ?? 70;
  const outsideFee = storeSettings.outsideDhakaFee ?? storeSettings.outsideJamalpurFee ?? 130;
  const deliveryFee = isFreeDelivery
    ? 0
    : (deliveryCity === "Dhaka" || deliveryCity === "Jamalpur")
      ? insideFee
      : outsideFee;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন (Please enter your name).");
      return;
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 11) {
      setError("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (Please enter valid 11-digit phone number).");
      return;
    }

    if (!address.trim() || address.trim().length < 8) {
      setError("অনুগ্রহ করে পূর্ণ ঠিকানা লিখুন যেমন বাসা/রোড/এলাকা (Please enter delivery address).");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName: customerName.trim(),
      phone: cleanPhone,
      address: address.trim(),
      city: deliveryCity === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka",
      deliveryFee,
      items: itemsToBuy.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: grandTotal,
      notes: notes.trim(),
    };

    const newOrder = onOrderSuccess(orderPayload);
    setIsSubmitting(false);

    // Trigger Chrome notification + audio chime
    if (newOrder) {
      sendChromeOrderNotification(newOrder);
      setCompletedOrder(newOrder);
    } else {
      setCompletedOrder({ id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, ...orderPayload });
    }
  };

  // If order is completed successfully, render confirmation screen
  if (completedOrder) {
    return (
      <div className="checkout-page" style={{ backgroundColor: "#f8fafc", minHeight: "85vh", padding: "60px 20px" }}>
        <div
          className="container"
          style={{
            maxWidth: "640px",
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            padding: "40px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px auto",
            }}
          >
            <CheckCircle size={44} />
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "#0f1b2b", marginBottom: "8px" }}>
            Order Confirmed!
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "20px" }}>
            ধন্যবাদ, {completedOrder.customerName}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
          </p>

          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e2e8f0",
              textAlign: "left",
              marginBottom: "26px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#64748b", fontSize: "0.88rem" }}>Order ID:</span>
              <strong style={{ color: "#d4af37" }}>{completedOrder.id}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#64748b", fontSize: "0.88rem" }}>Total Amount:</span>
              <strong style={{ color: "#0f172a" }}>৳{completedOrder.totalAmount?.toLocaleString()}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#64748b", fontSize: "0.88rem" }}>Payment Method:</span>
              <span style={{ color: "#10b981", fontWeight: 700 }}>Cash on Delivery (COD)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b", fontSize: "0.88rem" }}>Delivery Address:</span>
              <span style={{ color: "#334155", maxWidth: "260px", textAlign: "right", fontSize: "0.88rem" }}>
                {completedOrder.address}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/${storeSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello Rongin Shop, I just placed order ${completedOrder.id}. Please confirm my delivery.`
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.92rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <MessageCircle size={18} />
              <span>Confirm on WhatsApp</span>
            </a>

            <Link
              to="/products"
              className="btn-gold"
              style={{ padding: "12px 24px", textDecoration: "none", fontSize: "0.92rem" }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If no items in cart
  if (itemsToBuy.length === 0) {
    return (
      <div className="checkout-page" style={{ backgroundColor: "#f8fafc", minHeight: "80vh", padding: "80px 20px" }}>
        <div className="container" style={{ maxWidth: "550px", textAlign: "center" }}>
          <ShoppingBag size={44} style={{ color: "#d4af37", margin: "0 auto 16px auto" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", marginBottom: "12px" }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            Please select at least one product before proceeding to checkout.
          </p>
          <Link to="/products" className="btn-gold" style={{ padding: "12px 28px", textDecoration: "none" }}>
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "50px 20px 80px 20px" }}>
      <div className="container">
        <Link
          to="/cart"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748b",
            textDecoration: "none",
            fontSize: "0.88rem",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Shopping Cart</span>
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2.3rem",
            color: "#0f1b2b",
            marginBottom: "30px",
          }}
        >
          Cash on Delivery Checkout
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "36px",
            alignItems: "flex-start",
          }}
          className="checkout-grid"
        >
          {/* Left Form: Delivery Address */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                color: "#0f1b2b",
                marginBottom: "20px",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "12px",
              }}
            >
              Delivery Details
            </h3>

            {error && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  আপনার সম্পূর্ণ নাম (Full Name) *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. নীরব আহমেদ / Nirob Ahmed"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 38px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                  <User size={16} style={{ position: "absolute", left: "12px", top: "15px", color: "#94a3b8" }} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  মোবাইল নাম্বার (Phone Number) *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="tel"
                    required
                    placeholder="017xxxxxxxx (11 digits)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 38px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                  <Phone size={16} style={{ position: "absolute", left: "12px", top: "15px", color: "#94a3b8" }} />
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
                  ডেলিভারি লোকেশন (Delivery Location) *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryCity("Dhaka")}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: deliveryCity === "Dhaka" ? "1.5px solid #d4af37" : "1px solid #cbd5e1",
                      backgroundColor: deliveryCity === "Dhaka" ? "#0f1b2b" : "#ffffff",
                      color: deliveryCity === "Dhaka" ? "#f3dc8d" : "#334155",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Inside Dhaka (৳{insideFee})
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryCity("outside")}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: deliveryCity === "outside" ? "1.5px solid #d4af37" : "1px solid #cbd5e1",
                      backgroundColor: deliveryCity === "outside" ? "#0f1b2b" : "#ffffff",
                      color: deliveryCity === "outside" ? "#f3dc8d" : "#334155",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Outside Dhaka (৳{outsideFee})
                  </button>
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  পূর্ণ ঠিকানা (Delivery Address) *
                </label>
                <div style={{ position: "relative" }}>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. বাসা নং, রোড নং, এলাকা, থানা ও জেলা"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 38px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.92rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "#94a3b8" }} />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  অর্ডার সংক্রান্ত বিশেষ নোট (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ডেলিভারির আগে কল করবেন"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Payment Method Badge */}
              <div
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.08)",
                  borderRadius: "10px",
                  padding: "14px",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <ShieldCheck size={22} style={{ color: "#d4af37" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>
                    Cash on Delivery (ক্যাশ অন ডেলিভারি)
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    কোনো অগ্রিম পেমেন্ট লাগবে না। পার্সেল দেখে ডেলিভারিম্যানকে টাকা দিন।
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{
                  padding: "15px",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  borderRadius: "50px",
                  marginTop: "6px",
                }}
              >
                <span>{isSubmitting ? "Placing Order..." : `Confirm Order (৳${grandTotal.toLocaleString()})`}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Right Summary: Items preview */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
              position: "sticky",
              top: "100px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                color: "#0f1b2b",
                marginBottom: "18px",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "12px",
              }}
            >
              Order Items ({itemsToBuy.length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", maxHeight: "280px", overflowY: "auto" }}>
              {itemsToBuy.map((it) => (
                <div key={it.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={it.image} alt={it.title} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>
                      {it.title}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      Qty: {it.quantity} × ৳{it.price.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>
                    ৳{(it.price * it.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "8px" }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>৳{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "14px" }}>
                <span>Delivery:</span>
                <span style={{ fontWeight: 700, color: isFreeDelivery ? "#10b981" : "#0f172a" }}>
                  {isFreeDelivery ? "FREE" : `৳${deliveryFee}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#0f1b2b",
                  borderTop: "1.5px solid #e2e8f0",
                  paddingTop: "12px",
                }}
              >
                <span>Total Amount:</span>
                <span>৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
