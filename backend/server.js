const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use("/api", middlewares);
app.use("/api", router);
// server.js

app.get('/api/dashboard/stats', (req, res) => {
  const db = router.db; // Truy cập JSON Server database

  // Tính tổng sản phẩm, người dùng và đơn hàng
  const productCount = db.get('products').value().length;
  const userCount = db.get('users').value().length;
  const orderCount = db.get('orders').value().length;

  // Tính tổng doanh thu từ các đơn hàng
  const totalRevenue = db.get('orders')
    .value()
    .reduce((sum, order) => sum + order.total, 0);

  res.json({ totalRevenue, productCount, userCount, orderCount });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
