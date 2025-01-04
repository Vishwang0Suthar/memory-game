import express from "express";
import UserClick from "../mongo/user.js"; // Adjust the path as needed

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Route to save user click data
router.post("/save-click", async (req, res) => {
    const { name, clickCount } = req.body;

    if (!name || typeof clickCount !== "number") {
        return res.status(400).json({ success: false, message: "Name and click count are required" });
    }

    try {
        const newClick = new UserClick({ name, clickCount });
        await newClick.save();

        res.json({ success: true, message: "Data saved successfully", data: newClick });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
