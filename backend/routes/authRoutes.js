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

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // ✅ เช็คว่าถูกล็อกอยู่ไหม
  if (user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(403).json({
      message: "บัญชีถูกล็อก กรุณาลองใหม่ในอีก 5 นาที"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // ❌ ถ้ารหัสผิด
  if (!isMatch) {
    user.loginAttempts += 1;

    // 🔒 ครบ 3 ครั้ง → ล็อก
    if (user.loginAttempts >= 3) {
      user.lockUntil = Date.now() + 5 * 60 * 1000; // 5 นาที
      user.loginAttempts = 0; // reset
    }

    await user.save();

    return res.status(400).json({
      message: "Email or password incorrect"
    });
  }

  // ✅ login สำเร็จ → reset
  user.loginAttempts = 0;
  user.lockUntil = null;
  await user.save();

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

router.get("/admin", async (req, res) => {
  console.log("🔥 ADMIN ROUTE HIT");

  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("TOKEN:", token); // 👈 เพิ่มอันนี้

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // 👈 เพิ่ม

    const user = await User.findById(decoded.id);

    console.log("EMAIL DB:", user?.email); // 👈 เพิ่ม

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email.trim().toLowerCase() !== "admin@gmail.com") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ message: "Welcome admin 🔥" });

  } catch (err) {
    console.log("ERROR:", err.message); // 👈 สำคัญ
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;