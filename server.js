const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "orders.json");
const DANA_NUMBER = "089516353968";

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

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend NEXA running",
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
    paymentMethod: "DANA",
    paymentNumber: DANA_NUMBER,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const orders = loadOrders();
  orders.push(newOrder);
  saveOrders(orders);

  res.status(201).json({
    success: true,
    message: "Pesanan berhasil dibuat. Silakan transfer ke nomor DANA berikut.",
    order: newOrder,
    payment: {
      method: "DANA",
      number: DANA_NUMBER,
      total: Number(total),
      instruction: "Transfer sesuai total yang tertera, lalu konfirmasi pembayaran."
    }
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
    order
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
