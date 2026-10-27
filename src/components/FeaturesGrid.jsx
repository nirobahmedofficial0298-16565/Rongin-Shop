import React from "react";
import { Truck, Headset, ShieldCheck, Banknote } from "lucide-react";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: <Truck size={28} style={{ color: "#d4af37" }} />,
      title: "Fast Fast Delivery",
      desc: "Delivered right to your doorstep within 24-72 hours across all 64 districts.",
    },
    {
      icon: <Banknote size={28} style={{ color: "#d4af37" }} />,
      title: "Cash On Delivery (COD)",
      desc: "Pay safely with cash when you receive and inspect your parcel. No advance needed.",
    },
    {
      icon: <ShieldCheck size={28} style={{ color: "#d4af37" }} />,
      title: "100% Genuine Quality",
      desc: "Directly sourced luxury materials with strict quality check & 7-day replacement warranty.",
    },
    {
      icon: <Headset size={28} style={{ color: "#d4af37" }} />,
      title: "24/7 Dedicated Support",
      desc: "Instant customer service via WhatsApp and phone hotline for any query or order tracking.",
    },
  ];

  return (
    <section style={{ padding: "60px 0", backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <span className="section-subtitle">THE RonginROMISE</span>
          <h2 className="section-title">Why Choose Rongin Shop?</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="features-grid"
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "32px 24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(15, 27, 43, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.08rem",
                  color: "#0f1b2b",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .features-grid > div {
            padding: 16px 10px !important;
          }
          .features-grid h3 {
            font-size: 0.92rem !important;
          }
          .features-grid p {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
