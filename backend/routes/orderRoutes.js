import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 🔥 CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const order = new Order({
      userId,
      items,
      total
    });

    await order.save();

    res.json({ message: "Order saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 GET ALL (admin ใช้ดู)
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

export default router;