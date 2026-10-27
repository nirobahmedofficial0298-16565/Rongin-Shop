import React from "react";
import { ArrowRight, Tag } from "lucide-react";

export const PromoBanner = ({ onShopNow }) => {
  return (
    <section style={{ padding: "30px 0 60px 0", backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div
          style={{
            background: "linear-gradient(135deg, #09121d 0%, #15243b 60%, #09121d 100%)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(15, 27, 43, 0.2)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            alignItems: "center",
          }}
          className="promo-grid"
        >
          {/* Left Text */}
          <div style={{ padding: "50px 45px" }} className="promo-content">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#d4af37",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              <Tag size={15} />
              <span>SPECIAL FESTIVE OFFER</span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2.4rem",
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
              className="promo-heading"
            >
              Upgrade Your Everyday Style.
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "460px",
              }}
            >
              Get flat 20% discount on combo orders with zero advance payment. Check before paying with nationwide Cash on Delivery.
            </p>

            <a
              href="#featured"
              onClick={onShopNow}
              className="btn-gold"
              style={{ padding: "13px 32px" }}
            >
              <span>Shop The Offer</span>
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Right Image */}
          <div style={{ height: "100%", minHeight: "340px", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Gift Set"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Subtle Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(9, 18, 29, 0.9) 0%, rgba(9, 18, 29, 0) 50%)",
              }}
              className="promo-image-gradient"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .promo-grid {
            grid-template-columns: 1fr !important;
          }
          .promo-content {
            padding: 35px 24px !important;
          }
          .promo-heading {
            font-size: 1.8rem !important;
          }
          .promo-image-gradient {
            background: linear-gradient(to top, rgba(9, 18, 29, 0.8) 0%, rgba(9, 18, 29, 0) 50%) !important;
          }
        }
      `}</style>
    </section>
  );
};
