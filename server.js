const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "orders.json");
const DANA_NUMBER = process.env.DANA_NUMBER || "089516353968";
const PAYMENT_PROVIDER = process.env.PAYMENT_PROVIDER || "manual-dana";

app.use(cors());
app.use(express.json());

function loadOrders() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveOrders(orders) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}

function buildGatewayResponse(order) {
  const base = {
    orderId: order.id,
    status: order.status,
    amount: Number(order.total),
    paymentMethod: order.paymentMethod,
    provider: PAYMENT_PROVIDER
  };

  if (PAYMENT_PROVIDER === "manual-dana") {
    return {
      ...base,
      instruction: "Transfer ke DANA 089516353968 sesuai nominal total.",
      paymentNumber: DANA_NUMBER,
      redirectUrl: null,
      qrCode: null
    };
  }

  if (PAYMENT_PROVIDER === "midtrans") {
    return {
      ...base,
      instruction: "Midtrans gateway siap dipakai setelah konfigurasi server key dan client key Anda.",
      paymentNumber: null,
      redirectUrl: `https://app.midtrans.com/snap/v2/vtweb/${order.id}`,
      qrCode: null
    };
  }

  return {
    ...base,
    instruction: "Gateway belum dikonfigurasi. Gunakan mode manual DANA.",
    paymentNumber: DANA_NUMBER,
    redirectUrl: null,
    qrCode: null
  };
}

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend NEXA running",
    paymentProvider: PAYMENT_PROVIDER,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/orders", (req, res) => {
  const orders = loadOrders();
  res.json({
    success: true,
    total: orders.length,
    data: orders
  });
});

app.post("/api/checkout", (req, res) => {
  const { name, phone, email, items, total, notes } = req.body;

  if (!name || !phone || !Array.isArray(items) || !items.length || !total) {
    return res.status(400).json({
      success: false,
      message: "Data checkout tidak lengkap. Pastikan nama, telepon, item, dan total ada."
    });
  }

  const newOrder = {
    id: `NEXA-${Date.now()}`,
    name,
    phone,
    email: email || "",
    items,
    total: Number(total),
    notes: notes || "",
    paymentMethod: PAYMENT_PROVIDER === "midtrans" ? "MIDTRANS" : "DANA",
    paymentNumber: DANA_NUMBER,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const orders = loadOrders();
  orders.push(newOrder);
  saveOrders(orders);

  res.status(201).json({
    success: true,
    message: PAYMENT_PROVIDER === "midtrans"
      ? "Pesanan berhasil dibuat. Gateway Midtrans siap diproses."
      : "Pesanan berhasil dibuat. Silakan transfer ke nomor DANA berikut.",
    order: newOrder,
    payment: buildGatewayResponse(newOrder)
  });
});

app.post("/api/payment/create", (req, res) => {
  const { name, phone, email, items, total, notes } = req.body;

  if (!name || !phone || !Array.isArray(items) || !items.length || !total) {
    return res.status(400).json({
      success: false,
      message: "Data payment tidak lengkap."
    });
  }

  const order = {
    id: `PAY-${Date.now()}`,
    name,
    phone,
    email: email || "",
    items,
    total: Number(total),
    notes: notes || "",
    paymentMethod: PAYMENT_PROVIDER === "midtrans" ? "MIDTRANS" : "DANA",
    paymentNumber: DANA_NUMBER,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);

  res.json({
    success: true,
    order,
    payment: buildGatewayResponse(order)
  });
});

app.get("/api/payment/status/:orderId", (req, res) => {
  const orders = loadOrders();
  const order = orders.find((item) => item.id === req.params.orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order tidak ditemukan."
    });
  }

  res.json({
    success: true,
    order,
    payment: buildGatewayResponse(order)
  });
});

app.post("/api/payment/webhook", (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId) {
    return res.status(400).json({
      success: false,
      message: "orderId wajib diisi."
    });
  }

  const orders = loadOrders();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order tidak ditemukan."
    });
  }

  order.status = status === "paid" ? "paid" : "pending";
  order.updatedAt = new Date().toISOString();
  saveOrders(orders);

  res.json({
    success: true,
    message: "Webhook diproses.",
    order
  });
});

app.post("/api/orders/:id/confirm-payment", (req, res) => {
  const { id } = req.params;
  const orders = loadOrders();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order tidak ditemukan."
    });
  }

  order.status = "paid";
  order.confirmedAt = new Date().toISOString();
  saveOrders(orders);

  res.json({
    success: true,
    message: "Pembayaran berhasil dikonfirmasi.",
    order,
    payment: buildGatewayResponse(order)
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Payment provider: ${PAYMENT_PROVIDER}`);
});
