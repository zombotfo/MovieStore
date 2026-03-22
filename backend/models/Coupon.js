import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: String,
  discount: Number // เช่น 0.1 หรือ 50
});

export default mongoose.model("Coupon", couponSchema);