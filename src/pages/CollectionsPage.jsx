import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { INITIAL_CATEGORIES } from "../data/initialData";
import { Sparkles, ArrowRight, Grid } from "lucide-react";

export const CollectionsPage = ({ products }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Collections & Categories | Rongin Shop";
  }, []);

  return (
    <div className="collections-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "24px" }}>
      {/* Header Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #09121d 0%, #0e1a2b 50%, #15243b 100%)",
          color: "#ffffff",
          padding: "60px 20px",
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
              marginBottom: "10px",
            }}
          >
            <Sparkles size={14} />
            <span>DISCOVER BY CATEGORY</span>
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
            Curated Collections
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1rem" }}>
            Explore our specialized categories designed for effortless shopping and gifting.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <div className="container" style={{ marginTop: "50px" }}>
        <div
          className="collections-page-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {INITIAL_CATEGORIES.map((cat) => {
            const productCount = products.filter((p) => p.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.id}`)}
                style={{
                  position: "relative",
                  height: "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="collection-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 36px rgba(15, 27, 43, 0.16)";
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(15, 23, 42, 0.08)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(9, 18, 29, 0.2) 0%, rgba(9, 18, 29, 0.85) 100%)",
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#f3dc8d",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {productCount > 0 ? `${productCount} Items Available` : cat.itemCount}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.6rem",
                        color: "#ffffff",
                        margin: 0,
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>

                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(212, 175, 55, 0.9)",
                      color: "#0f1b2b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s",
                    }}
                  >
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
