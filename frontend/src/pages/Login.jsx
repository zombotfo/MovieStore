import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:5000/auth/login", form);

    localStorage.setItem("token", res.data.token);
    console.log("LOGIN TOKEN:", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);

    alert("Login success!");
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    alert(message);
  }
  setLoading(false);
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
        <h2>Login</h2>

        <input
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
             border: "1px solid #ccc"
          }}
          onChange={e => setForm({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
           }}
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <button 
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: loading ? "gray" : "#6c5ce7",
            color: "white",
            border: "none",
            borderRadius: "8px"
          }}
>
          {loading ? "Loading..." : "Login"}
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