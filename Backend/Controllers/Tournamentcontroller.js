import multer from "multer";
import Tournamentmodel from "../models/Tournamentmodel.js";

// ✅ CREATE Tournament


export const postthetournament = async (req, res) => {
  try {
    const picture = req.file?.path || null;

    const { title, game, description, tournamentdate, entryFee, prizePool, maxTeams, maxMember, LinkstoLive } = req.body;

    // Validate required fields
    const inputFields = ["title", "game", "description", "tournamentdate", "entryFee", "LinkstoLive", "prizePool", "maxTeams", "maxMember"];
    for (let field of inputFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const tournament = await Tournamentmodel.create({
      title,
      game,
      description,
      tournamentdate,
      entryFee,
      prizePool,
      maxTeams,
      maxMember,
      picture,
      LinkstoLive
    });
    res.status(201).json({
      message: "Tournament created successfully ✅",
      tournament: tournament.toObject()
    });


  } catch (err) {
    console.error("=== ERROR CAUGHT ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ message: err.message });
  }
};

// 📖 READ all tournaments
export const getalltournaments = async (req, res) => {
  try {
    const tournaments = await Tournamentmodel.find();
    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 READ single tournament
export const gettournamentById = async (req, res) => {
  try {
    const tournament = await Tournamentmodel.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found ❌" });
    }
    res.status(200).json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE Tournament
export const updatetournament = async (req, res) => {
  try {
    const tournament = await Tournamentmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found ❌" });
    }
    res.status(200).json({
      message: "Tournament updated successfully ✅",
      tournament
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE Tournament
export const deletetournament = async (req, res) => {
  try {
    const tournament = await Tournamentmodel.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found ❌" });
    }
    res.status(200).json({ message: "Tournament deleted successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
