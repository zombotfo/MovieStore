import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail({ addToCart }) {
  const { id } = useParams(); // ✅ ดึง id จาก URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/movies`)
      .then(res => {
        // ✅ หา movie ตาม id
        const found = res.data.find(m => m._id === id);
        setMovie(found);
      });
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" ,background: "#f5f7fa"}}>
      <h1 style={{color: "black"}}>{movie.title}</h1>

      <img src={movie.image} width="300" />

      <p style={{color: "black"}}>{movie.description}</p>
      <h3 style={{color: "black"}}>${movie.price}</h3>

      <button onClick={() => addToCart(movie)}>
        Add to Cart
      </button>
    </div>
  );
}