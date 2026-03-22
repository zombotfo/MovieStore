import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpire: Date,
  age: Number
});

export default mongoose.model("User", userSchema);