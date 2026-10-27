import React from "react";
import { ArrowUpRight } from "lucide-react";

export const CategoryGrid = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section id="categories" style={{ padding: "70px 0", backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <span className="section-subtitle">COLLECTIONS</span>
          <h2 className="section-title">Shop By Category</h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "var(--gold-gradient)",
              margin: "12px auto 0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* 10 Category Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
          }}
          className="category-grid"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(isSelected ? null : cat.id);
                  const el = document.getElementById("featured");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  position: "relative",
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                  height: "210px",
                  boxShadow: isSelected
                    ? "0 8px 25px rgba(212, 175, 55, 0.45)"
                    : "0 4px 15px rgba(15, 23, 42, 0.06)",
                  border: isSelected ? "2px solid #d4af37" : "1px solid rgba(226, 232, 240, 0.8)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  backgroundColor: "#0f1b2b",
                }}
                className="category-card"
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Category Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    display: "block",
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(9, 18, 29, 0.88) 0%, rgba(9, 18, 29, 0.3) 60%, rgba(9, 18, 29, 0.1) 100%)",
                  }}
                />

                {/* Label & Details at Bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: isSelected ? "#f3dc8d" : "#ffffff",
                        marginBottom: "2px",
                      }}
                    >
                      {cat.name}
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>
                      {cat.itemCount}
                    </span>
                  </div>

                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: isSelected ? "#d4af37" : "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isSelected ? "#0f1b2b" : "#ffffff",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .category-card {
          transform: none !important;
        }
        .category-card img {
          transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
          will-change: transform;
        }
        .category-card:hover img {
          transform: scale(1.08) !important;
        }
        @media (max-width: 1024px) {
          .category-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .category-card {
            height: 135px !important;
          }
          .category-card h3 {
            font-size: 0.92rem !important;
          }
        }
      `}</style>
    </section>
  );
};
