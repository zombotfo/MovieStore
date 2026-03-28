import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpire: Date,
  age: Number,
  loginAttempts: {
  type: Number,
  default: 0
},
lockUntil: {
  type: Date
}
});

export default mongoose.model("User", userSchema);