import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await axios.post(
        `http://localhost:5000/auth/reset-password/${token}`,
        { password }
      );

      alert("Password updated ✅");
    } catch {
      alert("Token expired ❌");
    }
  };

  return (
    <div style={box}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        onChange={e => setPassword(e.target.value)}
        style={input}
      />

      <button onClick={handleReset} style={btn}>
        Reset Password
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
  background: "#22c55e",
  color: "white"
};