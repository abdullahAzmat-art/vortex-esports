import express from "express";
import { deletetournament, getalltournaments, gettournamentById, postthetournament, updatetournament } from "../Controllers/Tournamentcontroller.js";
import { parser } from "../utility/cloudinary.js";


const router = express.Router();

// Create Tournament
router.post("/createTournament", parser.single("picture") , postthetournament);

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
