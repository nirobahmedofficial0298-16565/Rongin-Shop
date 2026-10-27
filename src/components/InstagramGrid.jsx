import React from "react";

const InstagramIcon = ({ size = 24, color = "#d4af37" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const InstagramGrid = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
      tag: "Aviator Gold",
    },
    {
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
      tag: "Royal Chronograph",
    },
    {
      url: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80",
      tag: "Top-grain Leather",
    },
    {
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
      tag: "Designer Bags",
    },
    {
      url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80",
      tag: "Midnight Oud",
    },
    {
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
      tag: "Artisanal Jewelry",
    },
  ];

  const INSTAGRAM_URL = "https://www.instagram.com/nirob_ahmed_0298/";

  return (
    <section className="insta-section" style={{ padding: "36px 0", backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span className="section-subtitle">GALLERY</span>
          <h2 className="section-title" style={{ marginBottom: "6px" }}>Follow Us On Instagram</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#d4af37",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>@nirob_ahmed_0298 • Follow Us on Instagram</span>
            <span>↗</span>
          </a>
        </div>

        {/* 6 Image Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "12px",
          }}
          className="insta-grid"
        >
          {images.map((item, index) => (
            <a
              key={index}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                position: "relative",
                height: "180px",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                display: "block",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector(".insta-overlay");
                if (overlay) overlay.style.opacity = "1";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector(".insta-overlay");
                if (overlay) overlay.style.opacity = "0";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={item.url}
                alt={item.tag}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  display: "block",
                }}
              />

              {/* Hover Overlay */}
              <div
                className="insta-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(15, 27, 43, 0.75)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  opacity: 0,
                  transition: "opacity 0.25s ease",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: "6px" }}>
                  <InstagramIcon size={26} color="#d4af37" />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{item.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .insta-section {
            padding: 24px 0 !important;
          }
          .insta-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          .insta-grid a {
            height: 140px !important;
          }
        }
        @media (max-width: 500px) {
          .insta-section {
            padding: 18px 0 !important;
          }
          .insta-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .insta-grid a {
            height: 130px !important;
          }
        }
      `}</style>
    </section>
  );
};
