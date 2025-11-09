// models/Registration.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
 fullName: { type: String, required: true },
  city: { type: String, required: true },
   gamingName: { type: String, required: true },
    email: { type: String, required: true }, // image file path or URL
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
  paymentProof: { type: String, required: true }, // image URL or file path
  paymentStatus: { 
    type: String, 
    enum: ["pending", "verified", "rejected"], 
    default: "pending" 
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Registration", registrationSchema);
