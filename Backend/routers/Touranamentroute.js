import express from "express";
import { deletetournament, getalltournaments, gettournamentById, postthetournament, updatetournament } from "../Controllers/Tournamentcontroller.js";
import { parser } from "../utility/cloudinary.js";


const router = express.Router();

// Multer error handling middleware
const handleMulterError = (req, res, next) => {
    const upload = parser.single("picture");

    upload(req, res, (err) => {
        if (err) {
            console.error("Multer/Cloudinary error:", err.message);
            return res.status(500).json({
                message: "Image upload failed. Please check Cloudinary configuration.",
                error: err.message
            });
        }
        next();
    });
};

// Create Tournament
router.post("/createTournament", handleMulterError, postthetournament);

// Get All Tournaments
router.get("/getTournament", getalltournaments);

// Get Single Tournament
router.get("/getTournament/:id", gettournamentById);

// Update Tournament
router.put("/putTournament/:id", updatetournament);

// Delete Tournament
router.delete("/deleteTournament/:id", deletetournament
);

export default router;
