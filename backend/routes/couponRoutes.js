import express from "express";
import Coupon from "../models/Coupon.js";

const router = express.Router();

// สร้างคูปอง (admin)
router.post("/", async (req, res) => {
  const { code, discount } = req.body;

  const coupon = new Coupon({ code, discount });
  await coupon.save();

  res.json({ message: "Coupon created" });
});

// ใช้คูปอง
router.get("/:code", async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code });

  if (!coupon) return res.status(404).json({ message: "Invalid coupon" });

  res.json(coupon);
});

export default router;