import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail({ addToCart }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/movies")
      .then(res => {
        const found = res.data.find(m => m._id === id);
        setMovie(found);
      });
  }, [id]);

  if (!movie) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px"
    }}>
      
      <div style={{
        display: "flex",
        gap: "40px",
        background: "rgba(255,255,255,0.05)",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        maxWidth: "900px",
        width: "100%"
      }}>

        {/* 🎬 รูป */}
        <img
          src={movie.image}
          alt={movie.title}
          style={{
            width: "300px",
            borderRadius: "15px",
            objectFit: "cover"
          }}
        />

        {/* 📄 ข้อมูล */}
        <div style={{ color: "white" }}>
          <h1 style={{ marginBottom: "10px" }}>{movie.title}</h1>

          <p style={{
            color: "#ccc",
            lineHeight: "1.6",
            marginBottom: "20px"
          }}>
            {movie.description}
          </p>

          <h2 style={{ marginBottom: "20px", color: "#6c5ce7" }}>
            ${movie.price}
          </h2>

          <button
            onClick={() => addToCart(movie)}
            style={{
              padding: "12px 20px",
              background: "#6c5ce7",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🛒 Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}