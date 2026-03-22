import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String, // 🔥 id ของ user
  items: Array,   // 🔥 หนังที่ซื้อ
  total: Number,  // 🔥 ราคารวม
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);