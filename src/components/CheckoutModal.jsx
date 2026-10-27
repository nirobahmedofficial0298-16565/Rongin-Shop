import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, MapPin, Phone, User, MessageSquare, AlertCircle, ShoppingBag } from "lucide-react";

export const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  deliveryCity,
  setDeliveryCity,
  storeSettings,
  directBuyItem,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  // Use either direct single item buy or cart items
  const itemsToBuy = directBuyItem
    ? [{ ...directBuyItem, quantity: 1 }]
    : cartItems;

  const subtotal = itemsToBuy.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
      setError("অনুগ্রহ করে আপনার নাম লিখুন (Please enter your name).");
      return;
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 11) {
      setError("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (Please enter valid 11-digit phone number).");
      return;
    }

    if (!address.trim() || address.trim().length < 10) {
      setError("অনুগ্রহ করে পূর্ণ ঠিকানা লিখুন যেমন বাসা/রোড/এলাকা (Please enter detailed delivery address).");
      return;
    }

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
    setCompletedOrder(newOrder || { id: "ORD-NEW", ...orderPayload });
  };

  const handleCloseAll = () => {
    setCompletedOrder(null);
    setCustomerName("");
    setPhoneNumber("");
    setAddress("");
    setNotes("");
    setError("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(9, 18, 29, 0.75)",
        backdropFilter: "blur(6px)",
        padding: "20px",
        overflowY: "auto",
      }}
      onClick={handleCloseAll}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(15, 27, 43, 0.35)",
          position: "relative",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
      >
        {/* Modal Header */}
        <div
          style={{
            backgroundColor: "#0f1b2b",
            color: "#ffffff",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #d4af37",
          }}
        >
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", margin: 0 }}>
              {completedOrder ? "Order Confirmed!" : "Cash On Delivery Checkout"}
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#d4af37" }}>
              {completedOrder ? "ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।" : "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন"}
            </span>
          </div>

          <button
            onClick={handleCloseAll}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "#ffffff",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", flexGrow: 1 }}>
          {completedOrder ? (
            /* Celebration / Success Screen */
            <div style={{ textAlign: "center", padding: "10px 0" }}>
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
                  margin: "0 auto 16px auto",
                  border: "2px solid #10b981",
                }}
              >
                <CheckCircle size={40} />
              </div>

              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "#0f1b2b", marginBottom: "6px" }}>
                অর্ডার সফলভাবে সম্পন্ন হয়েছে!
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "20px" }}>
                অর্ডার আইডি: <strong style={{ color: "#d4af37" }}>{completedOrder.id}</strong>
              </p>

              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "left",
                  marginBottom: "24px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>গ্রাহকের নাম:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{completedOrder.customerName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>মোবাইল:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{completedOrder.phone}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>ডেলিভারি ঠিকানা:</span>
                  <span style={{ fontWeight: 600, color: "#0f172a", textAlign: "right", maxWidth: "60%" }}>
                    {completedOrder.address}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>পেমেন্ট পদ্ধতি:</span>
                  <span style={{ fontWeight: 700, color: "#10b981" }}>Cash On Delivery (ক্যাশ অন ডেলিভারি)</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid #e2e8f0",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                  }}
                >
                  <span>সর্বমোট বিল:</span>
                  <span style={{ color: "#0f1b2b" }}>৳{completedOrder.totalAmount?.toLocaleString()} BDT</span>
                </div>
              </div>

              <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "20px" }}>
                আমাদের প্রতিনিধি শীঘ্রই আপনাকে ফোন দিয়ে অর্ডারটি কনফার্ম করবে।
              </p>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${storeSettings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Rongin,%20I%20have%20placed%20Order%20${completedOrder.id}%20for%20BDT%20${completedOrder.totalAmount}.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: "#25D366",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>WhatsApp এ মেসেজ দিন</span>
                </a>
                <button onClick={handleCloseAll} className="btn-navy" style={{ padding: "12px 24px" }}>
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Order Items Preview */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "10px",
                  padding: "14px",
                  marginBottom: "20px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b", marginBottom: "10px", textTransform: "uppercase" }}>
                  Selected Items ({itemsToBuy.reduce((a, b) => a + b.quantity, 0)})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "130px", overflowY: "auto" }}>
                  {itemsToBuy.map((it) => (
                    <div key={it.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                      <span style={{ color: "#1e293b", fontWeight: 600 }}>
                        {it.title} × {it.quantity}
                      </span>
                      <span style={{ fontWeight: 700, color: "#0f172a" }}>
                        ৳{(it.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input: Full Name */}
              <div style={{ marginBottom: "16px" }}>
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
                    onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                    onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                  />
                  <User size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "#94a3b8" }} />
                </div>
              </div>

              {/* Input: Phone Number */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  মোবাইল নাম্বার (Mobile Number) *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
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
                    onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                    onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                  />
                  <Phone size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "#94a3b8" }} />
                </div>
              </div>

              {/* Delivery Zone Selection */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  ডেলিভারি লোকেশন (Delivery Location) *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div
                    onClick={() => setDeliveryCity("Dhaka")}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: deliveryCity === "Dhaka" ? "2px solid #d4af37" : "1px solid #cbd5e1",
                      backgroundColor: deliveryCity === "Dhaka" ? "rgba(212, 175, 55, 0.12)" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>ঢাকা সিটির ভেতরে</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      {isFreeDelivery ? "ফ্রি ডেলিভারি" : `চার্জ: ৳${storeSettings.insideDhakaFee}`}
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliveryCity("outside")}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: deliveryCity === "outside" ? "2px solid #d4af37" : "1px solid #cbd5e1",
                      backgroundColor: deliveryCity === "outside" ? "rgba(212, 175, 55, 0.12)" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>ঢাকার বাইরে (সারাদেশে)</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      {isFreeDelivery ? "ফ্রি ডেলিভারি" : `চার্জ: ৳${storeSettings.outsideDhakaFee}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Input: Detailed Address */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                  সম্পূর্ণ ডেলিভারি ঠিকানা (Detailed Address) *
                </label>
                <div style={{ position: "relative" }}>
                  <textarea
                    rows={2}
                    required
                    placeholder="বাসা নং, রোড নং, এলাকা/গ্রাম, থানা ও জেলা..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 38px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                    onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                  />
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "#94a3b8" }} />
                </div>
              </div>

              {/* Special Note */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>
                  অর্ডার সংক্রান্ত কোনো নির্দেশনা (ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  placeholder="যেমন: বিকেলে ডেলিভারি দিন অথবা ফোন দিয়ে আসবেন"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Pricing Summary Box */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "6px" }}>
                  <span>সাবটোটাল:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>৳{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#64748b", marginBottom: "8px" }}>
                  <span>ডেলিভারি চার্জ:</span>
                  <span style={{ fontWeight: 700, color: isFreeDelivery ? "#10b981" : "#0f172a" }}>
                    {isFreeDelivery ? "ফ্রি (Free)" : `৳${deliveryFee}`}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid #cbd5e1",
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#0f1b2b",
                  }}
                >
                  <span>সর্বমোট বিল (Total):</span>
                  <span>৳{grandTotal.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* COD Trust Badge */}
              <div
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  color: "#854d0e",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <ShieldCheck size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span>
                  <strong>ক্যাশ অন ডেলিভারি:</strong> অগ্রিম কোনো পেমেন্ট লাগবে না। পণ্যটি রিসিভ করে দেখে টাকা পরিশোধ করবেন।
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-gold"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                }}
              >
                অর্ডার কনফার্ম করুন (Confirm Order)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
