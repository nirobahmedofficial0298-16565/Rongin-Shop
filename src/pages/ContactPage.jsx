import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { sendContactEmailNotification } from "../services/emailNotification";

export const ContactPage = ({ storeSettings }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Product Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Contact Us | Rongin Shop";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Send email notification to store official Gmail
    await sendContactEmailNotification(formData, storeSettings.email);

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="contact-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #09121d 0%, #0e1a2b 50%, #15243b 100%)",
          color: "#ffffff",
          padding: "70px 20px 60px 20px",
          textAlign: "center",
          borderBottom: "2px solid #d4af37",
        }}
      >
        <div className="container">
          <span
            style={{
              color: "#f3dc8d",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "12px",
            }}
          >
            <Sparkles size={14} />
            <span>WE ARE HERE FOR YOU</span>
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            Contact & Store Location
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.05rem" }}>
            Visit our physical store at Wireless Gate, Mohakhali, Dhaka or message us directly for fast support.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main-section" style={{ padding: "40px 20px 30px 20px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: "40px",
            }}
            className="contact-grid"
          >
            {/* Left: Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Address Card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "28px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#d4af37",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "#0f1b2b", marginBottom: "6px" }}>
                      Store Address
                    </h3>
                    <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "14px" }}>
                      Wireless Gate, Mohakhali, <br />
                      Dhaka, Bangladesh.
                    </p>
                    <a
                      href={storeSettings.directionsUrl || "https://maps.app.goo.gl/aRiJPn7RB6RBYopJ8"}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>Get Map Directions</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone & Hotline Card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "28px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#d4af37",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "#0f1b2b", marginBottom: "6px" }}>
                      Hotline & WhatsApp
                    </h3>
                    <p style={{ color: "#475569", fontSize: "0.95rem", marginBottom: "8px" }}>
                      Phone: <a href={`tel:${storeSettings.phone}`} style={{ color: "#0f172a", fontWeight: 700, textDecoration: "none" }}>{storeSettings.phone}</a>
                    </p>
                    <p style={{ color: "#475569", fontSize: "0.95rem", marginBottom: "14px" }}>
                      Email: <a href={`mailto:${storeSettings.email}`} style={{ color: "#0f172a", fontWeight: 700, textDecoration: "none" }}>{storeSettings.email}</a>
                    </p>

                    <a
                      href={`https://wa.me/${storeSettings.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: "#25D366",
                        color: "#ffffff",
                        padding: "8px 16px",
                        borderRadius: "50px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div
                style={{
                  backgroundColor: "#0e1a2b",
                  borderRadius: "14px",
                  padding: "24px 28px",
                  color: "#ffffff",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                }}
              >
                <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "10px" }}>
                  <Clock size={20} style={{ color: "#d4af37" }} />
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", margin: 0, color: "#f3dc8d" }}>
                    Operating Hours
                  </h4>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
                  Saturday – Friday (7 Days a Week): <br />
                  <strong>9:00 AM – 10:00 PM</strong> <br />
                  Online Orders are accepted 24/7.
                </p>
              </div>
            </div>

            {/* Right: Message Form */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "36px 32px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.8rem",
                  color: "#0f1b2b",
                  marginBottom: "8px",
                }}
              >
                Send Us a Message
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "24px" }}>
                Fill out the form below and we will get back to you shortly.
              </p>

              {submitted ? (
                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "12px",
                    padding: "24px",
                    textAlign: "center",
                    color: "#166534",
                  }}
                >
                  <CheckCircle size={40} style={{ margin: "0 auto 12px auto", color: "#22c55e" }} />
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "6px" }}>
                    Message Sent Successfully!
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "#15803d", marginBottom: "18px", lineHeight: 1.6 }}>
                    ধন্যবাদ, {formData.name}। আপনার বার্তাটি আমাদের অফিসিয়াল স্টোর ইমেইলে (<strong>{storeSettings.email}</strong>) পৌঁছে গেছে। আমরা দ্রুত আপনার সাথে যোগাযোগ করব।
                  </p>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                    <a
                      href={`https://wa.me/${storeSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello Rongin Store,\nName: ${formData.name}\nSubject: ${formData.subject}\nMessage: ${formData.message}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: "#25D366",
                        color: "#ffffff",
                        fontWeight: 700,
                        padding: "10px 18px",
                        borderRadius: "50px",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp-এ মেসেজ পাঠান</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", phone: "", email: "", subject: "Product Inquiry", message: "" });
                      }}
                      style={{
                        backgroundColor: "#f1f5f9",
                        color: "#334155",
                        fontWeight: 600,
                        padding: "10px 18px",
                        borderRadius: "50px",
                        border: "1px solid #cbd5e1",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nirob Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="contact-input-row">
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.92rem",
                        backgroundColor: "#ffffff",
                        outline: "none",
                      }}
                    >
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Status & Delivery">Order Status & Delivery</option>
                      <option value="Gift Box Consultation">Gift Box Consultation</option>
                      <option value="Other Feedback">Other Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your inquiry or question here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.92rem",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold"
                    style={{
                      padding: "14px",
                      borderRadius: "50px",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginTop: "6px",
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    <span>{isSubmitting ? "বার্তা পাঠানো হচ্ছে..." : "Submit & Send Message"}</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
