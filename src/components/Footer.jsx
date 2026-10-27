import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export const Footer = ({ storeSettings, onOpenAdmin }) => {
  return (
    <footer
      style={{
        backgroundColor: "#08101a",
        color: "#cbd5e1",
        borderTop: "2px solid #d4af37",
        paddingTop: "70px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "40px",
            marginBottom: "50px",
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#15243b",
                  border: "2px solid #d4af37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d4af37",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                }}
              >
                R
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    color: "#ffffff",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {storeSettings.storeName || "RONGIN SHOP"}
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#d4af37",
                    fontWeight: 700,
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  LIFESTYLE STORE • MOHAKHALI, DHAKA
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#94a3b8", marginBottom: "20px" }}>
              Your destination for premium style, beauty, gifts & everyday essentials based in Wireless Gate, Mohakhali, Dhaka. Premium quality at affordable prices with Cash on Delivery nationwide.
            </p>

            <div className="footer-badges" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#0e1a2b",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  color: "#d4af37",
                }}
              >
                🛡️ 100% Original Products
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#0e1a2b",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  color: "#d4af37",
                }}
              >
                ⚡ Fast Fast Delivery
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
              <li>
                <Link to="/" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Collections & Categories
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Contact & Store Location
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                marginBottom: "20px",
              }}
            >
              Customer Care
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
              <li>
                <Link to="/about#values" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Our Values & Promise
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Store Hours & Directions
                </Link>
              </li>
              <li>
                <Link to="/checkout" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Cash on Delivery Checkout
                </Link>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/aRiJPn7RB6RBYopJ8"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#94a3b8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <span>Shopify Store Contact</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  style={{
                    color: "#d4af37",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <ShieldCheck size={14} />
                  <span>Admin Order Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                marginBottom: "20px",
              }}
            >
              Our Store
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <MapPin size={18} style={{ color: "#d4af37", flexShrink: 0, marginTop: "2px" }} />
                <span>{storeSettings.address || "Wireless Gate, Mohakhali, Dhaka, Bangladesh"}</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span>{storeSettings.phone}</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Mail size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span>{storeSettings.email}</span>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  padding: "12px",
                  backgroundColor: "#0e1a2b",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "#f3dc8d", fontWeight: 700, marginBottom: "4px" }}>
                  PAYMENT METHODS:
                </div>
                <div style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>
                  💵 Cash on Delivery (COD) • Check before payment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "24px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.82rem",
            color: "#64748b",
          }}
        >
          <div>
            © {new Date().getFullYear()} {storeSettings.storeName || "Rongin Shop"}. All Rights Reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Crafted with</span>
            <Heart size={14} style={{ color: "#ef4444", fill: "#ef4444" }} />
            <span>for the people of Dhaka and beyond</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
