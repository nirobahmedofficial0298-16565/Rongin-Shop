// Storage & Cloud Database Synchronization Service
// Seamlessly operates offline with localStorage AND syncs in real-time with Supabase Cloud DB
import { INITIAL_PRODUCTS, INITIAL_ORDERS, STORE_SETTINGS } from "../data/initialData";
import {
  getSupabaseConfig,
  fetchProductsFromDB,
  syncAllProductsToDB,
  upsertProductToDB,
  deleteProductFromDB,
  fetchOrdersFromDB,
  insertOrderToDB,
  updateOrderStatusInDB,
  deleteOrderFromDB,
  subscribeToOrders,
  fetchSettingsFromDB,
  upsertSettingsToDB,
} from "./supabase";

const STORAGE_KEYS = {
  PRODUCTS: "Rongin_products_v1",
  ORDERS: "Rongin_orders_v1",
  SETTINGS: "Rongin_settings_v1",
  SUPABASE_CONFIG: "Rongin_supabase_config_v1",
};

// --- Products Storage & Cloud Sync ---
export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading products:", e);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error("Error saving products locally:", e);
  }
};

export const saveProductAndSync = async (product) => {
  // Cloud sync
  try {
    await upsertProductToDB(product);
  } catch (e) {
    console.warn("Product cloud sync failed, saved locally:", e);
  }
};

export const deleteProductAndSync = async (productId) => {
  try {
    await deleteProductFromDB(productId);
  } catch (e) {
    console.warn("Product cloud deletion failed, deleted locally:", e);
  }
};

// --- Orders Storage & Cloud Sync ---
export const getStoredOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading orders:", e);
    return INITIAL_ORDERS;
  }
};

export const saveNewOrder = (orderData) => {
  try {
    const orders = getStoredOrders();
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Pending",
      paymentMethod: "Cash on Delivery (COD)",
      ...orderData,
    };

    // 1. Instant local persistence
    const updated = [newOrder, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // 2. Async cloud database insertion
    const config = getSupabaseConfig();
    if (config.isConfigured) {
      insertOrderToDB(newOrder).catch((err) => {
        console.warn("Order saved locally, cloud sync pending:", err);
      });
    }

    return newOrder;
  } catch (e) {
    console.error("Error creating order:", e);
    return null;
  }
};

export const updateOrderStatus = (orderId, newStatus) => {
  try {
    const orders = getStoredOrders();
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // Cloud DB sync
    const config = getSupabaseConfig();
    if (config.isConfigured) {
      updateOrderStatusInDB(orderId, newStatus).catch((err) => {
        console.warn("Status updated locally, cloud sync pending:", err);
      });
    }

    return updated;
  } catch (e) {
    console.error("Error updating order:", e);
    return [];
  }
};

export const deleteStoredOrder = (orderId) => {
  try {
    const orders = getStoredOrders();
    const updated = orders.filter((order) => order.id !== orderId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // Cloud DB sync
    const config = getSupabaseConfig();
    if (config.isConfigured) {
      deleteOrderFromDB(orderId).catch((err) => {
        console.warn("Order deleted locally, cloud delete pending:", err);
      });
    }

    return updated;
  } catch (e) {
    console.error("Error deleting order:", e);
    return [];
  }
};

export const deleteCancelledOrders = () => {
  try {
    const orders = getStoredOrders();
    const cancelled = orders.filter((order) => order.status.toLowerCase() === "cancelled");
    const updated = orders.filter((order) => order.status.toLowerCase() !== "cancelled");
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // Cloud sync deletion
    const config = getSupabaseConfig();
    if (config.isConfigured) {
      cancelled.forEach((o) => deleteOrderFromDB(o.id));
    }

    return updated;
  } catch (e) {
    console.error("Error deleting cancelled orders:", e);
    return [];
  }
};

// --- Settings Storage ---
export const getStoredSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      return STORE_SETTINGS;
    }
    const parsed = JSON.parse(data);
    // Auto-migrate legacy brand or location data
    if (!parsed.storeName || /khandani/i.test(parsed.storeName)) {
      parsed.storeName = STORE_SETTINGS.storeName;
    }
    if (!parsed.address || /jamalpur|nandina/i.test(parsed.address)) {
      parsed.address = STORE_SETTINGS.address;
      parsed.directionsUrl = STORE_SETTINGS.directionsUrl;
    }
    if (!parsed.email || /khandani/i.test(parsed.email)) {
      parsed.email = STORE_SETTINGS.email;
    }
    return { ...STORE_SETTINGS, ...parsed };
  } catch (e) {
    return STORE_SETTINGS;
  }
};

export const saveStoredSettings = (newSettings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  } catch (e) {
    console.error("Error saving settings locally:", e);
  }
};

export const saveSettingsAndSync = async (newSettings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    const success = await upsertSettingsToDB(newSettings);
    if (!success) {
      throw new Error("Cloud database rejected update. Check permissions.");
    }
    return true;
  } catch (e) {
    console.error("Error syncing settings to cloud:", e);
    throw e;
  }
};

// --- Cloud Sync Initialization ---
export const syncCloudData = async ({ onProductsFetched, onOrdersFetched, onSettingsFetched } = {}) => {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return;

  try {
    // 1. Fetch Cloud Products
    const cloudProducts = await fetchProductsFromDB();
    if (cloudProducts && cloudProducts.length > 0) {
      saveStoredProducts(cloudProducts);
      if (onProductsFetched) onProductsFetched(cloudProducts);
    } else if (cloudProducts && cloudProducts.length === 0) {
      // If cloud is empty, seed initial products from local to cloud
      const localProducts = getStoredProducts();
      await syncAllProductsToDB(localProducts);
    }

    // 2. Fetch Cloud Orders
    const cloudOrders = await fetchOrdersFromDB();
    if (cloudOrders && cloudOrders.length > 0) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(cloudOrders));
      if (onOrdersFetched) onOrdersFetched(cloudOrders);
    }

    // 3. Fetch Cloud Settings (Always takes precedence over local defaults)
    const cloudSettings = await fetchSettingsFromDB();
    if (cloudSettings && typeof cloudSettings === "object" && Object.keys(cloudSettings).length > 0) {
      const merged = { ...STORE_SETTINGS, ...cloudSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
      if (onSettingsFetched) onSettingsFetched(merged);
    }
  } catch (e) {
    console.warn("Cloud sync encountered a temporary issue:", e);
  }
};

