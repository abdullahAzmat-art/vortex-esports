// models/Tournament.js
import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  game: { type: String, required: true },
  maxTeams: { type: String, required: true }, 
  maxMember: { type: String, required: true }, 
  description: { type: String },
  entryFee: { type: Number, required: true },
  prizePool: { type: String },
  tournamentdate: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["upcoming", "ongoing", "completed"],  
    default: "upcoming" 
  },
picture: { type: String }, // image URL or file path
LinkstoLive: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Tournament", tournamentSchema);
