import React from "react";
import { MapPin, Sparkles, Clock, CheckCircle } from "lucide-react";

export const BrandStory = () => {
  return (
    <section id="about" style={{ padding: "80px 0", backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
            alignItems: "center",
          }}
          className="brand-story-grid"
        >
          {/* Showroom Image */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
              border: "1px solid #e2e8f0",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
              alt="Rongin Showroom"
              style={{
                width: "100%",
                height: "440px",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Overlay badge */}
            <div
              className="brand-story-overlay-badge"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                backgroundColor: "rgba(15, 27, 43, 0.9)",
                backdropFilter: "blur(10px)",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#d4af37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0f1b2b",
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>Wireless Gate Flagship Experience</div>
                <div style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>Mohakhali, Dhaka, Bangladesh</div>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div>
            <span className="section-subtitle">OUR HERITAGE</span>
            <h2
              className="section-title"
              style={{ fontSize: "2.6rem", lineHeight: 1.2, marginBottom: "20px" }}
            >
              More Than Just an Online Store.
            </h2>

            <p
              style={{
                color: "#475569",
                fontSize: "1.02rem",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              At <strong>Rongin Shop</strong>, we believe luxury should be accessible, dependable, and dignified. Every item in our catalog undergoes rigorous inspection for material purity, finishing durability, and aesthetic elegance.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span style={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 600 }}>
                  Curated premium materials with zero cheap compromises
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span style={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 600 }}>
                  Transparent Cash on Delivery: See product in hand before paying
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle size={18} style={{ color: "#d4af37", flexShrink: 0 }} />
                <span style={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: 600 }}>
                  Dedicated after-sales support & instant exchange policy
                </span>
              </div>
            </div>

            <a href="#featured" className="btn-navy" style={{ padding: "13px 32px" }}>
              <span>Discover Our Collection</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .brand-story-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .brand-story-grid img {
            height: 230px !important;
          }
          .brand-story-overlay-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
