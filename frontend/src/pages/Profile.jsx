import { useState } from "react";
import axios from "axios";
import API_URL from "../api";

export default function Profile({ user, setUser }) {
  const [username, setUsername] = useState(user?.username || "");
  const [age, setAge] = useState(user?.age || "");

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_URL}/auth/profile`, {
        id: user._id,
        username,
        age
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Updated successfully ✅");
    } catch {
      alert("Update failed ❌");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      color: "black"
    }}>
      <h2>Edit Profile</h2>

      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        style={inputStyle}
      />

      <input
        value={age}
        onChange={e => setAge(e.target.value)}
        placeholder="Age"
        style={inputStyle}
      />

      <button onClick={handleUpdate} style={btn}>
        Save
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px"
};