import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://your-app.vercel.app"
}));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/coupons", couponRoutes);

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// schema
const movieSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String
});

const Movie = mongoose.model("Movie", movieSchema);

// API

app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/movies", async (req, res) => {
  const { title, price, description, image } = req.body;

  const movie = new Movie({
    title,
    price,
    description,
    image
  });

  await movie.save();
  res.json(movie);
});

app.delete("/movies/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
});

// 🔥 ต้องอยู่ล่างสุด
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
