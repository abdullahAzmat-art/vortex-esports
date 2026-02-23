// models/Bracket.js
import mongoose from "mongoose";

const bracketSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },

  roundNumber: {
    type: Number,
    required: true
  },

  matchIndex: {
    type: Number,
    default: 0
  },

  bracketType: {
    type: String,
    enum: ["winners", "losers", "grand_final"],
    default: "winners"
  },

  teamA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: false,
    default: null
  },

  teamB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: false,
    default: null
  },

  teamAScore: {
    type: String,
    default: "0"
  },

  teamBScore: {
    type: String,
    default: "0"
  },

  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    default: null
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Bracket", bracketSchema);
