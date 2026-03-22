import { Link } from "react-router-dom";

export default function Navbar({ cartCount, user, setUser }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // 🔥 กันค้าง
    setUser(null);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "linear-gradient(90deg, #1e3c72, #2a5298)",
      color: "white",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }}>
      {/* LOGO */}
      <h2 style={{ margin: 0 }}>🎬 Movie Store</h2>

      {/* MENU */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

        <Link to="/" style={linkStyle}>Home</Link>

        <Link to="/cart" style={linkStyle}>
          🛒 Cart ({cartCount})
        </Link>

        <Link to="/profile" style={{ color: "white" }}>
          Profile
        </Link>

        {/* ❌ ยังไม่ login */}
        {!user && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

        {/* ✅ login แล้ว */}
        {user && (
          <>
            <span style={{ fontWeight: "bold" }}>
              👤 {user.username}
            </span>

            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// 🎨 styles
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500"
};

const logoutBtn = {
  padding: "6px 12px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};