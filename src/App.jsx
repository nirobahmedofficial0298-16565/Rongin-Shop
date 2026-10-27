import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { WhatsAppFloating } from "./components/WhatsAppFloating";
import { MobileBottomBar } from "./components/MobileBottomBar";

// Multi-Page Website Pages
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminPage } from "./pages/AdminPage";

import { INITIAL_CATEGORIES } from "./data/initialData";
import {
  getStoredProducts,
  saveStoredProducts,
  saveProductAndSync,
  deleteProductAndSync,
  getStoredOrders,
  saveNewOrder,
  updateOrderStatus,
  deleteStoredOrder,
  deleteCancelledOrders,
  getStoredSettings,
  saveStoredSettings,
  syncCloudData,
} from "./services/storage";
import { subscribeToOrders, subscribeToSettings } from "./services/supabase";
import { sendOrderEmailNotification } from "./services/emailNotification";
import { sendChromeOrderNotification } from "./services/notifications";

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState(getStoredProducts());
  const [categories] = useState(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState(getStoredOrders());
  const [storeSettings, setStoreSettings] = useState(getStoredSettings());

  // Cart & Direct Buy State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [directBuyItem, setDirectBuyItem] = useState(null);
  const [deliveryCity, setDeliveryCity] = useState("dhaka");

  // Search & Category State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sync Cloud Data & Real-time Orders Listener
  useEffect(() => {
    // 1. Initial Cloud Sync
    syncCloudData({
      onProductsFetched: (syncedProducts) => setProducts(syncedProducts),
      onOrdersFetched: (syncedOrders) => setOrders(syncedOrders),
      onSettingsFetched: (syncedSettings) => setStoreSettings(syncedSettings),
    });

    // 2. Real-time Subscription to new/updated orders
    const unsubscribe = subscribeToOrders((payload) => {
      syncCloudData({
        onOrdersFetched: (syncedOrders) => setOrders(syncedOrders),
      });

      // If a new order was created in Supabase by a customer, show Chrome alert
      if (payload && payload.eventType === "INSERT" && payload.new) {
        sendChromeOrderNotification(payload.new);
      }
    });

    // Real-time Subscription to store settings changes across all devices & incognito tabs
    const unsubSettings = subscribeToSettings((newSettings) => {
      if (newSettings && typeof newSettings === 'object') {
        setStoreSettings((prev) => ({ ...prev, ...newSettings }));
        saveStoredSettings(newSettings);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
      if (unsubSettings) unsubSettings();
    };
  }, []);

  // Sync products to local storage whenever state changes
  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  // Sync settings to local storage whenever state changes
  useEffect(() => {
    saveStoredSettings(storeSettings);
  }, [storeSettings]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Cart actions
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleBuyNow = (product) => {
    setDirectBuyItem(product);
    navigate("/checkout");
  };

  const handleProceedCheckoutFromCart = () => {
    setDirectBuyItem(null);
    setIsCartOpen(false);
    navigate("/checkout");
  };

  // Order placement handler
  const handleOrderSuccess = (orderPayload) => {
    const created = saveNewOrder(orderPayload);
    if (created) {
      setOrders(getStoredOrders());
      // Trigger Chrome OS notification & audio chime
      sendChromeOrderNotification(created);
      // Trigger instant email notification to store Gmail
      sendOrderEmailNotification(created, storeSettings.email);
      // Clear cart if ordered from cart
      if (!directBuyItem) {
        setCartItems([]);
      }
    }
    return created;
  };

  // Admin Actions
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  const handleDeleteOrder = (orderId) => {
    const updated = deleteStoredOrder(orderId);
    setOrders([...updated]);
  };

  const handleDeleteCancelledOrders = () => {
    const updated = deleteCancelledOrders();
    setOrders([...updated]);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    saveProductAndSync(newProduct);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    saveProductAndSync(updatedProduct);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    deleteProductAndSync(productId);
  };

  const handleUpdateSettings = (newSettings) => {
    setStoreSettings(newSettings);
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="store-app" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Header (shown on storefront pages) */}
      {!isAdminRoute && (
        <Header
          cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAdmin={() => navigate("/admin")}
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            navigate(`/products?category=${catId}`);
          }}
          storeSettings={storeSettings}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* 2. Multi-Page Routes */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                categories={categories}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onSelectProduct={(p) => navigate(`/product/${p.id}`)}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  navigate(`/products?category=${catId}`);
                }}
                activeCategory={selectedCategory}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onSelectProduct={(p) => navigate(`/product/${p.id}`)}
              />
            }
          />
          <Route
            path="/collections"
            element={<CollectionsPage products={products} />}
          />
          <Route
            path="/about"
            element={<AboutPage storeSettings={storeSettings} />}
          />
          <Route
            path="/contact"
            element={<ContactPage storeSettings={storeSettings} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailsPage
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                storeSettings={storeSettings}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                deliveryCity={deliveryCity}
                setDeliveryCity={setDeliveryCity}
                storeSettings={storeSettings}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                onOrderSuccess={handleOrderSuccess}
                deliveryCity={deliveryCity}
                setDeliveryCity={setDeliveryCity}
                storeSettings={storeSettings}
                directBuyItem={directBuyItem}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onDeleteOrder={handleDeleteOrder}
                onDeleteCancelledOrders={handleDeleteCancelledOrders}
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                storeSettings={storeSettings}
                onUpdateSettings={handleUpdateSettings}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. Footer (shown on storefront pages) */}
      {!isAdminRoute && (
        <Footer
          storeSettings={storeSettings}
          onOpenAdmin={() => navigate("/admin")}
        />
      )}

      {/* 4. Cart Quick Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckoutFromCart}
        deliveryCity={deliveryCity}
        setDeliveryCity={setDeliveryCity}
        storeSettings={storeSettings}
      />

      {/* 5. Floating WhatsApp Button */}
      {!isAdminRoute && (
        <WhatsAppFloating whatsappNumber={storeSettings.whatsapp} />
      )}

      {/* 6. Mobile App-like Bottom Navigation Bar */}
      {!isAdminRoute && (
        <MobileBottomBar
          cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAdmin={() => navigate("/admin")}
          whatsappNumber={storeSettings.whatsapp}
        />
      )}
    </div>
  );
}

export default App;
