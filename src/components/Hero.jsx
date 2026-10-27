import React from "react";
import { ArrowRight, Sparkles, Shield, Truck, CreditCard } from "lucide-react";

export const Hero = ({ onShopNow }) => {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        paddingTop: "60px",
        paddingBottom: "70px",
        overflow: "hidden",
        borderBottom: "1px solid #edf2f7",
      }}
    >
      {/* Decorative ambient gold glow in background */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Text & CTAs */}
          <div className="hero-text-col">
            {/* Tag Badge */}
            <div
              className="hero-badge-wrap"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.12)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                padding: "6px 16px",
                borderRadius: "30px",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={15} style={{ color: "#d4af37" }} />
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "#997312",
                  textTransform: "uppercase",
                }}
              >
                Rongin Signature & Lifestyle
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3.4rem",
                fontWeight: 800,
                color: "#0f1b2b",
                lineHeight: 1.15,
                marginBottom: "20px",
                letterSpacing: "-0.5px",
              }}
              className="hero-heading"
            >
              Everything You Love,{" "}
              <span style={{ color: "#d4af37", display: "inline-block" }}>
                All in One Place.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle"
              style={{
                fontSize: "1.08rem",
                color: "#475569",
                marginBottom: "32px",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              Experience handpicked royal watches, handcrafted Italian leather wallets, polarized designer sunglasses, and premium fragrance sets designed for unmatched distinction.
            </p>

            {/* CTAs */}
            <div
              className="hero-buttons"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "36px",
              }}
            >
              <a
                href="#featured"
                className="btn-gold"
                onClick={onShopNow}
                style={{ fontSize: "1rem", padding: "14px 34px" }}
              >
                <span>Shop Now</span>
                <ArrowRight size={18} />
              </a>
              <a
                href="#categories"
                className="btn-outline-gold"
                style={{ fontSize: "1rem", padding: "13px 30px" }}
              >
                <span>Explore Collections</span>
              </a>
            </div>

            {/* Mini Trust Highlights */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                paddingTop: "24px",
                borderTop: "1px solid #e2e8f0",
              }}
              className="hero-trust"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                  Fast Delivery
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                  Cash On Delivery
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Shield size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                  100% Authentic
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="hero-visual-col" style={{ position: "relative" }}>
            {/* Main Showcase Image Container */}
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(15, 27, 43, 0.16)",
                border: "2px solid rgba(212, 175, 55, 0.4)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85"
                alt="Rongin Luxury Collection"
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(15, 27, 43, 0.75) 0%, rgba(15, 27, 43, 0) 50%)",
                  pointerEvents: "none",
                }}
              />

              {/* Floating Badge Top Right */}
              <div
                className="hero-image-badge"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  backgroundColor: "#d4af37",
                  color: "#0f1b2b",
                  padding: "8px 18px",
                  borderRadius: "30px",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "1px",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>UP TO 35% OFF</span>
              </div>

              {/* Bottom Caption Inside Image */}
              <div
                className="hero-image-caption"
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  right: "24px",
                  color: "#ffffff",
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "#f3dc8d", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Curated Collection
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", margin: "4px 0 8px 0" }}>
                  Signature Accessories & Gift Boxes
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                  Order with zero advance payment • Check product on delivery
                </p>
              </div>
            </div>

            {/* Secondary Floating Card */}
            <div
              style={{
                position: "absolute",
                bottom: "-25px",
                left: "-25px",
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                boxShadow: "0 15px 35px rgba(15, 27, 43, 0.12)",
                border: "1px solid #e2e8f0",
                maxWidth: "280px",
              }}
              className="hero-floating-card"
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=150&q=80"
                  alt="Royal Chronograph"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Top Pick of the Week</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1b2b" }}>Royal Chronograph</div>
                <div style={{ fontSize: "0.85rem", color: "#d4af37", fontWeight: 800 }}>৳3,850 BDT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero {
            padding-top: 14px !important;
            padding-bottom: 24px !important;
          }
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 18px !important;
          }
          .hero-visual-col {
            order: 1 !important;
            width: 100% !important;
          }
          .hero-text-col {
            order: 2 !important;
            width: 100% !important;
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-badge-wrap {
            margin: 0 auto 14px auto !important;
          }
          .hero-heading {
            font-size: 1.85rem !important;
            line-height: 1.2 !important;
            margin-bottom: 12px !important;
            text-align: center !important;
          }
          .hero-subtitle {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 22px !important;
          }
          .hero-buttons {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            max-width: 320px !important;
            gap: 10px !important;
            margin: 0 auto 24px auto !important;
          }
          .hero-buttons a {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
            padding: 12px 20px !important;
            font-size: 0.95rem !important;
          }
          .hero-visual-col img {
            height: 220px !important;
            border-radius: 14px !important;
          }
          /* Hide text and floating badge over image on mobile */
          .hero-image-caption,
          .hero-image-badge,
          .hero-floating-card {
            display: none !important;
          }
          .hero-trust {
            gap: 8px !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-trust span {
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </section>
  );
};
