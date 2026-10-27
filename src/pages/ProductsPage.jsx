import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { INITIAL_CATEGORIES } from "../data/initialData";
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react";

export const ProductsPage = ({ products, onAddToCart, onBuyNow, onSelectProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlCategory = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedGender, setSelectedGender] = useState("all");
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState("featured"); // featured | price-asc | price-desc | rating

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "All Products | Rongin Shop";
  }, []);

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSearch) setSearchQuery(urlSearch);
  }, [urlCategory, urlSearch]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }
        // Gender filter
        if (selectedGender !== "all" && p.gender && p.gender !== selectedGender && p.gender !== "unisex") {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchCat = p.category?.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
        return 0; // featured / default
      });
  }, [products, selectedCategory, selectedGender, searchQuery, sortBy]);

  return (
    <div className="products-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "24px" }}>
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
            <span>RONGIN COMPLETE COLLECTION</span>
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
            All Products & Accessories
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1rem" }}>
            Explore our handcrafted luxury items, watches, eyewear, bags and gift sets with Cash on Delivery nationwide.
          </p>
        </div>
      </section>

      {/* Main Filter & Products Area */}
      <div className="container" style={{ marginTop: "40px" }}>
        {/* Controls Bar: Search, Category Pills, Gender & Sort */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
            marginBottom: "32px",
          }}
        >
          {/* Top row: Search and Sort */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", flex: "1 1 300px", maxWidth: "450px" }}>
              <input
                type="text"
                placeholder="Search products by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 16px 11px 40px",
                  borderRadius: "30px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <Search size={18} style={{ position: "absolute", left: "14px", top: "12px", color: "#94a3b8" }} />
            </div>

            {/* Sorting & Gender */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              {/* Gender */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Gender:</span>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.85rem",
                    backgroundColor: "#ffffff",
                    outline: "none",
                  }}
                >
                  <option value="all">All</option>
                  <option value="men">Men's</option>
                  <option value="women">Women's</option>
                </select>
              </div>

              {/* Sort By */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.85rem",
                    backgroundColor: "#ffffff",
                    outline: "none",
                  }}
                >
                  <option value="featured">Featured / Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "6px",
              scrollbarWidth: "none",
            }}
          >
            <button
              onClick={() => handleCategoryChange("all")}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: selectedCategory === "all" ? "1px solid #0f1b2b" : "1px solid #e2e8f0",
                backgroundColor: selectedCategory === "all" ? "#0f1b2b" : "#f8fafc",
                color: selectedCategory === "all" ? "#ffffff" : "#475569",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              All Items ({products.length})
            </button>

            {INITIAL_CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "20px",
                    border: isSelected ? "1px solid #d4af37" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#0f1b2b" : "#f8fafc",
                    color: isSelected ? "#f3dc8d" : "#475569",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid Results Count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "0.95rem", color: "#64748b" }}>
            Showing <strong style={{ color: "#0f172a" }}>{filteredProducts.length}</strong> products
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className="products-catalog-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onSelectProduct={(p) => {
                  navigate(`/product/${p.id}`);
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "60px 20px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "14px" }}>🔍</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", color: "#0f1b2b", marginBottom: "8px" }}>
              No Products Found
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "20px" }}>
              We could not find any products matching your filters. Try resetting your search or category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedGender("all");
                setSearchQuery("");
                setSearchParams({});
              }}
              className="btn-gold"
              style={{ padding: "10px 24px" }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
