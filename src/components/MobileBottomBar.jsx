import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid, ShoppingBag, MessageCircle, ShieldCheck } from "lucide-react";

export const MobileBottomBar = ({
  cartCount,
  onOpenCart,
  onOpenAdmin,
  whatsappNumber,
}) => {
  const location = useLocation();
  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "8801712345678";

  return (
    <div
      className="mobile-bottom-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        borderTop: "1.5px solid rgba(212, 175, 55, 0.4)",
        boxShadow: "0 -4px 20px rgba(15, 23, 42, 0.12)",
        zIndex: 999,
        display: "none", // Visible only on screens <= 768px via CSS media query
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 10px 12px 10px",
      }}
    >
      {/* 1. Home */}
      <Link
        to="/"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: location.pathname === "/" ? "#d4af37" : "#475569",
          gap: "3px",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      {/* 2. Collections */}
      <Link
        to="/collections"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: location.pathname === "/collections" ? "#d4af37" : "#475569",
          gap: "3px",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        <Grid size={20} />
        <span>Collections</span>
      </Link>

      {/* 3. Cart with badge */}
      <Link
        to="/cart"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: location.pathname === "/cart" ? "#d4af37" : "#475569",
          gap: "3px",
          fontSize: "0.7rem",
          fontWeight: 600,
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-8px",
                backgroundColor: "#d4af37",
                color: "#0f172a",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                fontWeight: 800,
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </Link>

      {/* 4. WhatsApp Help */}
      <a
        href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent("Assalamu Alaikum! I would like to inquire about a product on Rongin Shop.")}`}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: "#25D366",
          gap: "3px",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>

      {/* 5. Admin */}
      <Link
        to="/admin"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: location.pathname === "/admin" ? "#d4af37" : "#475569",
          gap: "3px",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        <ShieldCheck size={20} />
        <span>Admin</span>
      </Link>
    </div>
  );
};
