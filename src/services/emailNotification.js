// Email Notification Service for Orders & Contact Messages
// Forwards real-time alerts to the store's configured Gmail address via formsubmit.co

export const sendOrderEmailNotification = async (order, storeEmail) => {
  const targetEmail = storeEmail || "support@ronginshop.com";
  try {
    const itemsList = order.items
      ?.map((it) => `• ${it.title} (x${it.quantity}) - ৳${it.price.toLocaleString()}`)
      .join("\n");

    const payload = {
      _subject: `🛍️ New Order: #${order.id} from ${order.customerName} - ৳${order.totalAmount.toLocaleString()}`,
      _template: "table",
      _captcha: "false",
      "Order ID": order.id,
      "Order Date & Time": order.date,
      "Customer Name": order.customerName,
      "Customer Phone": order.phone,
      "Delivery Address": order.address,
      "Delivery City / Zone": order.city || "Not specified",
      "Ordered Items": itemsList || "None",
      "Delivery Fee": `৳${order.deliveryFee || 0}`,
      "Total Amount": `৳${order.totalAmount?.toLocaleString()} (Cash on Delivery)`,
      "Order Notes": order.notes || "None",
    };

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail.trim())}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.warn("sendOrderEmailNotification warning:", error);
    return { success: false, error: error.message };
  }
};

export const sendContactEmailNotification = async (contactData, storeEmail) => {
  const targetEmail = storeEmail || "support@ronginshop.com";
  try {
    const payload = {
      _subject: `📩 New Contact Inquiry from ${contactData.name}: ${contactData.subject}`,
      _template: "table",
      _captcha: "false",
      "Sender Name": contactData.name,
      "Phone Number": contactData.phone,
      "Sender Email": contactData.email || "Not provided",
      "Subject": contactData.subject,
      "Message Content": contactData.message,
      "Received At": new Date().toLocaleString("en-GB"),
    };

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail.trim())}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.warn("sendContactEmailNotification warning:", error);
    return { success: false, error: error.message };
  }
};
