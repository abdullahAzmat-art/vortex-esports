import multer from "multer";
import  Tournamentmodel  from "../models/Tournamentmodel.js";

// ✅ CREATE Tournament

const storagefun = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // specify the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // specify the file name
  }
});
const filefilterfun = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')   {
    cb(null, true); // accept file  
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false); // reject file
  }
}
export const multerset = multer({
  storage: storagefun , 
  fileFilter: filefilterfun
})
export const postthetournament = async (req, res) => {
  try {
    const { title, game, description, tournamentdate, entryFee, prizePool, maxTeams, maxMember  , LinkstoLive } = req.body;
  let picture = null;
    if (req.file) {
      picture = req.file.filename; // save only filename
    }

    // Validate required fields
    const inputFields = ["title", "game", "description", "tournamentdate", "entryFee", "LinkstoLive" ,"prizePool", "maxTeams", "maxMember"];
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
      maxMember ,
      picture ,
      LinkstoLive
    });

    res.status(201).json({
      message: "Tournament created successfully ✅",
      tournament
    });
  } catch (err) {
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
