import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      alert("Login success!");
    } catch (err) {
      alert("Email or password incorrect ❌");
    }
  };

  return (
    <div style={{
      display: "flex",
      background: "#f5f7fa",
      justifyContent: "center",
      marginTop: "100px"
    }}>
      <div style={{
        border: "1px solid #ddd",
        background: "#f5f7fa",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center"
      }}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={e => setForm({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <button onClick={handleLogin} style={{ width: "100%" }}>
          Login
        </button>

        <p style={{ marginTop: "10px", textAlign: "right" }}>
          <Link to="/forgot-password" style={{ color: "#3b82f6" }}>
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}