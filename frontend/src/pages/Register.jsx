import { useState } from "react";
import axios from "axios";
import API_URL from "../api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    await axios.post(`${API_URL}/auth/register`, form);
    alert("Registered!");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }}>
      <div style={{
       background: "white",
        padding: "40px",
        borderRadius: "15px",
        width: "320px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{ color: "black" }}>Register</h2>

        <input placeholder="Username"
          style={{ width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
             border: "1px solid #ccc" }}
          onChange={e => setForm({...form, username: e.target.value})} />

        <input placeholder="Email"
          style={{ width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
             border: "1px solid #ccc" }}
          onChange={e => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password"
          style={{ width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
             border: "1px solid #ccc" }}
          onChange={e => setForm({...form, password: e.target.value})} />

        <button onClick={handleSubmit} style={{ width: "100%",
          padding: "10px",
          background: "#6c5ce7",
          color: "white",
          border: "none",
          borderRadius: "8px" }}>
          Register
        </button>
      </div>
    </div>
  );
}