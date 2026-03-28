import { useState } from "react";
import axios from "axios";
import API_URL from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      alert("Check console for reset link 🔥");
    } catch {
      alert("User not found ❌");
    }
  };

  return (
    <div style={box}>
      <h2 style={{ color: "black" }}>Forgot Password</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        style={input}
      />

      <button onClick={handleSubmit} style={btn}>
        Send Reset Link
      </button>
    </div>
  );
}

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "400px",
  margin: "50px auto",
  color: "black"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#3b82f6",
  color: "white"
};