import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
googleId: { type: String },
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String }, // optional for Google users
picture: { type: String },
role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });


export default mongoose.model("User", userSchema);