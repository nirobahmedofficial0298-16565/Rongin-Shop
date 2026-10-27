import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  ShieldCheck,
  Menu,
  X,
  Phone,
  User,
  Heart,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { INITIAL_CATEGORIES } from "../data/initialData";

export const Header = ({
  cartCount,
  onOpenCart,
  onOpenAdmin,
  activeCategory,
  onSelectCategory,
  storeSettings,
  searchTerm,
  setSearchTerm,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const megaMenuRef = useRef(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4 Columns for the Mega Menu matching the screenshot exactly
  const megaMenuColumns = [
    [
      INITIAL_CATEGORIES.find((c) => c.id === "sunglasses"),
      INITIAL_CATEGORIES.find((c) => c.id === "bags"),
      INITIAL_CATEGORIES.find((c) => c.id === "toys"),
    ].filter(Boolean),
    [
      INITIAL_CATEGORIES.find((c) => c.id === "eyewear"),
      INITIAL_CATEGORIES.find((c) => c.id === "wallets"),
      INITIAL_CATEGORIES.find((c) => c.id === "room-decor"),
    ].filter(Boolean),
    [
      INITIAL_CATEGORIES.find((c) => c.id === "watches"),
      INITIAL_CATEGORIES.find((c) => c.id === "jewelry"),
    ].filter(Boolean),
    [
      INITIAL_CATEGORIES.find((c) => c.id === "cosmetics"),
      INITIAL_CATEGORIES.find((c) => c.id === "gifts"),
    ].filter(Boolean),
  ];

  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    navigate(`/products?category=${catId}`);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Collections", path: "/collections" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <header
      className="header-wrapper"
      ref={megaMenuRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 500,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Top Announcement Bar */}
      <div
        className="header-top-announcement"
        style={{
          background: "linear-gradient(90deg, #09121d 0%, #15243b 50%, #09121d 100%)",
          color: "#ffffff",
          padding: "7px 16px",
          fontSize: "0.82rem",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div className="announcement-left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#d4af37", fontWeight: 700 }}>★ RONGIN SHOP</span>
            <span style={{ color: "#cbd5e1" }}>
              🚚 Free Delivery Over ৳{storeSettings.freeDeliveryThreshold} | 💵 Cash on Delivery
            </span>
          </div>
          <div className="announcement-right" style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.8rem" }}>
            <a
              href={`tel:${storeSettings.phone}`}
              style={{
                color: "#f1f5f9",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Phone size={13} style={{ color: "#d4af37" }} />
              <span>{storeSettings.phone}</span>
            </a>
            <span style={{ color: "#64748b" }}>|</span>
            <button
              onClick={onOpenAdmin}
              style={{
                background: "rgba(212, 175, 55, 0.15)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                color: "#f3dc8d",
                padding: "2px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d4af37";
                e.currentTarget.style.color = "#09121d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                e.currentTarget.style.color = "#f3dc8d";
              }}
            >
              <ShieldCheck size={13} />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          borderBottom: "1px solid #eef2f6",
          boxShadow: "0 2px 15px rgba(15, 23, 42, 0.04)",
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          {/* Logo: RONGIN SHOP */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #fce588 0%, #d4af37 60%, #997312 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #ffffff",
                boxShadow: "0 3px 12px rgba(212, 175, 55, 0.35)",
                color: "#08101a",
                fontWeight: 900,
                fontSize: "1.3rem",
                fontFamily: "var(--font-heading)",
              }}
            >
              R
            </div>
            <div className="logo-container">
              <div
                className="logo-title"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.55rem",
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                  color: "#d4af37",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Rongin</span>
              </div>
              <div
                className="logo-subtitle"
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "1px",
                  color: "#0f172a",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Shop
              </div>
              <div className="logo-slogan" style={{ fontSize: "0.58rem", color: "#64748b", letterSpacing: "0.5px" }}>
                Wireless Gate, Mohakhali • Everything You Love.
              </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: location.pathname === "/" ? "#d4af37" : "#334155",
                fontWeight: 600,
                fontSize: "0.93rem",
                borderBottom: location.pathname === "/" ? "2px solid #d4af37" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              Home
            </Link>

            {/* Categories with Mega Menu trigger */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setMegaMenuOpen(true)}
            >
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: megaMenuOpen || activeCategory ? "#d4af37" : "#334155",
                  fontWeight: 600,
                  fontSize: "0.93rem",
                  cursor: "pointer",
                  paddingBottom: "4px",
                  borderBottom: megaMenuOpen || activeCategory ? "2px solid #d4af37" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <span>Categories</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: megaMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
            </div>

            <Link
              to="/products"
              style={{
                textDecoration: "none",
                color: location.pathname === "/products" ? "#d4af37" : "#334155",
                fontWeight: 600,
                fontSize: "0.93rem",
                borderBottom: location.pathname === "/products" ? "2px solid #d4af37" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              Products
            </Link>

            <Link
              to="/collections"
              style={{
                textDecoration: "none",
                color: location.pathname === "/collections" ? "#d4af37" : "#334155",
                fontWeight: 600,
                fontSize: "0.93rem",
                borderBottom: location.pathname === "/collections" ? "2px solid #d4af37" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              Collections
            </Link>

            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: location.pathname === "/about" ? "#d4af37" : "#334155",
                fontWeight: 600,
                fontSize: "0.93rem",
                borderBottom: location.pathname === "/about" ? "2px solid #d4af37" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                color: location.pathname === "/contact" ? "#d4af37" : "#334155",
                fontWeight: 600,
                fontSize: "0.93rem",
                borderBottom: location.pathname === "/contact" ? "2px solid #d4af37" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Header Icons (Search, User, Wishlist, Cart) */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            {/* Search Icon / Input */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "7px 12px 7px 32px",
                  borderRadius: "20px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#f8fafc",
                  fontSize: "0.82rem",
                  width: searchOpen || searchTerm ? "160px" : "36px",
                  cursor: searchOpen || searchTerm ? "text" : "pointer",
                  outline: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: searchOpen || searchTerm ? 1 : 0,
                  position: "absolute",
                  right: 0,
                  zIndex: 2,
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => {
                  if (!searchTerm) setSearchOpen(false);
                }}
              />
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#1e293b",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  position: "relative",
                }}
                title="Search Products"
              >
                <Search size={20} />
              </button>
            </div>

            {/* User Profile / Admin Icon */}
            <button
              onClick={onOpenAdmin}
              className="desktop-icon"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#1e293b",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1e293b")}
              title="Admin & Account"
            >
              <User size={20} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                setWishlistCount((c) => (c === 0 ? 1 : 0));
              }}
              className="desktop-icon"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: wishlistCount > 0 ? "#ef4444" : "#1e293b",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "color 0.2s",
              }}
              title="Wishlist"
            >
              <Heart size={20} fill={wishlistCount > 0 ? "#ef4444" : "none"} />
            </button>

            {/* Cart Icon with Counter */}
            <button
              onClick={onOpenCart}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#1e293b",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              title="Shopping Cart"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-6px",
                    background: "#d4af37",
                    color: "#0f172a",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "none",
              }}
            >
              {mobileMenuOpen ? <X size={24} color="#0f1b2b" /> : <Menu size={24} color="#0f1b2b" />}
            </button>
          </div>
        </div>

        {/* ================= MEGA MENU DROPDOWN ================= */}
        {megaMenuOpen && (
          <div
            className="mega-menu-dropdown"
            onMouseLeave={() => setMegaMenuOpen(false)}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#ffffff",
              borderTop: "1px solid #eef2f6",
              borderBottom: "2px solid #d4af37",
              boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12)",
              zIndex: 600,
              padding: "36px 0 42px 0",
            }}
          >
            <div className="container">
              {/* 4 Column Category Grid exactly matching user's screenshot */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  columnGap: "40px",
                  rowGap: "24px",
                }}
                className="mega-menu-grid"
              >
                {megaMenuColumns.map((col, colIdx) => (
                  <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                    {col.map((item) => {
                      const isSelected = activeCategory === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleCategoryClick(item.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            cursor: "pointer",
                            padding: "8px 12px",
                            borderRadius: "10px",
                            transition: "all 0.22s ease",
                            backgroundColor: isSelected ? "rgba(212, 175, 55, 0.12)" : "transparent",
                          }}
                          className="mega-item-row"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                            e.currentTarget.style.transform = "translateX(5px)";
                            const label = e.currentTarget.querySelector(".mega-label");
                            if (label) label.style.color = "#d4af37";
                            const img = e.currentTarget.querySelector("img");
                            if (img) img.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isSelected
                              ? "rgba(212, 175, 55, 0.12)"
                              : "transparent";
                            e.currentTarget.style.transform = "translateX(0)";
                            const label = e.currentTarget.querySelector(".mega-label");
                            if (label) label.style.color = isSelected ? "#d4af37" : "#0f172a";
                            const img = e.currentTarget.querySelector("img");
                            if (img) img.style.transform = "scale(1)";
                          }}
                        >
                          {/* Round / Soft Curved Category Thumbnail */}
                          <div
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "14px",
                              overflow: "hidden",
                              flexShrink: 0,
                              backgroundColor: "#f1f5f9",
                              boxShadow: "0 3px 10px rgba(15, 23, 42, 0.08)",
                              border: isSelected ? "2px solid #d4af37" : "1px solid #e2e8f0",
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>

                          {/* Category Name */}
                          <div>
                            <span
                              className="mega-label"
                              style={{
                                fontFamily: "inherit",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: isSelected ? "#071A33" : "#1e293b",
                                display: "block",
                                transition: "color 0.2s",
                              }}
                            >
                              {item.name}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                              {item.itemCount || "Explore Collection"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid #eef2f6",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: location.pathname === link.path ? "#d4af37" : "#1e293b",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#1e293b",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "8px 0",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Shopping Cart</span>
              <span
                style={{
                  backgroundColor: "#d4af37",
                  color: "#0f1b2b",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  padding: "2px 8px",
                  borderRadius: "10px",
                }}
              >
                {cartCount}
              </span>
            </Link>

            <div style={{ marginTop: "10px" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#d4af37", marginBottom: "8px" }}>
                CATEGORIES
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {INITIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{ width: "24px", height: "24px", borderRadius: "4px", objectFit: "cover" }}
                    />
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold"
              style={{ width: "100%", marginTop: "12px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <ShieldCheck size={16} />
              <span>Admin Order Dashboard</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Media query helper styles */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .mega-menu-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .header-top-announcement {
            display: none !important;
          }
          .announcement-right {
            display: none !important;
          }
          .announcement-left {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            font-size: 0.74rem !important;
          }
          .desktop-icon {
            display: none !important;
          }
          .logo-slogan {
            display: none !important;
          }
          .logo-title {
            font-size: 1.25rem !important;
          }
          .logo-subtitle {
            font-size: 0.62rem !important;
          }
        }
      `}</style>
    </header>
  );
};
