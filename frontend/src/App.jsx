import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import './App.css'  // ✅ เช็คว่ามี import นี้ไหม?
import './index.css' // อันนี้อยู่ใน main.jsx แล้ว ไม่ต้องซ้ำ

function App() {
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/movies`)
      .then(res => setMovies(res.data));
  }, []);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const clearCart = () => {
    setCart([]);
  };
  const addToCart = (movie) => {
    setCart([...cart, movie]);
  };
  const removeFromCart = (index) => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  setCart(newCart);
  };

  return (
    <div>
      <Navbar cartCount={cart.length} user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={<Home movies={movies} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={<MovieDetail addToCart={addToCart} />}
        />
        <Route 
          path="/login"
          element={<Login setUser={setUser} />}
        />
        <Route
          path="/register" element={<Register />}
        />
        <Route path="/admin" element={<Admin />} />

        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

    </div>
  );
}

export default App;
