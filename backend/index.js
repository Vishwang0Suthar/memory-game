import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user.js"; // Adjust the path as needed
import dotenv from "dotenv";  // Import dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000;
const mongoURI = process.env.VITE_MONGO_URI;  // Access the variable using process.env

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
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
