import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [movies, setMovies] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  // ✅ ดึง token
  const token = localStorage.getItem("token");

  // 🔒 config axios (ใส่ header ทุกครั้ง)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // 🔥 เพิ่มหนัง
  const addMovie = async () => {
    try {
      await axios.post(`${API_URL}/movies`, {
        title,
        price,
        image,
        description
      }, config);

      alert("Movie added!");
      window.location.reload();
    } catch (err) {
      alert("Access denied ❌");
    }
  };

  // 🔥 สร้างคูปอง
  const createCoupon = async () => {
    try {
      await axios.post(`${API_URL}/coupons`, {
        code,
        discount
      }, config);

      alert("Coupon created!");
    } catch (err) {
      alert("Access denied ❌");
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/movies/${id}`, config);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (err) {
      alert("Access denied ❌");
    }
  };

  useEffect(() => {
    // 🔒 เช็คสิทธิ์ก่อนเข้า admin
    axios.get(`${API_URL}/auth/admin`, config)
      .then(() => {
        // ✅ ถ้าผ่าน → โหลดข้อมูล
        axios.get(`${API_URL}/movies`, config)
          .then(res => setMovies(res.data));

        axios.get(`${API_URL}/orders`, config)
          .then(res => setOrders(res.data));
      })
      .catch(() => {
        alert("คุณไม่มีสิทธิ์เข้า Admin ❌");
        window.location.href = "/"; // เด้งกลับหน้า home
      });

  }, []);

  return (
    <div style={{ padding: "200px", background: "#f5f7fa" }}>
      <h1>Admin Dashboard</h1>

      <h2>Add Movie</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImage(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />

      <br /><br />
      <button onClick={addMovie}>Add Movie</button>

      <hr />

      <h2>All Movies</h2>
      {movies.map(movie => (
        <div key={movie._id} style={{ marginBottom: "10px", color: "black" }}>
          {movie.title} - ${movie.price}

          <button
            onClick={() => deleteMovie(movie._id)}
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <hr />

      <h2>Create Coupon</h2>
      <input placeholder="Code" onChange={e => setCode(e.target.value)} />
      <input placeholder="Discount" onChange={e => setDiscount(e.target.value)} />

      <br /><br />
      <button onClick={createCoupon}>Create Coupon</button>

      <hr />

      <h2>Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "black" }}>User: {order.userId}</h3>
          <p style={{ color: "black" }}>Total: ${order.total}</p>

          {order.items.map((item, i) => (
            <div style={{ color: "black" }} key={i}>
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}