import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();



// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashed
  });

  await user.save();

  res.json({ message: "User created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token, user });
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // 🔥 สร้าง token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 1000 * 60 * 10; // 10 นาที

  await user.save();

  // 🔥 ลิงก์ reset (frontend)
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  console.log("RESET LINK:", resetLink); // 👉 จำลองส่ง email

  res.json({ message: "Reset link sent (check console)" });
});

router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Token invalid or expired" });
  }

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.json({ message: "Password updated" });
});

router.put("/profile", async (req, res) => {
  try {
    const { id, username, age } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, age },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;