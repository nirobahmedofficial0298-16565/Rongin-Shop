import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const SplitCollection = ({ onFilterGender }) => {
  return (
    <div style={{ backgroundColor: "#ffffff", padding: "40px 0" }}>
      {/* Men's Collection Banner */}
      <section id="mens-collection" style={{ padding: "40px 0" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
            className="split-banner"
          >
            {/* Left Image */}
            <div style={{ height: "420px", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
                alt="Men's Luxury Accessories"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Right Content */}
            <div style={{ padding: "45px" }} className="split-content">
              <span
                style={{
                  color: "#d4af37",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                DISTINGUISHED GENTLEMEN
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.3rem",
                  color: "#0f1b2b",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                Men's Collection
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                Crafted for men of prestige. From genuine Italian leather wallets and precision timepieces to aviator sunglasses and automatic belts.
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "28px",
                }}
              >
                {["Leather Wallets", "Watches", "Belts", "Sunglasses", "Oud Perfumes"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        padding: "5px 14px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#334155",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <a
                href="#featured"
                onClick={() => onFilterGender("men")}
                className="btn-navy"
                style={{ padding: "12px 28px" }}
              >
                <span>Explore Men's Collection</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Women's Collection Banner */}
      <section id="womens-collection" style={{ padding: "40px 0" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
            className="split-banner"
          >
            {/* Left Content */}
            <div style={{ padding: "45px" }} className="split-content">
              <span
                style={{
                  color: "#d4af37",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                ROYAL GRACE & BEAUTY
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.3rem",
                  color: "#0f1b2b",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                Women's Collection
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                Celebrate elegance with our iconic designer chain shoulder bags, 24K gold-plated artisanal jewelry sets, and luxury festive gift hampers.
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "28px",
                }}
              >
                {["Designer Bags", "Gold Jewelry", "Gift Sets", "Perfumes", "Accessories"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        padding: "5px 14px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#334155",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <a
                href="#featured"
                onClick={() => onFilterGender("women")}
                className="btn-gold"
                style={{ padding: "12px 28px" }}
              >
                <span>Explore Women's Collection</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Right Image */}
            <div style={{ height: "420px", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                alt="Women's Luxury Collection"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .split-banner {
            grid-template-columns: 1fr !important;
          }
          .split-banner > div:first-child,
          .split-banner > div:last-child {
            height: 220px !important;
          }
          .split-content {
            padding: 24px 16px !important;
          }
          .split-content h2 {
            font-size: 1.65rem !important;
          }
        }
      `}</style>
    </div>
  );
};
