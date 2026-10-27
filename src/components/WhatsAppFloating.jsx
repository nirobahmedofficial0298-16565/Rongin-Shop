import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppFloating = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "8801800000000";
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hello%20Rongin!%20I%20have%20an%20inquiry%20regarding%20products.`;

  return (
    <div
      className="whatsapp-floating-wrap"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 22px rgba(37, 211, 102, 0.45)",
          textDecoration: "none",
          transition: "transform 0.25s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={30} fill="#ffffff" color="#25D366" />
        {/* Active green ping indicator */}
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "2px solid #25D366",
          }}
        />
      </a>

      {/* Tooltip message */}
      {showTooltip && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "8px 12px",
            borderRadius: "8px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.8rem",
            color: "#0f172a",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
          className="animate-fade-in"
        >
          <span>💬 WhatsApp এ কথা বলুন বা সরাসরি অর্ডার করুন</span>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .whatsapp-floating-wrap {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
