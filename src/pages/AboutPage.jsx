import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Tag,
  Users,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Heart,
  Clock,
  Award,
} from "lucide-react";

export const AboutPage = ({ storeSettings }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "About Us | Rongin Shop";
  }, []);

  const values = [
    {
      num: "01",
      title: "Quality Selection",
      description: "Carefully selected products for everyday style and lifestyle.",
      icon: <Award size={26} style={{ color: "#d4af37" }} />,
    },
    {
      num: "02",
      title: "Great Value",
      description: "Enjoy attractive products at prices that make sense.",
      icon: <Tag size={26} style={{ color: "#d4af37" }} />,
    },
    {
      num: "03",
      title: "Something for Everyone",
      description: "From fashion and beauty to gifts and everyday essentials.",
      icon: <Users size={26} style={{ color: "#d4af37" }} />,
    },
    {
      num: "04",
      title: "Easy Shopping",
      description: "Simple browsing, easy ordering and friendly customer support.",
      icon: <ShoppingBag size={26} style={{ color: "#d4af37" }} />,
    },
  ];

  const whyChooseUsPoints = [
    "A wide variety under one roof.",
    "Quality products at fair prices.",
    "Easy and friendly shopping.",
    "A trusted local name in Dhaka.",
    "Thoughtful gifts for every occasion.",
    "Everyday essentials you can rely on.",
  ];

  return (
    <div className="about-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* 1. Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #09121d 0%, #0e1a2b 50%, #15243b 100%)",
          color: "#ffffff",
          padding: "90px 20px 80px 20px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          borderBottom: "2px solid #d4af37",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              borderRadius: "30px",
              fontSize: "0.85rem",
              color: "#f3dc8d",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={16} />
            <span>Rongin Shop</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            About Rongin Shop
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              color: "#d4af37",
              fontFamily: "var(--font-heading)",
              marginBottom: "32px",
              letterSpacing: "0.5px",
            }}
          >
            Your Local Destination for Style, Beauty, Gifts & More.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              to="/products"
              className="btn-gold"
              style={{ padding: "14px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span>Explore All Products</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              style={{
                padding: "14px 26px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              <MapPin size={16} />
              <span>Visit Our Store</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section style={{ padding: "80px 20px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "50px",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "50px 40px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
            className="about-story-grid"
          >
            <div>
              <span
                style={{
                  color: "#d4af37",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                WHERE PASSION MEETS SERVICE
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.3rem",
                  color: "#0f1b2b",
                  lineHeight: 1.25,
                  marginBottom: "22px",
                }}
              >
                Our Story
              </h2>

              <p style={{ color: "#334155", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "18px" }}>
                <strong>Rongin Shop</strong> is a premier multi-category retail store based in <strong>Wireless Gate, Mohakhali, Dhaka</strong>. We bring together a wide variety of fashion accessories, eyewear, watches, beauty products, gifts, and lifestyle essentials in one convenient destination.
              </p>

              <p style={{ color: "#475569", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "26px" }}>
                What began as a passion for curating quality lifestyle products has grown into a trusted shopping destination for the people of Dhaka and across Bangladesh. We believe that everyone deserves access to beautiful, premium and authentic products at fair prices.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid #f1f5f9",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "#d4af37" }}>
                    100%
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Authentic Quality</div>
                </div>
                <div style={{ width: "1px", height: "45px", backgroundColor: "#e2e8f0" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "#0f1b2b" }}>
                    Mohakhali
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Dhaka Flagship</div>
                </div>
                <div style={{ width: "1px", height: "45px", backgroundColor: "#e2e8f0" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "#10b981" }}>
                    Cash on Delivery
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Nationwide Service</div>
                </div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(15, 27, 43, 0.15)",
                  border: "2px solid #d4af37",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                  alt="Rongin Shop Gifts and Lifestyle"
                  style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }}
                />
              </div>
              <div
                className="about-story-badge"
                style={{
                  position: "absolute",
                  bottom: "-18px",
                  left: "-18px",
                  backgroundColor: "#0e1a2b",
                  color: "#ffffff",
                  padding: "16px 22px",
                  borderRadius: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "#d4af37", fontWeight: 700, display: "block" }}>
                  ESTABLISHED WITH CARE
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>Dhaka’s Trusted Lifestyle Store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section id="values" style={{ padding: "70px 20px", backgroundColor: "#f1f5f9" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                color: "#d4af37",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              CORE PRINCIPLES
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.4rem",
                color: "#0f1b2b",
                marginBottom: "12px",
              }}
            >
              Our Values — What We Stand For
            </h2>
            <p style={{ color: "#64748b", maxWidth: "600px", margin: "0 auto", fontSize: "1rem" }}>
              The foundational pillars that inspire our store curation and every customer interaction.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((v) => (
              <div
                key={v.num}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                  position: "relative",
                  transition: "all 0.25s ease",
                }}
                className="value-card"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {v.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "#cbd5e1",
                    }}
                  >
                    {v.num}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    color: "#0f1b2b",
                    marginBottom: "10px",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Customers Choose Us */}
      <section style={{ padding: "80px 20px", backgroundColor: "#0e1a2b", color: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                color: "#d4af37",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              PROUDLY SERVING YOU
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.4rem",
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Why Customers Choose Us
            </h2>
            <p style={{ color: "#cbd5e1", maxWidth: "620px", margin: "0 auto", fontSize: "0.98rem" }}>
              Experience reliable shopping backed by honest values and dedicated customer service.
            </p>
          </div>

          <div
            className="about-why-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "20px",
            }}
          >
            {whyChooseUsPoints.map((point, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#15243b",
                  borderRadius: "12px",
                  padding: "22px 24px",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#d4af37",
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <span style={{ fontSize: "1rem", color: "#f8fafc", fontWeight: 600 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Store & Location */}
      <section style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              borderRadius: "18px",
              padding: "48px 40px",
              border: "1px solid #e2e8f0",
            }}
            className="about-store-grid"
          >
            <div>
              <span
                style={{
                  color: "#d4af37",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                PHYSICAL STORE
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.3rem",
                  color: "#0f1b2b",
                  marginBottom: "20px",
                }}
              >
                Our Store
              </h2>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "20px" }}>
                <MapPin size={24} style={{ color: "#d4af37", flexShrink: 0, marginTop: "4px" }} />
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                    Rongin Shop
                  </div>
                  <div style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.6 }}>
                    Wireless Gate, Mohakhali, <br />
                    Dhaka, Bangladesh.
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "26px" }}>
                <Clock size={20} style={{ color: "#d4af37", flexShrink: 0 }} />
                <div style={{ fontSize: "0.95rem", color: "#475569" }}>
                  Open Daily: 9:00 AM – 10:00 PM
                </div>
              </div>

              <div className="about-store-actions" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="https://maps.google.com/?q=Wireless+Gate,+Mohakhali,+Dhaka"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold about-action-btn"
                  style={{
                    padding: "12px 22px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "0.92rem",
                  }}
                >
                  <span>Get Directions</span>
                  <ExternalLink size={16} />
                </a>

                <Link
                  to="/contact"
                  className="about-action-btn"
                  style={{
                    padding: "12px 22px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    borderRadius: "50px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Mail size={16} />
                  <span>Send a Message</span>
                </Link>
              </div>
            </div>

            {/* Contact Card & Quick Info */}
            <div
              className="about-contact-card"
              style={{
                backgroundColor: "#0e1a2b",
                borderRadius: "14px",
                padding: "32px 26px",
                color: "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                boxShadow: "0 15px 35px rgba(15, 27, 43, 0.2)",
                boxSizing: "border-box",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  color: "#f3dc8d",
                  marginBottom: "18px",
                }}
              >
                Contact Us
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Phone size={18} style={{ color: "#d4af37", marginTop: "3px", flexShrink: 0 }} />
                  <div style={{ minWidth: 0, overflow: "hidden" }}>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Phone Hotline</div>
                    <a href={`tel:${storeSettings.phone}`} style={{ color: "#ffffff", textDecoration: "none", fontWeight: 700, wordBreak: "break-all" }}>
                      {storeSettings.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Mail size={18} style={{ color: "#d4af37", marginTop: "3px", flexShrink: 0 }} />
                  <div style={{ minWidth: 0, overflow: "hidden" }}>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Email Support</div>
                    <a href={`mailto:${storeSettings.email}`} style={{ color: "#ffffff", textDecoration: "none", fontWeight: 700, wordBreak: "break-all" }}>
                      {storeSettings.email}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "16px" }}>
                <Link
                  to="/contact"
                  style={{
                    color: "#d4af37",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Send a Message Online</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
