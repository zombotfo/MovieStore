import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  // 🎬 state เพิ่มหนัง
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [movies, setMovies] = useState([]);

  // 🎟️ state คูปอง
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  // 🔥 เพิ่มหนัง
  const addMovie = async () => {
    await axios.post("http://localhost:5000/movies", {
      title,
      price,
      image,
      description
    });

    alert("Movie added!");
    window.location.reload(); // 🔥 รีเฟรชให้ Home อัปเดต
  };

  // 🔥 สร้างคูปอง
  const createCoupon = async () => {
    await axios.post("http://localhost:5000/coupons", {
      code,
      discount
    });

    alert("Coupon created!");
  };

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:5000/movies/${id}`);

    // อัปเดตหน้าทันที
    setMovies(movies.filter(movie => movie._id !== id));
  };


  useEffect(() => {
  axios.get("http://localhost:5000/movies")
    .then(res => setMovies(res.data));

  axios.get("http://localhost:5000/orders")
    .then(res => setOrders(res.data));
  }, []);

  return (
  <div style={{ padding: "200px" ,background: "#f5f7fa"}}>
    <h1>Admin Dashboard</h1>

    {/* 🎬 เพิ่มหนัง */}
    <h2>Add Movie</h2>
    <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
    <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
    <input placeholder="Image URL" onChange={e => setImage(e.target.value)} />
    <input placeholder="Description" onChange={e => setDescription(e.target.value)} />

    <br /><br />

    <button onClick={addMovie}>Add Movie</button>

    <hr />

    {/* 🔥 แสดงหนัง + ลบ */}
    <h2>All Movies</h2>

    {movies.map(movie => (
      <div key={movie._id} style={{ marginBottom: "10px" ,color: "Black"}}>
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

    {/* 🎟️ คูปอง */}
    <h2>Create Coupon</h2>

    <input placeholder="Code" onChange={e => setCode(e.target.value)} />
    <input placeholder="Discount" onChange={e => setDiscount(e.target.value)} />

    <br /><br />
    <button onClick={createCoupon}>Create Coupon</button>

    <hr />

    {/* 🧾 Orders */}
    <h2>Orders</h2>

    {orders.map(order => (
      <div key={order._id} style={{ marginBottom: "20px" }}>
        <h3 style={{color: "Black"}}>User: {order.userId}</h3>
        <p style={{color: "Black"}}>Total: ${order.total}</p>

        {order.items.map((item, i) => (
          <div style={{color: "Black"}} key={i}>
            {item.title}
          </div>
        ))}
      </div>
    ))}
  </div>
);
}