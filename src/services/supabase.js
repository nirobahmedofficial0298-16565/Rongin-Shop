import { createClient } from "@supabase/supabase-js";

const SUPABASE_CONFIG_KEY = "Rongin_supabase_config_v1";

const sanitizeUrl = (rawUrl) => {
  if (!rawUrl) return "";
  let clean = rawUrl.trim();
  clean = clean.replace(/\/rest\/v1\/?$/, "");
  clean = clean.replace(/\/+$/, "");
  return clean;
};

const DEFAULT_SUPABASE_URL = "https://ifilcipyuvwekljzfqte.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_EDfTPeHczflF7bID0cYglQ_kvevOwAC";

// Helper to get active credentials from localStorage or Vite env (with permanent cloud fallback)
export const getSupabaseConfig = () => {
  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return {
          url: sanitizeUrl(parsed.url),
          anonKey: parsed.anonKey.trim(),
          isConfigured: true,
          source: "custom",
        };
      }
    }
  } catch (e) {
    console.error("Error reading supabase config:", e);
  }

  // Fallback to env variables or built-in store cloud DB
  const envUrl = import.meta.env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_ANON_KEY;
  if (envUrl && envKey) {
    return {
      url: sanitizeUrl(envUrl),
      anonKey: envKey.trim(),
      isConfigured: true,
      source: "cloud",
    };
  }

  return {
    url: "",
    anonKey: "",
    isConfigured: false,
    source: "none",
  };
};

// Singleton client instance
let supabaseClient = null;

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return null;

  if (
    !supabaseClient ||
    supabaseClient.supabaseUrl !== config.url
  ) {
    try {
      supabaseClient = createClient(config.url, config.anonKey, {
        auth: { persistSession: false },
      });
    } catch (e) {
      console.error("Failed to initialize Supabase client:", e);
      return null;
    }
  }
  return supabaseClient;
};

// Save custom credentials and reinitialize
export const saveSupabaseConfig = (url, anonKey) => {
  try {
    const config = {
      url: sanitizeUrl(url),
      anonKey: (anonKey || "").trim(),
    };
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
    supabaseClient = null; // force reinit
    return getSupabaseClient();
  } catch (e) {
    console.error("Error saving Supabase config:", e);
    return null;
  }
};

// Remove credentials
export const clearSupabaseConfig = () => {
  try {
    localStorage.removeItem(SUPABASE_CONFIG_KEY);
    supabaseClient = null;
  } catch (e) {
    console.error("Error clearing Supabase config:", e);
  }
};

// Test connection
export const testSupabaseConnection = async () => {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: "Supabase URL বা Anon Key প্রদান করা হয়নি।" };
  }

  try {
    // Try pinging products table or querying system info
    const { data, error } = await client.from("products").select("id").limit(1);
    if (error) {
      // If table doesn't exist yet, return specific helpful message
      if (error.code === "42P01" || error.message?.includes("does not exist")) {
        return {
          success: true,
          tableMissing: true,
          message: "Supabase কানেক্টেড! তবে টেবিল তৈরি করা বাকি আছে। নিচের SQL স্ক্রিপ্টটি রান করুন।",
        };
      }
      return { success: false, error: error.message };
    }
    return { success: true, count: data?.length || 0, message: "ডেটাবেস সফলভাবে কানেক্টেড এবং সক্রিয়!" };
  } catch (e) {
    return { success: false, error: e.message || "কানেকশন ব্যর্থ হয়েছে।" };
  }
};

// --- Products Database Sync ---
export const fetchProductsFromDB = async () => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("Could not fetch products from DB:", error?.message);
      return null;
    }

    // Map DB columns to store format
    return data.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      gender: p.gender,
      price: Number(p.price),
      oldPrice: p.old_price ? Number(p.old_price) : undefined,
      rating: p.rating ? Number(p.rating) : 5.0,
      reviewsCount: p.reviews_count ? Number(p.reviews_count) : 0,
      badge: p.badge || undefined,
      image: p.image,
      description: p.description,
      stock: p.stock !== undefined ? Number(p.stock) : 10,
      isFeatured: !!p.is_featured,
      isTrending: !!p.is_trending,
    }));
  } catch (e) {
    console.error("fetchProductsFromDB error:", e);
    return null;
  }
};

export const syncAllProductsToDB = async (products) => {
  const client = getSupabaseClient();
  if (!client || !products?.length) return false;

  try {
    const rows = products.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      gender: p.gender || "unisex",
      price: p.price,
      old_price: p.oldPrice || null,
      rating: p.rating || 5.0,
      reviews_count: p.reviewsCount || 0,
      badge: p.badge || null,
      image: p.image,
      description: p.description || "",
      stock: p.stock !== undefined ? p.stock : 10,
      is_featured: !!p.isFeatured,
      is_trending: !!p.isTrending,
    }));

    const { error } = await client.from("products").upsert(rows, { onConflict: "id" });
    if (error) {
      console.error("syncAllProductsToDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("syncAllProductsToDB error:", e);
    return false;
  }
};

