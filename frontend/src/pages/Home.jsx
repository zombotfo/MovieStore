import { Link } from "react-router-dom";

export default function Home({ movies, addToCart }) {
  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
    color: "black"
  };
  
  return (
    <div style={{ padding: "40px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" , color: "white"}}>
        🎬 Movie Store
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "25px"
      }}>
        {movies.map(movie => (
          <div key={movie._id} style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            transition: "0.3s",
            cursor: "pointer"
          }}>
            <img
              src={movie.image}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <Link
                to={`/movie/${movie._id}`}
                style={{ textDecoration: "none", color: "#030303" }}
              >
                <h3 style={{ color: "white" }}>
                {movie.title}
                </h3>
              </Link>
              <p style={{ color: "#ccc" }}>{movie.price} $</p>

              <button
                onClick={() => addToCart(movie)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#6c5ce7",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}