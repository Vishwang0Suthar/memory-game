import mongoose from "mongoose";

const userClickSchema = new mongoose.Schema({
    name: { type: String, required: true },
    clickCount: { type: Number, required: true },
    savedAt: { type: Date, default: Date.now }, // Automatically sets the save time
});

const UserClick = mongoose.model("UserClick", userClickSchema);

export default UserClick;