export const upsertProductToDB = async (product) => {
  const client = getSupabaseClient();
  if (!client || !product) return false;

  try {
    const row = {
      id: product.id,
      title: product.title,
      category: product.category,
      gender: product.gender || "unisex",
      price: product.price,
      old_price: product.oldPrice || null,
      rating: product.rating || 5.0,
      reviews_count: product.reviewsCount || 0,
      badge: product.badge || null,
      image: product.image,
      description: product.description || "",
      stock: product.stock !== undefined ? product.stock : 10,
      is_featured: !!product.isFeatured,
      is_trending: !!product.isTrending,
    };

    const { error } = await client.from("products").upsert([row], { onConflict: "id" });
    if (error) {
      console.error("upsertProductToDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("upsertProductToDB error:", e);
    return false;
  }
};

export const deleteProductFromDB = async (productId) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from("products").delete().eq("id", productId);
    if (error) {
      console.error("deleteProductFromDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("deleteProductFromDB error:", e);
    return false;
  }
};

// --- Orders Database Sync ---
export const fetchOrdersFromDB = async () => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("Could not fetch orders from DB:", error?.message);
      return null;
    }

    return data.map((o) => ({
      id: o.id,
      date: o.date,
      customerName: o.customer_name,
      phone: o.phone,
      address: o.address,
      city: o.city,
      deliveryFee: Number(o.delivery_fee || 0),
      paymentMethod: o.payment_method || "Cash on Delivery (COD)",
      status: o.status || "Pending",
      items: o.items || [],
      totalAmount: Number(o.total_amount),
      notes: o.notes || "",
    }));
  } catch (e) {
    console.error("fetchOrdersFromDB error:", e);
    return null;
  }
};

export const insertOrderToDB = async (order) => {
  const client = getSupabaseClient();
  if (!client || !order) return false;

  try {
    const row = {
      id: order.id,
      date: order.date,
      customer_name: order.customerName,
      phone: order.phone,
      address: order.address,
      city: order.city,
      delivery_fee: order.deliveryFee,
      payment_method: order.paymentMethod,
      status: order.status || "Pending",
      items: order.items,
      total_amount: order.totalAmount,
      notes: order.notes || "",
    };

    const { error } = await client.from("orders").insert([row]);
    if (error) {
      console.error("insertOrderToDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("insertOrderToDB error:", e);
    return false;
  }
};

export const updateOrderStatusInDB = async (orderId, newStatus) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    if (error) {
      console.error("updateOrderStatusInDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("updateOrderStatusInDB error:", e);
    return false;
  }
};

export const deleteOrderFromDB = async (orderId) => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from("orders").delete().eq("id", orderId);
    if (error) {
      console.error("deleteOrderFromDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("deleteOrderFromDB error:", e);
    return false;
  }
};

// Real-time subscription to orders
export const subscribeToOrders = (onOrderChange) => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("orders_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          if (onOrderChange) onOrderChange(payload);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (e) {
    console.error("subscribeToOrders error:", e);
    return null;
  }
};

// Real-time subscription to store settings
export const subscribeToSettings = (onSettingsChange) => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const channel = client
      .channel("store_settings_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "store_settings" },
        (payload) => {
          if (payload?.new?.data && onSettingsChange) {
            onSettingsChange(payload.new.data);
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (e) {
    console.error("subscribeToSettings error:", e);
    return null;
  }
};

// --- Store Settings Database Sync ---
export const fetchSettingsFromDB = async () => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("store_settings")
      .select("data")
      .eq("id", "current_settings")
      .maybeSingle();

    if (error || !data) return null;
    return data.data;
  } catch (e) {
    console.error("fetchSettingsFromDB error:", e);
    return null;
  }
};

export const upsertSettingsToDB = async (settings) => {
  const client = getSupabaseClient();
  if (!client || !settings) return false;

  try {
    const { error } = await client.from("store_settings").upsert(
      [
        {
          id: "current_settings",
          data: settings,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: "id" }
    );

    if (error) {
      console.error("upsertSettingsToDB error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("upsertSettingsToDB error:", e);
    return false;
  }
};

// Ready-to-copy SQL table schema
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- Rongin Luxury Store - Supabase SQL Schema
-- Copy and run this in your Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- ==========================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  gender TEXT DEFAULT 'unisex',
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  badge TEXT,
  image TEXT,
  description TEXT,
  stock INT DEFAULT 10,
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  date TEXT,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  delivery_fee NUMERIC DEFAULT 0,
  payment_method TEXT DEFAULT 'Cash on Delivery (COD)',
  status TEXT DEFAULT 'Pending',
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Settings Table
CREATE TABLE IF NOT EXISTS public.store_settings (
  id TEXT PRIMARY KEY DEFAULT 'current_settings',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Allow Public/Anon access for storefront & dashboard
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Write Products" ON public.products;
CREATE POLICY "Public Write Products" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "Public Read Orders" ON public.orders;
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Orders" ON public.orders;
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Orders" ON public.orders;
CREATE POLICY "Public Update Orders" ON public.orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Orders" ON public.orders;
CREATE POLICY "Public Delete Orders" ON public.orders FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public Read Settings" ON public.store_settings;
CREATE POLICY "Public Read Settings" ON public.store_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Write Settings" ON public.store_settings;
CREATE POLICY "Public Write Settings" ON public.store_settings FOR ALL USING (true);

-- Enable Realtime for orders table safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
END $$;
`;
