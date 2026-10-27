import React, { useState } from "react";
import { ProductCard } from "./ProductCard";

export const TrendingSection = ({ products, onAddToCart, onBuyNow, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "men", label: "Men's Collection" },
    { id: "women", label: "Women's Collection" },
    { id: "watches", label: "Watches" },
    { id: "leather", label: "Leather & Wallets" },
  ];

  const filtered = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "men") return p.gender === "men";
    if (activeTab === "women") return p.gender === "women";
    if (activeTab === "watches") return p.category === "watches";
    if (activeTab === "leather") return p.category === "wallets" || p.category === "belts";
    return true;
  });

  return (
    <section id="trending" style={{ padding: "70px 0", backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <span className="section-subtitle">POPULAR PICKS</span>
          <h2 className="section-title">Trending Collection</h2>
          <div
            style={{
              width: "50px",
              height: "3px",
              background: "var(--gold-gradient)",
              margin: "10px auto 0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "30px",
                  border: isActive ? "1.5px solid #d4af37" : "1px solid #e2e8f0",
                  backgroundColor: isActive ? "#071A33" : "#f8fafc",
                  color: isActive ? "#d4af37" : "#475569",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow: isActive ? "0 4px 15px rgba(7, 26, 51, 0.2)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="trending-grid"
        >
          {filtered.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .trending-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .trending-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};
