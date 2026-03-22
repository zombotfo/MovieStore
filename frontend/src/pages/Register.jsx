import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/auth/register", form);
    alert("Registered!");
  };

  return (
    <div style={{
      background: "#f5f7fa",
      display: "flex",
      justifyContent: "center",
      marginTop: "100px"
    }}>
      <div style={{
        border: "1px solid #ffffff",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center"
      }}>
        <h2>Register</h2>

        <input placeholder="Username"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={e => setForm({...form, username: e.target.value})} />

        <input placeholder="Email"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={e => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={e => setForm({...form, password: e.target.value})} />

        <button onClick={handleSubmit} style={{ width: "100%" }}>
          Register
        </button>
      </div>
    </div>
  );
}