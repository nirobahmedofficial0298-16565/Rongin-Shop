import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { INITIAL_TESTIMONIALS } from "../data/initialData";

export const Testimonials = ({ testimonials = INITIAL_TESTIMONIALS }) => {
  return (
    <section id="reviews" style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2 className="section-title">What Our Patrons Say</h2>
          <div
            style={{
              width: "50px",
              height: "3px",
              background: "var(--gold-gradient)",
              margin: "12px auto 0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="testimonials-grid"
        >
          {testimonials.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: "16px",
                padding: "32px 28px",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.08)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              {/* Quote Icon */}
              <div style={{ color: "#d4af37", marginBottom: "16px" }}>
                <Quote size={28} />
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: "4px", color: "#f59e0b", marginBottom: "14px" }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" />
                ))}
              </div>

              {/* Review Text */}
              <p
                style={{
                  color: "#334155",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  flexGrow: 1,
                }}
              >
                "{review.comment}"
              </p>

              {/* Customer Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "16px",
                }}
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #d4af37",
                  }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1b2b" }}>
                      {review.name}
                    </span>
                    <CheckCircle2 size={14} style={{ color: "#10b981" }} title="Verified Buyer" />
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    {review.location} • {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
