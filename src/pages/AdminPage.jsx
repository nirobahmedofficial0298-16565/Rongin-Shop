import React, { useState, useEffect } from "react";
import { AdminDashboard } from "../components/AdminDashboard";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Download, Monitor } from "lucide-react";

export const AdminPage = ({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onDeleteCancelledOrders,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  storeSettings,
  onUpdateSettings,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    document.title = "Order Management Dashboard | Rongin Shop";

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      alert("টাস্কবারে পিন করতে: Chrome ব্রাউজারের উপরে অ্যাড্রেস বারের ডানপাশে থাকা 'Install App' (➕) আইকনে ক্লিক করুন অথবা থ্রি-ডট মেনু (⋮) ➔ 'Cast, save and share' ➔ 'Install page as app' / 'Create Shortcut' দিয়ে টাস্কবারে পিন করুন।");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="admin-page-container" style={{ minHeight: "100vh", backgroundColor: "#09121d" }}>
      {/* Top Quick Bar */}
      <div
        style={{
          backgroundColor: "#08101a",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
          padding: "10px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#cbd5e1",
          fontSize: "0.85rem",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#d4af37",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Storefront</span>
        </Link>

        {/* Taskbar Install Helper */}
        <button
          onClick={handleInstallPWA}
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            color: "#f3dc8d",
            padding: "5px 14px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Monitor size={14} />
          <span>Pin Dashboard to Taskbar</span>
        </button>
      </div>

      {/* Render Full-Page Admin Dashboard */}
      <AdminDashboard
        isOpen={true}
        onClose={() => {
          window.location.href = "/";
        }}
        orders={orders}
        onUpdateOrderStatus={onUpdateOrderStatus}
        onDeleteOrder={onDeleteOrder}
        onDeleteCancelledOrders={onDeleteCancelledOrders}
        products={products}
        onAddProduct={onAddProduct}
        onUpdateProduct={onUpdateProduct}
        onDeleteProduct={onDeleteProduct}
        storeSettings={storeSettings}
        onUpdateSettings={onUpdateSettings}
      />
    </div>
  );
};
