import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Search,
  Download,
  Settings,
  Phone,
  MessageCircle,
  DollarSign,
  Lock,
  LogOut,
  X,
  ExternalLink,
  Save,
  Check,
  Database,
  Copy,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Bell,
  Eye,
  Printer,
  MapPin,
  User,
  FileText,
  Mail,
} from "lucide-react";
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
  syncAllProductsToDB,
  SUPABASE_SQL_SCHEMA,
} from "../services/supabase";
import {
  requestNotificationPermission,
  getNotificationPermission,
  playOrderChime,
} from "../services/notifications";
import { saveStoredSettings, saveSettingsAndSync, getStoredSettings } from "../services/storage";
import "./AdminDashboard.css";

export const AdminDashboard = ({
  isOpen,
  onClose,
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("Rongin_admin_auth") === "true";
  });
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [notificationPerm, setNotificationPerm] = useState(getNotificationPermission());

  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "products" | "settings"
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteProdId, setConfirmDeleteProdId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedSlip, setCopiedSlip] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSettingsStatus, setSaveSettingsStatus] = useState(null);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: "",
    category: "sunglasses",
    gender: "men",
    price: "",
    oldPrice: "",
    stock: "20",
    badge: "NEW",
    image: "",
    description: "",
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(storeSettings);
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);

  useEffect(() => {
    if (storeSettings) {
      setSettingsForm(storeSettings);
    }
  }, [storeSettings]);

  // Cloud Database (Supabase) state
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [dbUrlInput, setDbUrlInput] = useState(supabaseConfig.url || "");
  const [dbKeyInput, setDbKeyInput] = useState(supabaseConfig.anonKey || "");
  const [dbStatus, setDbStatus] = useState(null); // { checking: boolean, success?: boolean, message?: string }
  const [isSyncingProducts, setIsSyncingProducts] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  const [showSqlViewer, setShowSqlViewer] = useState(false);

  const handleTestDatabase = async (overrideUrl, overrideKey) => {
    setDbStatus({ checking: true, message: "Testing connection..." });
    const result = await testSupabaseConnection();
    setDbStatus({
      checking: false,
      success: result.success,
      message: result.message || result.error,
    });
  };

  const handleSaveDatabaseConfig = async (e) => {
    e.preventDefault();
    if (!dbUrlInput.trim() || !dbKeyInput.trim()) {
      setDbStatus({ checking: false, success: false, message: "অনুগ্রহ করে Supabase URL এবং Anon Key উভয়ই লিখুন।" });
      return;
    }
    saveSupabaseConfig(dbUrlInput, dbKeyInput);
    const updated = getSupabaseConfig();
    setSupabaseConfig(updated);
    setDbStatus({ checking: true, message: "ডেটাবেস চেক করা হচ্ছে..." });
    const result = await testSupabaseConnection();
    setDbStatus({
      checking: false,
      success: result.success,
      message: result.message || result.error,
    });
  };

  const handleDisconnectDatabase = () => {
    clearSupabaseConfig();
    setSupabaseConfig(getSupabaseConfig());
    setDbUrlInput("");
    setDbKeyInput("");
    setDbStatus({ checking: false, success: false, message: "ডেটাবেস সংযোগ বিচ্ছিন্ন করা হয়েছে। এখন লোকালস্টোরেজ মোড সক্রিয়।" });
  };

  const handleSyncAllProductsToCloud = async () => {
    if (!supabaseConfig.isConfigured) {
      alert("আগে Supabase URL এবং Key সেট করে কানেক্ট করুন!");
      return;
    }
    setIsSyncingProducts(true);
    setSyncStatusMsg("পণ্যসমূহ ক্লাউডে আপলোড করা হচ্ছে...");
    const success = await syncAllProductsToDB(products);
    setIsSyncingProducts(false);
    if (success) {
      setSyncStatusMsg(`✅ সফল! মোট ${products.length}টি পণ্য ক্লাউড ডেটাবেসে সিঙ্ক হয়েছে!`);
    } else {
      setSyncStatusMsg("❌ সিঙ্ক ব্যর্থ হয়েছে। অনুগ্রহ করে টেবিল তৈরি করা হয়েছে কিনা এবং RLS পলিসি চেক করুন।");
    }
    setTimeout(() => setSyncStatusMsg(""), 6000);
  };

  const handleCopySqlScript = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setIsCopiedSql(true);
    setTimeout(() => setIsCopiedSql(false), 3000);
  };

  if (!isOpen) return null;

  // PIN authentication check
  const handleLogin = (e) => {
    e.preventDefault();
    const stored = getStoredSettings();
    const currentPin = String(settingsForm?.adminPin || storeSettings?.adminPin || stored?.adminPin || "1234").trim();
    if (String(enteredPin).trim() === currentPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem("Rongin_admin_auth", "true");
      setPinError("");
      setEnteredPin("");
    } else {
      setPinError("ভুল সিকিউরিটি পিন! সঠিক পিন কোড দিন (Invalid Admin PIN)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("Rongin_admin_auth");
  };

  // Export orders to CSV
  const handleExportCSV = () => {
    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Address", "City", "Total BDT", "Status", "Items"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.date}"`,
      `"${o.customerName}"`,
      `"${o.phone}"`,
      `"${o.address}"`,
      `"${o.city}"`,
      o.totalAmount,
      o.status,
      `"${o.items?.map((i) => `${i.title} (x${i.quantity})`).join(", ")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rongin_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === "all" || o.status.toLowerCase() === orderFilter.toLowerCase();
    const query = orderSearch.toLowerCase();
    const matchesSearch =
      !orderSearch ||
      o.id.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.phone.includes(query);
    return matchesFilter && matchesSearch;
  });

  // Calculate metrics
  const totalRevenue = orders
    .filter((o) => o.status === "Delivered" || o.status === "Confirmed")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  // Open Product Add / Edit
  const handleOpenProductModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({
        title: prod.title,
        category: prod.category,
        gender: prod.gender || "men",
        price: prod.price.toString(),
        oldPrice: prod.oldPrice ? prod.oldPrice.toString() : "",
        stock: prod.stock ? prod.stock.toString() : "20",
        badge: prod.badge || "NEW",
        image: prod.image,
        description: prod.description || "",
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        title: "",
        category: "sunglasses",
        gender: "men",
        price: "",
        oldPrice: "",
        stock: "20",
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        description: "",
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const payload = {
      title: productForm.title,
      category: productForm.category,
      gender: productForm.gender,
      price: parseFloat(productForm.price) || 0,
      oldPrice: productForm.oldPrice ? parseFloat(productForm.oldPrice) : null,
      stock: parseInt(productForm.stock, 10) || 10,
      badge: productForm.badge,
      image: productForm.image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      description: productForm.description,
      rating: 5.0,
      reviewsCount: 12,
    };

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...payload });
    } else {
      onAddProduct({
        id: `p_${Date.now()}`,
        ...payload,
      });
    }
    setIsProductModalOpen(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSaveSettingsStatus(null);
    try {
      await saveSettingsAndSync(settingsForm);
      if (onUpdateSettings) {
        onUpdateSettings(settingsForm);
      }
      setSaveSettingsStatus({
        success: true,
        message: "✅ সেটিংস, জিমেইল ও সিকিউরিটি পিন সফলভাবে ক্লাউড ডেটাবেস (Supabase) এবং ওয়েবসাইটে সংরক্ষিত হয়েছে!",
      });
    } catch (err) {
      setSaveSettingsStatus({
        success: false,
        message: "⚠️ লোকাল মেমরিতে সেভ হয়েছে (ক্লাউড নোটিশ: " + (err.message || "সিঙ্ক পেন্ডিং") + ")",
      });
    } finally {
      setIsSavingSettings(false);
      setTimeout(() => setSaveSettingsStatus(null), 5000);
    }
  };

  return (
    <div className="admin-dashboard-overlay">
      <div className="admin-dashboard-modal">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#d4af37",
                color: "#0f1b2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "1rem",
                fontFamily: "var(--font-heading)",
                flexShrink: 0,
              }}
            >
              R
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 className="admin-topbar-title">
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rongin Admin</span>
                <span className="admin-badge-free">
                  Free Sync Active
                </span>
              </h3>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {isAuthenticated && (
              <>
                {/* Chrome Notification Permission Button */}
                <button
                  type="button"
                  onClick={async () => {
                    const res = await requestNotificationPermission();
                    setNotificationPerm(res);
                    playOrderChime();
                    if (res === "granted") {
                      alert("✅ Chrome Desktop Notification চালু হয়েছে! নতুন কোনো অর্ডার আসলে সাউন্ড ও নোটিফিকেশন আসবে।");
                    }
                  }}
                  title={notificationPerm === "granted" ? "Chrome notifications active" : "Enable Chrome order notifications"}
                  style={{
                    background: notificationPerm === "granted" ? "rgba(34, 197, 94, 0.2)" : "rgba(212, 175, 55, 0.15)",
                    border: `1px solid ${notificationPerm === "granted" ? "#22c55e" : "#d4af37"}`,
                    color: notificationPerm === "granted" ? "#4ade80" : "#f3dc8d",
                    padding: "6px 10px",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Bell size={14} />
                  <span className="hide-on-very-small">{notificationPerm === "granted" ? "Alerts: ON" : "Alerts"}</span>
                </button>

                <button
                  onClick={handleLogout}
                  title="Lock Dashboard"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    color: "#cbd5e1",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <LogOut size={14} />
                  <span>Lock</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              title="Close Admin / Back to Store"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "none",
                color: "#ffffff",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "380px",
                backgroundColor: "#ffffff",
                padding: "36px 30px",
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.1)",
                textAlign: "center",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  color: "#d4af37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 18px auto",
                }}
              >
                <Lock size={28} />
              </div>

              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", color: "#0f1b2b", marginBottom: "8px" }}>
                Admin Security Authentication
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "22px" }}>
                অর্ডার ও পণ্য ব্যবস্থাপনার জন্য আপনার গোপন সিকিউরিটি পিন দিন।
              </p>

              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Enter 4-digit PIN"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  maxLength={6}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    letterSpacing: "6px",
                    marginBottom: "14px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />

                {pinError && (
                  <div style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: "14px", fontWeight: 600 }}>
                    {pinError}
                  </div>
                )}

                <button type="submit" className="btn-gold" style={{ width: "100%", padding: "12px" }}>
                  Unlock Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
            {/* Top Metric Cards Slider */}
            <div className="admin-stats-slider">
              {/* Stat 1 */}
              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <span className="admin-stat-label">Total Orders</span>
                  <ShoppingBag size={18} style={{ color: "#3b82f6" }} />
                </div>
                <div className="admin-stat-number">{orders.length}</div>
              </div>

              {/* Stat 2 */}
              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <span className="admin-stat-label">Pending Confirmation</span>
                  <Clock size={18} style={{ color: "#f59e0b" }} />
                </div>
                <div className="admin-stat-number" style={{ color: "#d97706" }}>
                  {pendingCount}
                </div>
              </div>

              {/* Stat 3 */}
              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <span className="admin-stat-label">Delivered Orders</span>
                  <CheckCircle size={18} style={{ color: "#10b981" }} />
                </div>
                <div className="admin-stat-number" style={{ color: "#059669" }}>
                  {deliveredCount}
                </div>
              </div>

              {/* Stat 4 */}
              <div className="admin-stat-card">
                <div className="admin-stat-header">
                  <span className="admin-stat-label">Total Sales (COD)</span>
                  <DollarSign size={18} style={{ color: "#d4af37" }} />
                </div>
                <div className="admin-stat-number">
                  ৳{totalRevenue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Nav Tabs Horizontal Slider */}
            <div className="admin-nav-tabs-bar">
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`admin-tab-btn ${activeTab === "orders" ? "active" : ""}`}
              >
                <span>📦 Orders Management</span>
                <span className="admin-tab-count-badge">{orders.length}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("products")}
                className={`admin-tab-btn ${activeTab === "products" ? "active" : ""}`}
              >
                <span>🏷️ Products Inventory</span>
                <span className="admin-tab-count-badge">{products.length}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
              >
                <span>⚙️ Store Settings & Cloud Sync</span>
              </button>
            </div>

            {activeTab === "orders" && (
              <div className="admin-tab-content-orders">
                {/* Search & Action bar */}
                <div className="admin-orders-controls">
                  <div className="admin-orders-controls-top">
                    {/* Search */}
                    <div className="admin-search-wrapper">
                      <input
                        type="text"
                        placeholder="Search phone, name, or Order ID..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="admin-search-input"
                      />
                      <Search size={15} style={{ position: "absolute", left: "12px", top: "11px", color: "#94a3b8" }} />
                      {orderSearch && (
                        <button
                          onClick={() => setOrderSearch("")}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "8px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#94a3b8",
                            padding: "2px",
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                      {orders.some((o) => o.status.toLowerCase() === "cancelled") && (
                        <button
                          onClick={() => onDeleteCancelledOrders()}
                          style={{
                            backgroundColor: "#fee2e2",
                            color: "#b91c1c",
                            border: "1px solid #fecaca",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                          title="Delete all cancelled orders"
                        >
                          <Trash2 size={14} />
                          <span>Clear Cancelled ({orders.filter((o) => o.status.toLowerCase() === "cancelled").length})</span>
                        </button>
                      )}

                      {/* Export CSV */}
                      <button
                        onClick={handleExportCSV}
                        style={{
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Download size={15} />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills Slider */}
                  <div className="admin-filter-slider">
                    {["all", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((status) => {
                      const count =
                        status === "all"
                          ? orders.length
                          : orders.filter((o) => o.status.toLowerCase() === status.toLowerCase()).length;
                      return (
                        <button
                          key={status}
                          onClick={() => setOrderFilter(status)}
                          className={`admin-filter-pill ${orderFilter === status ? "active" : ""}`}
                        >
                          <span>{status.toUpperCase()}</span>
                          <span className="admin-pill-badge">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop View: Full Data Table */}
                <div className="admin-orders-desktop-table">
                  {filteredOrders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px 0", color: "#64748b" }}>
                      No orders found matching this filter.
                    </div>
                  ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#475569" }}>
                          <th style={{ padding: "12px 16px" }}>Order ID & Date</th>
                          <th style={{ padding: "12px 16px" }}>Customer Details</th>
                          <th style={{ padding: "12px 16px" }}>Delivery Address</th>
                          <th style={{ padding: "12px 16px" }}>Products</th>
                          <th style={{ padding: "12px 16px" }}>Total</th>
                          <th style={{ padding: "12px 16px" }}>Status</th>
                          <th style={{ padding: "12px 16px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((ord) => {
                          const statusColors = {
                            Pending: { bg: "#fef3c7", text: "#92400e" },
                            Confirmed: { bg: "#dbeafe", text: "#1e40af" },
                            Shipped: { bg: "#e0e7ff", text: "#3730a3" },
                            Delivered: { bg: "#d1fae5", text: "#065f46" },
                            Cancelled: { bg: "#fee2e2", text: "#991b1b" },
                          };
                          const col = statusColors[ord.status] || { bg: "#f1f5f9", text: "#475569" };

                          return (
                            <tr
                              key={ord.id}
                              onClick={() => setSelectedOrder(ord)}
                              style={{
                                borderBottom: "1px solid #f1f5f9",
                                cursor: "pointer",
                                transition: "background-color 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              title="Click to view full customer and order details"
                            >
                              {/* Order ID */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ fontWeight: 800, color: "#0f172a" }}>{ord.id}</div>
                                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{ord.date}</div>
                              </td>

                              {/* Customer */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ fontWeight: 700, color: "#0f172a" }}>{ord.customerName}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                                  <a
                                    href={`tel:${ord.phone}`}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      color: "#2563eb",
                                      textDecoration: "none",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "3px",
                                    }}
                                  >
                                    <Phone size={11} /> {ord.phone}
                                  </a>
                                  <a
                                    href={`https://wa.me/88${ord.phone.replace(/[^0-9]/g, "")}`}
                                    onClick={(e) => e.stopPropagation()}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="WhatsApp Chat"
                                    style={{ color: "#25D366" }}
                                  >
                                    <MessageCircle size={14} />
                                  </a>
                                </div>
                              </td>

                              {/* Address */}
                              <td style={{ padding: "14px 16px", maxWidth: "200px" }}>
                                <div style={{ fontSize: "0.82rem", color: "#334155", lineHeight: 1.3 }}>{ord.address}</div>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    backgroundColor: "#f1f5f9",
                                    color: "#64748b",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    display: "inline-block",
                                    marginTop: "4px",
                                  }}
                                >
                                  {ord.city}
                                </span>
                              </td>

                              {/* Products */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                  {ord.items?.map((it, idx) => (
                                    <div key={idx} style={{ fontSize: "0.8rem", color: "#0f172a" }}>
                                      • {it.title} <strong style={{ color: "#d4af37" }}>×{it.quantity}</strong>
                                    </div>
                                  ))}
                                </div>
                              </td>

                              {/* Total */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.95rem" }}>
                                  ৳{ord.totalAmount?.toLocaleString()}
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 600 }}>COD</div>
                              </td>

                              {/* Status Dropdown */}
                              <td style={{ padding: "14px 16px" }}>
                                <select
                                  value={ord.status}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                                  style={{
                                    backgroundColor: col.bg,
                                    color: col.text,
                                    fontWeight: 700,
                                    fontSize: "0.78rem",
                                    border: `1px solid ${col.text}`,
                                    borderRadius: "6px",
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    outline: "none",
                                  }}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedOrder(ord);
                                    }}
                                    style={{
                                      backgroundColor: "#0f1b2b",
                                      color: "#ffffff",
                                      border: "none",
                                      padding: "5px 10px",
                                      borderRadius: "6px",
                                      fontSize: "0.76rem",
                                      fontWeight: 600,
                                      cursor: "pointer",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      whiteSpace: "nowrap",
                                    }}
                                    title="View full order details & print slip"
                                  >
                                    <Eye size={12} />
                                    <span>Details</span>
                                  </button>

                                  {confirmDeleteId === ord.id ? (
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onDeleteOrder(ord.id);
                                          setConfirmDeleteId(null);
                                        }}
                                        style={{
                                          backgroundColor: "#ef4444",
                                          color: "#ffffff",
                                          border: "none",
                                          padding: "4px 8px",
                                          borderRadius: "4px",
                                          fontSize: "0.74rem",
                                          fontWeight: 700,
                                          cursor: "pointer",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        Delete
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setConfirmDeleteId(null);
                                        }}
                                        style={{
                                          backgroundColor: "#e2e8f0",
                                          color: "#475569",
                                          border: "none",
                                          padding: "4px 8px",
                                          borderRadius: "4px",
                                          fontSize: "0.74rem",
                                          cursor: "pointer",
                                        }}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmDeleteId(ord.id);
                                      }}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: "#ef4444",
                                        cursor: "pointer",
                                        padding: "6px",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.2s",
                                      }}
                                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                      title="Delete Order"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Mobile View: High-Performance Touch Order Cards Feed */}
                <div className="admin-orders-mobile-cards">
                  {filteredOrders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 16px", color: "#64748b", background: "#ffffff", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      No orders found matching this filter.
                    </div>
                  ) : (
                    filteredOrders.map((ord) => {
                      const statusColors = {
                        Pending: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
                        Confirmed: { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" },
                        Shipped: { bg: "#e0e7ff", text: "#3730a3", border: "#c7d2fe" },
                        Delivered: { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" },
                        Cancelled: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
                      };
                      const col = statusColors[ord.status] || { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" };

                      return (
                        <div
                          key={ord.id}
                          className="admin-mobile-order-card"
                          onClick={() => setSelectedOrder(ord)}
                        >
                          {/* Card Header: Order ID & Date + Status Dropdown */}
                          <div className="admin-card-header">
                            <div>
                              <div className="admin-card-order-id">#{ord.id}</div>
                              <div className="admin-card-order-date">{ord.date}</div>
                            </div>
                            <select
                              value={ord.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                              style={{
                                backgroundColor: col.bg,
                                color: col.text,
                                border: `1px solid ${col.border}`,
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                borderRadius: "20px",
                                padding: "4px 10px",
                                cursor: "pointer",
                                outline: "none",
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          {/* Customer Row with 1-Tap Call & WhatsApp */}
                          <div className="admin-card-customer-row">
                            <div className="admin-card-customer-name">
                              {ord.customerName}
                            </div>
                            <div className="admin-card-quick-actions">
                              <a
                                href={`tel:${ord.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="admin-btn-call"
                                title="Call customer"
                              >
                                <Phone size={12} />
                                <span>{ord.phone}</span>
                              </a>
                              <a
                                href={`https://wa.me/88${ord.phone.replace(/[^0-9]/g, "")}`}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-btn-wa"
                                title="WhatsApp chat"
                              >
                                <MessageCircle size={13} />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          {/* Delivery Address */}
                          <div className="admin-card-address">
                            <MapPin size={13} style={{ color: "#d4af37", flexShrink: 0, marginTop: "2px" }} />
                            <span>
                              {ord.address},{" "}
                              <strong style={{ color: "#0f172a" }}>{ord.city}</strong>
                            </span>
                          </div>

                          {/* Items summary */}
                          <div className="admin-card-items-box">
                            {ord.items?.map((it, idx) => (
                              <div key={idx} className="admin-card-item-line">
                                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                                  • {it.title}
                                </span>
                                <span>
                                  <strong style={{ color: "#d4af37" }}>×{it.quantity}</strong>{" "}
                                  (৳{((it.price || 0) * (it.quantity || 1)).toLocaleString()})
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Footer: COD Total & Buttons */}
                          <div className="admin-card-footer">
                            <div className="admin-card-total-box">
                              <span style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 700 }}>
                                CASH ON DELIVERY
                              </span>
                              <span className="admin-card-total-val">
                                ৳{ord.totalAmount?.toLocaleString()}
                              </span>
                            </div>

                            <div className="admin-card-footer-btns">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOrder(ord);
                                }}
                                style={{
                                  backgroundColor: "#0f1b2b",
                                  color: "#ffffff",
                                  border: "none",
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <Eye size={13} />
                                <span>View Slip</span>
                              </button>

                              {confirmDeleteId === ord.id ? (
                                <div
                                  style={{ display: "flex", gap: "4px" }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={() => {
                                      onDeleteOrder(ord.id);
                                      setConfirmDeleteId(null);
                                    }}
                                    style={{
                                      backgroundColor: "#ef4444",
                                      color: "#ffffff",
                                      border: "none",
                                      padding: "5px 8px",
                                      borderRadius: "4px",
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    style={{
                                      backgroundColor: "#94a3b8",
                                      color: "#ffffff",
                                      border: "none",
                                      padding: "5px 8px",
                                      borderRadius: "4px",
                                      fontSize: "0.72rem",
                                      cursor: "pointer",
                                    }}
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmDeleteId(ord.id);
                                  }}
                                  style={{
                                    backgroundColor: "#fee2e2",
                                    color: "#ef4444",
                                    border: "none",
                                    padding: "6px 8px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  title="Delete order"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS */}
            {activeTab === "products" && (
              <div className="admin-tab-content-products">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                    Store Inventory ({products.length} Products)
                  </h4>
                  <button
                    onClick={() => handleOpenProductModal()}
                    className="btn-gold"
                    style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Product Grid / Cards */}
                <div
                  style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                    paddingBottom: "16px",
                  }}
                  className="admin-products-grid"
                >
                  {products.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        padding: "14px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.72rem", color: "#d4af37", fontWeight: 700, textTransform: "uppercase" }}>
                          {p.category} • {p.badge}
                        </div>
                        <h5
                          style={{
                            fontSize: "0.88rem",
                            fontWeight: 700,
                            color: "#0f172a",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            margin: "2px 0 4px 0",
                          }}
                        >
                          {p.title}
                        </h5>
                        <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.95rem" }}>
                          ৳{p.price.toLocaleString()}
                          {p.oldPrice && (
                            <span style={{ fontSize: "0.78rem", color: "#94a3b8", textDecoration: "line-through", marginLeft: "6px" }}>
                              ৳{p.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Stock: {p.stock || 20} pcs</div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <button
                          onClick={() => handleOpenProductModal(p)}
                          style={{
                            background: "#f1f5f9",
                            border: "none",
                            padding: "6px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: "#0f172a",
                          }}
                          title="Edit Product"
                        >
                          <Edit size={15} />
                        </button>
                        {confirmDeleteProdId === p.id ? (
                          <div style={{ display: "flex", gap: "4px" }}>
                            <button
                              onClick={() => {
                                onDeleteProduct(p.id);
                                setConfirmDeleteProdId(null);
                              }}
                              style={{
                                background: "#ef4444",
                                color: "#ffffff",
                                border: "none",
                                padding: "4px 6px",
                                borderRadius: "4px",
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Del
                            </button>
                            <button
                              onClick={() => setConfirmDeleteProdId(null)}
                              style={{
                                background: "#e2e8f0",
                                color: "#475569",
                                border: "none",
                                padding: "4px 6px",
                                borderRadius: "4px",
                                fontSize: "0.7rem",
                                cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteProdId(p.id)}
                            style={{
                              background: "#fee2e2",
                              border: "none",
                              padding: "6px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              color: "#ef4444",
                            }}
                            title="Delete Product"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SETTINGS & FREE CLOUD DATABASE */}
            {activeTab === "settings" && (
              <div className="admin-tab-content-settings">
                <div style={{ maxWidth: "750px", margin: "0 auto" }}>
                  {/* Settings Form */}
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      padding: "24px",
                      border: "1px solid #e2e8f0",
                      marginBottom: "24px",
                    }}
                  >
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "#0f1b2b", marginBottom: "16px" }}>
                      Store Information & Delivery Fees
                    </h4>

                    {saveSettingsStatus && (
                      <div
                        style={{
                          backgroundColor: saveSettingsStatus.success ? "#d1fae5" : "#fee2e2",
                          color: saveSettingsStatus.success ? "#065f46" : "#991b1b",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          marginBottom: "18px",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          border: `1px solid ${saveSettingsStatus.success ? "#a7f3d0" : "#fecaca"}`,
                        }}
                      >
                        {saveSettingsStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span>{saveSettingsStatus.message}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveSettings}>
                      {/* Store Name & Store Official Gmail */}
                      <div className="admin-grid-2col">
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Store Name
                          </label>
                          <input
                            type="text"
                            required
                            value={settingsForm.storeName || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Store Official Gmail / Email ✉️
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. yourstore@gmail.com"
                            value={settingsForm.email || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                          <span style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "3px", display: "block" }}>
                          </span>
                        </div>
                      </div>

                      {/* Phone & WhatsApp */}
                      <div className="admin-grid-2col">
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Hotline Phone
                          </label>
                          <input
                            type="text"
                            value={settingsForm.phone || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            WhatsApp Number
                          </label>
                          <input
                            type="text"
                            value={settingsForm.whatsapp || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      {/* Admin PIN & Store Physical Address */}
                      <div className="admin-grid-2col">
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Admin PIN Code
                          </label>
                          <input
                            type="text"
                            value={settingsForm.adminPin || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Store Physical Address
                          </label>
                          <input
                            type="text"
                            value={settingsForm.address || ""}
                            onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      {/* Delivery Charges */}
                      <div className="admin-grid-3col">
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Inside Dhaka Fee (৳)
                          </label>
                          <input
                            type="number"
                            value={settingsForm.insideDhakaFee ?? settingsForm.insideJamalpurFee ?? 70}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSettingsForm({ ...settingsForm, insideDhakaFee: val, insideJamalpurFee: val });
                            }}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Outside Dhaka Fee (৳)
                          </label>
                          <input
                            type="number"
                            value={settingsForm.outsideDhakaFee ?? settingsForm.outsideJamalpurFee ?? 130}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSettingsForm({ ...settingsForm, outsideDhakaFee: val, outsideJamalpurFee: val });
                            }}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            Free Delivery Above (৳)
                          </label>
                          <input
                            type="number"
                            value={settingsForm.freeDeliveryThreshold}
                            onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSavingSettings}
                        className="btn-gold"
                        style={{
                          padding: "11px 26px",
                          cursor: isSavingSettings ? "not-allowed" : "pointer",
                          opacity: isSavingSettings ? 0.7 : 1,
                        }}
                      >
                        <Save size={16} />
                        <span>{isSavingSettings ? "Saving to Cloud..." : "Save Store Settings"}</span>
                      </button>
                    </form>
                  </div>

                  {/* Free Cloud Database Management Panel (Supabase) */}
                  <div
                    style={{
                      backgroundColor: "#0f1b2b",
                      borderRadius: "14px",
                      padding: "26px",
                      color: "#ffffff",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(212, 175, 55, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#d4af37",
                          }}
                        >
                          <Database size={22} />
                        </div>
                        <div>
                          <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: 0, color: "#f3dc8d" }}>
                            100% Free Cloud Database (Supabase)
                          </h4>
                          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                            আজীবন সম্পূর্ণ ফ্রি ক্লাউড ডেটাবেস — শূন্য মাসিক খরচ
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        style={{
                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: supabaseConfig.isConfigured ? "rgba(34, 197, 94, 0.15)" : "rgba(234, 179, 8, 0.15)",
                          border: `1px solid ${supabaseConfig.isConfigured ? "#22c55e" : "#eab308"}`,
                          color: supabaseConfig.isConfigured ? "#4ade80" : "#fde047",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: supabaseConfig.isConfigured ? "#22c55e" : "#eab308",
                            boxShadow: supabaseConfig.isConfigured ? "0 0 8px #22c55e" : "none",
                          }}
                        />
                        <span>
                          {supabaseConfig.isConfigured
                            ? "🟢 ক্লাউড ডেটাবেস সংযুক্ত (Connected)"
                            : "🟡 লোকালস্টোরেজ মোড (Offline Mode)"}
                        </span>
                      </div>
                    </div>

                    <p style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "20px" }}>
                      বর্তমানে আপনার ওয়েবসাইটটি লোকাল মেমোরি ও ক্লাউড ডেটাবেস দুটিতেই কাজ করতে সক্ষম। Supabase-এর ফ্রি টিয়ার কানেক্ট করলে যেকোনো ফোন বা কম্পিউটার থেকে আসা সব অর্ডার রিয়েল-টাইমে লাইভ আপনার ড্যাশবোর্ডে জমা হবে!
                    </p>

                    {/* Connection Form */}
                    <form
                      onSubmit={handleSaveDatabaseConfig}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        borderRadius: "10px",
                        padding: "18px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ marginBottom: "14px" }}>
                        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>
                          Supabase Project URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://xyzabcdefghijklmnop.supabase.co"
                          value={dbUrlInput}
                          onChange={(e) => setDbUrlInput(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            backgroundColor: "#08101a",
                            color: "#ffffff",
                            fontSize: "0.88rem",
                            outline: "none",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>
                          Supabase Anon Public API Key
                        </label>
                        <input
                          type="password"
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                          value={dbKeyInput}
                          onChange={(e) => setDbKeyInput(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            backgroundColor: "#08101a",
                            color: "#ffffff",
                            fontSize: "0.88rem",
                            outline: "none",
                          }}
                        />
                      </div>

                      {/* Status message */}
                      {dbStatus && (
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            marginBottom: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: dbStatus.checking
                              ? "rgba(59, 130, 246, 0.15)"
                              : dbStatus.success
                                ? "rgba(34, 197, 94, 0.15)"
                                : "rgba(239, 68, 68, 0.15)",
                            color: dbStatus.checking ? "#93c5fd" : dbStatus.success ? "#86efac" : "#fca5a5",
                            border: `1px solid ${dbStatus.checking ? "#3b82f6" : dbStatus.success ? "#22c55e" : "#ef4444"}`,
                          }}
                        >
                          {dbStatus.checking ? (
                            <RefreshCw size={16} className="animate-spin" />
                          ) : dbStatus.success ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <AlertCircle size={16} />
                          )}
                          <span>{dbStatus.message}</span>
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "#d4af37",
                            color: "#0f1b2b",
                            fontWeight: 700,
                            padding: "10px 20px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Save size={16} />
                          <span>Save & Connect Database</span>
                        </button>

                        {supabaseConfig.isConfigured && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleTestDatabase()}
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "#ffffff",
                                padding: "10px 16px",
                                borderRadius: "6px",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <RefreshCw size={14} />
                              <span>Test Ping</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleDisconnectDatabase}
                              style={{
                                backgroundColor: "rgba(239, 68, 68, 0.15)",
                                color: "#fca5a5",
                                padding: "10px 16px",
                                borderRadius: "6px",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                              }}
                            >
                              Disconnect
                            </button>
                          </>
                        )}
                      </div>
                    </form>

                    {/* Action Tools: Copy SQL, Sync Products, Quick Guide */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={handleCopySqlScript}
                          style={{
                            backgroundColor: isCopiedSql ? "#22c55e" : "#1e293b",
                            color: "#ffffff",
                            padding: "9px 16px",
                            borderRadius: "6px",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {isCopiedSql ? <Check size={16} /> : <Copy size={16} />}
                          <span>{isCopiedSql ? "SQL Script Copied!" : "📋 Copy SQL Setup Script"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowSqlViewer(!showSqlViewer)}
                          style={{
                            backgroundColor: "#1e293b",
                            color: "#f3dc8d",
                            padding: "9px 16px",
                            borderRadius: "6px",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          {showSqlViewer ? "Hide SQL Script" : "👁️ View SQL Table Code"}
                        </button>

                        <button
                          type="button"
                          onClick={handleSyncAllProductsToCloud}
                          disabled={isSyncingProducts}
                          style={{
                            backgroundColor: "#1e293b",
                            color: "#ffffff",
                            padding: "9px 16px",
                            borderRadius: "6px",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <RefreshCw size={14} className={isSyncingProducts ? "animate-spin" : ""} />
                          <span>{isSyncingProducts ? "Syncing..." : "☁️ Sync All Local Products to Cloud"}</span>
                        </button>
                      </div>

                      {syncStatusMsg && (
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            backgroundColor: "rgba(212, 175, 55, 0.1)",
                            color: "#f3dc8d",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                          }}
                        >
                          {syncStatusMsg}
                        </div>
                      )}

                      {/* SQL Code Preview if toggled */}
                      {showSqlViewer && (
                        <div
                          style={{
                            backgroundColor: "#050b14",
                            borderRadius: "8px",
                            padding: "16px",
                            border: "1px solid #334155",
                            marginTop: "10px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>
                              Supabase SQL Editor এ পেস্ট করে Run দিন:
                            </span>
                            <button
                              type="button"
                              onClick={handleCopySqlScript}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#d4af37",
                                cursor: "pointer",
                                fontSize: "0.78rem",
                                fontWeight: 700,
                              }}
                            >
                              {isCopiedSql ? "Copied!" : "Copy Code"}
                            </button>
                          </div>
                          <pre
                            style={{
                              margin: 0,
                              maxHeight: "220px",
                              overflowY: "auto",
                              fontSize: "0.76rem",
                              color: "#7dd3fc",
                              fontFamily: "monospace",
                              lineHeight: 1.45,
                            }}
                          >
                            {SUPABASE_SQL_SCHEMA}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div
                      style={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        paddingTop: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        fontSize: "0.85rem",
                        color: "#e2e8f0",
                      }}
                    >
                      <div style={{ fontWeight: 700, color: "#f3dc8d", marginBottom: "4px" }}>
                        ৩টি সহজ ধাপে সম্পূর্ণ ফ্রি ক্লাউড ডেটাবেস সেটআপ:
                      </div>
                      <div>
                        1️⃣ <strong>supabase.com</strong> এ যান এবং 'Start your project' এ ক্লিক করে ফ্রিতে একটি অ্যাকাউন্ট খুলুন।
                      </div>
                      <div>
                        2️⃣ বাম পাশের মেনু থেকে <strong>SQL Editor</strong> এ গিয়ে <strong>'New Query'</strong> দিন, উপরের <strong>📋 Copy SQL Setup Script</strong> পেস্ট করে <strong>Run</strong> বাটনে চাপ দিন (টেবিল স্বয়ংক্রিয় তৈরি হয়ে যাবে)।
                      </div>
                      <div>
                        3️⃣ <strong>Project Settings ➔ API</strong> থেকে <strong>Project URL</strong> ও <strong>anon public key</strong> কপি করে উপরের বক্সে পেস্ট করে <strong>Save & Connect</strong> দিন!
                      </div>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <a
                        href="https://supabase.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: "#d4af37",
                          color: "#0f1b2b",
                          padding: "8px 18px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>Visit Supabase (100% Free)</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Admin Bottom Dock Menu */}
            <div className="admin-mobile-bottom-dock">
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`admin-dock-item ${activeTab === "orders" ? "active" : ""}`}
              >
                <ShoppingBag size={19} />
                <span>Orders</span>
                {orders.length > 0 && <span className="admin-dock-badge">{orders.length}</span>}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("products")}
                className={`admin-dock-item ${activeTab === "products" ? "active" : ""}`}
              >
                <Package size={19} />
                <span>Products</span>
                {products.length > 0 && <span className="admin-dock-badge">{products.length}</span>}
              </button>

              <button
                type="button"
                onClick={() => handleOpenProductModal()}
                className="admin-dock-fab"
                title="Add New Product"
              >
                <Plus size={22} />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`admin-dock-item ${activeTab === "settings" ? "active" : ""}`}
              >
                <Settings size={19} />
                <span>Settings</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="admin-dock-item"
                title="Exit to Storefront"
              >
                <LogOut size={19} />
                <span>Exit</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3000,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setIsProductModalOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              maxHeight: "92vh",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "20px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", margin: 0, color: "#0f1b2b" }}>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h4>
              <button
                onClick={() => setIsProductModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gold Aviator Sunglasses"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div className="admin-grid-2col" style={{ gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="sunglasses">Sunglasses</option>
                    <option value="eyewear">Eyewear</option>
                    <option value="watches">Watches</option>
                    <option value="perfumes">Perfumes</option>
                    <option value="wallets">Wallets</option>
                    <option value="bags">Bags</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="gift-sets">Gift Sets</option>
                    <option value="belts">Belts</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Badge Tag
                  </label>
                  <select
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="NEW">NEW</option>
                    <option value="HOT">HOT</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="PREMIUM">PREMIUM</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>
              </div>

              <div className="admin-grid-3col" style={{ gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1850"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Old Price (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="2450"
                    value={productForm.oldPrice}
                    onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Stock
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                  Product Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short details about materials, specs..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold" style={{ padding: "8px 20px" }}>
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ORDER DETAILS MODAL ================= */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3500,
            backgroundColor: "rgba(9, 18, 29, 0.75)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "92vh",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #cbd5e1",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div
              style={{
                backgroundColor: "#0f1b2b",
                color: "#ffffff",
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #d4af37",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
                    Order #{selectedOrder.id}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontWeight: 700,
                      backgroundColor:
                        selectedOrder.status === "Delivered"
                          ? "#d1fae5"
                          : selectedOrder.status === "Confirmed"
                            ? "#dbeafe"
                            : selectedOrder.status === "Shipped"
                              ? "#e0e7ff"
                              : selectedOrder.status === "Cancelled"
                                ? "#fee2e2"
                                : "#fef3c7",
                      color:
                        selectedOrder.status === "Delivered"
                          ? "#065f46"
                          : selectedOrder.status === "Confirmed"
                            ? "#1e40af"
                            : selectedOrder.status === "Shipped"
                              ? "#3730a3"
                              : selectedOrder.status === "Cancelled"
                                ? "#991b1b"
                                : "#92400e",
                    }}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "3px" }}>
                  Ordered on: {selectedOrder.date}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#ffffff",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* 1. Customer & Delivery Address Card */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
                  👤 Customer & Delivery Information
                </div>

                <div className="admin-grid-2col" style={{ gap: "16px", marginBottom: "14px" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Customer Full Name:</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                      {selectedOrder.customerName}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Contact Phone:</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px", flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "1rem", color: "#0f172a" }}>{selectedOrder.phone}</strong>
                      <a
                        href={`tel:${selectedOrder.phone}`}
                        style={{
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          textDecoration: "none",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Phone size={11} /> Call
                      </a>
                      <a
                        href={`https://wa.me/88${selectedOrder.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: "#25D366",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          textDecoration: "none",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <MessageCircle size={12} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Detailed Address */}
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px" }}>Full Delivery Address:</div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <MapPin size={18} style={{ color: "#d4af37", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "0.95rem", color: "#1e293b", fontWeight: 600, lineHeight: 1.5 }}>
                        {selectedOrder.address}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "3px" }}>
                        Zone / City: <strong>{selectedOrder.city}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Order Notes */}
                {selectedOrder.notes && (
                  <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "10px", marginTop: "12px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Special Customer Note:</div>
                    <div style={{ fontSize: "0.88rem", color: "#d97706", fontStyle: "italic", marginTop: "2px" }}>
                      "{selectedOrder.notes}"
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Products Ordered */}
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                  🛍️ Ordered Products ({selectedOrder.items?.reduce((a, b) => a + (b.quantity || 1), 0) || 1} Items)
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedOrder.items?.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {it.image && (
                          <img
                            src={it.image}
                            alt={it.title}
                            style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "6px" }}
                          />
                        )}
                        <div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>
                            {it.title}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            ৳{it.price?.toLocaleString()} × {it.quantity}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>
                        ৳{((it.price || 0) * (it.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Pricing Summary */}
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#475569" }}>
                  <span>Delivery Fee:</span>
                  <span>৳{selectedOrder.deliveryFee || 0}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", borderTop: "1px solid #cbd5e1", paddingTop: "6px", marginTop: "2px" }}>
                  <span>Total Cash to Collect (COD):</span>
                  <span style={{ color: "#059669" }}>৳{selectedOrder.totalAmount?.toLocaleString()}</span>
                </div>
              </div>

              {/* 4. Quick Actions: Status Change + Copy + Print */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>Change Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStat = e.target.value;
                      onUpdateOrderStatus(selectedOrder.id, newStat);
                      setSelectedOrder({ ...selectedOrder, status: newStat });
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => {
                      const text = `📦 Rongin Order #${selectedOrder.id}\nCustomer: ${selectedOrder.customerName}\nPhone: ${selectedOrder.phone}\nAddress: ${selectedOrder.address}, ${selectedOrder.city}\nProducts: ${selectedOrder.items?.map((i) => `${i.title} x${i.quantity}`).join(", ")}\nCash to Collect: ৳${selectedOrder.totalAmount}`;
                      navigator.clipboard.writeText(text);
                      setCopiedSlip(true);
                      setTimeout(() => setCopiedSlip(false), 2500);
                    }}
                    style={{
                      backgroundColor: copiedSlip ? "#10b981" : "#f1f5f9",
                      color: copiedSlip ? "#ffffff" : "#0f1b2b",
                      border: "1px solid #cbd5e1",
                      padding: "7px 14px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    title="Copy customer details for Steadfast / Pathao / RedX courier delivery"
                  >
                    <Copy size={13} />
                    <span>{copiedSlip ? "Copied to Clipboard!" : "Copy for Courier"}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    style={{
                      backgroundColor: "#0f1b2b",
                      color: "#ffffff",
                      border: "none",
                      padding: "7px 14px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Printer size={13} />
                    <span>Print Slip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
