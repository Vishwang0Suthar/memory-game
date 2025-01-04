import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user.js"; // Adjust the path as needed
// import mongoURI from meta.env.VITE_MONGO_URI;

const app = express();
const PORT = 5000;
// const mongoURI = import.meta.env.VITE_MONGO_URI;

// Middleware
app.use(cors({
    origin: "https://memory-game-flax-six.vercel.app/", // Allow Vercel frontend to access the backend
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
