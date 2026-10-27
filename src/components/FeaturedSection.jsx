import React from "react";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";

export const FeaturedSection = ({
  products,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  selectedCategory,
  onClearCategory,
}) => {
  // Filter products if a category is selected
  const displayedProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <section id="featured" style={{ padding: "70px 0", backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span className="section-subtitle">HANDPICKED LUXURY</span>
            <h2 className="section-title" style={{ marginBottom: "6px" }}>
              {selectedCategory ? `Category: ${selectedCategory.toUpperCase()}` : "Featured Products"}
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
              Premium craftsmanship, genuine materials, and unbeatable elegance.
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={onClearCategory}
              style={{
                background: "#071A33",
                color: "#ffffff",
                border: "none",
                borderRadius: "20px",
                padding: "8px 18px",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ✕ Clear Filter (Show All)
            </button>
          )}
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px dashed #cbd5e1",
            }}
          >
            <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
              No products found in this category.
            </p>
            <button
              onClick={onClearCategory}
              className="btn-gold"
              style={{ marginTop: "16px" }}
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="featured-grid"
          >
            {displayedProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <a
            href="#trending"
            className="btn-navy"
            style={{ padding: "13px 36px", fontSize: "0.95rem" }}
          >
            <span>Explore All Trending Items</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};
