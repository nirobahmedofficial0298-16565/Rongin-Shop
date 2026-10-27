import React, { useEffect } from "react";
import { Hero } from "../components/Hero";
import { CategoryGrid } from "../components/CategoryGrid";
import { FeaturedSection } from "../components/FeaturedSection";
import { PromoBanner } from "../components/PromoBanner";
import { TrendingSection } from "../components/TrendingSection";
import { FeaturesGrid } from "../components/FeaturesGrid";
import { SplitCollection } from "../components/SplitCollection";
import { BrandStory } from "../components/BrandStory";
import { Testimonials } from "../components/Testimonials";
import { InstagramGrid } from "../components/InstagramGrid";

export const HomePage = ({
  products,
  categories,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onSelectCategory,
  activeCategory,
}) => {
  useEffect(() => {
    document.title = "Rongin Shop | Wireless Gate, Mohakhali, Dhaka";
  }, []);

  return (
    <div className="home-page">
      {/* 1. Hero Banner */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById("featured");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onShopNowClick={() => {
          const el = document.getElementById("categories");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Category Grid */}
      <CategoryGrid
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* 3. Featured Products */}
      <FeaturedSection
        products={products}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
        activeCategory={activeCategory}
      />

      {/* 4. Promotional Banner */}
      <PromoBanner
        onClaimOffer={() => {
          const el = document.getElementById("featured");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 5. Trending Section */}
      <TrendingSection
        products={products}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
      />

      {/* 6. Features Grid */}
      <FeaturesGrid />

      {/* 7. Split Collection (Men's & Women's) */}
      <SplitCollection
        products={products}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onSelectProduct={onSelectProduct}
      />

      {/* 8. Brand Story */}
      <BrandStory />

      {/* 9. Verified Customer Testimonials */}
      <Testimonials />

      {/* 10. Instagram Social Grid */}
      <InstagramGrid />
    </div>
  );
};
