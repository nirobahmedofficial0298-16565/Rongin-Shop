// Chrome Order Desktop Notifications and Audio Chimes
const NOTIFIED_ORDERS_KEY = "Rongin_notified_orders_v1";

const getNotifiedOrders = () => {
  try {
    const data = localStorage.getItem(NOTIFIED_ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const markOrderAsNotified = (orderId) => {
  try {
    const list = getNotifiedOrders();
    if (!list.includes(orderId)) {
      list.push(orderId);
      localStorage.setItem(NOTIFIED_ORDERS_KEY, JSON.stringify(list.slice(-100)));
    }
  } catch (e) {
    console.error("Error updating notified orders:", e);
  }
};

// Pleasant Web Audio bell chime (works seamlessly in all modern browsers)
export const playOrderChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Gentle 4-tone luxury chime: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.45);
    });
  } catch (e) {
    console.warn("Could not play audio chime:", e);
  }
};

// Request Chrome / OS Notification permission
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return "unsupported";
  }
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch (e) {
    return "denied";
  }
};

export const getNotificationPermission = () => {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
};

// Show Chrome Notification for new order without exposing customer personal details
export const sendChromeOrderNotification = (order) => {
  if (!order || !order.id) return;

  const notifiedList = getNotifiedOrders();
  if (notifiedList.includes(order.id)) {
    return; // Prevent duplicate notification
  }
  markOrderAsNotified(order.id);

  // 1. Play sound chime
  playOrderChime();

  // 2. Desktop notification banner
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      const title = `🛍️ New Order Received! (${order.id})`;
      const itemCount = Array.isArray(order.items) ? order.items.length : 1;
      const totalStr = Number(order.totalAmount || 0).toLocaleString();

      const notif = new Notification(title, {
        body: `Order #${order.id} • ${itemCount} items • Total: ৳${totalStr} (Cash on Delivery)`,
        icon: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=192&q=80",
        badge: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=96&q=80",
        tag: `order-${order.id}`,
        renotify: true,
      });

      notif.onclick = () => {
        window.focus();
        if (window.location.pathname !== "/admin") {
          window.location.href = "/admin";
        }
        notif.close();
      };
    } catch (e) {
      console.warn("Notification trigger failed:", e);
    }
  }
};
