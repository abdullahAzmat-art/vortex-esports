// controllers/registrationController.js
import Registrations from "../models/Registrations.js";
import Tournamentmodel from "../models/Tournamentmodel.js";
import { sendPaymentVerificationEmail } from "../utility/emailconfig.js";

export const addtheteam = async (req, res) => {
  try {


    const {
      fullName,
      city,
      gamingName,
      email,
      tournamentId
    } = req.body;

    const paymentProof = req.file?.path || null;

    console.log(paymentProof);

    if (!fullName || !city || !gamingName || !email || !tournamentId || !paymentProof) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const tournament = await Tournamentmodel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found"
      });
    }

    const alreadyRegistered = await Registrations.findOne({
      email,
      tournamentId
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "Player already registered in this tournament"
      });
    }

    // 4️⃣ Save registration
    const registration = await Registrations.create({
      fullName,
      city,
      gamingName,
      email,
      tournamentId,
      paymentProof
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. Waiting for payment verification.",
      data: registration
    });
    console.log(registration)

  } catch (error) {
    console.error("=== REGISTRATION ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


export const getRegistrationsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.query; // Changed from req.params to req.query

    if (!tournamentId) {
      return res.status(400).json({
        success: false,
        message: "Tournament ID is required"
      });
    }

    const registrations = await Registrations.find({ tournamentId }).populate("tournamentId");

    res.status(200).json({
      success: true,
      data: registrations
    });

  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getSingleRegistration = async (req, res) => {
  try {
    const registration = await Registrations.findById(req.params.id).populate("tournamentId");

    if (!registration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      data: registration
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const sendemailforverfication = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registrations.findById(id).populate("tournamentId");
    if (!registration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    registration.paymentStatus = "verified";
    await registration.save();
    await sendPaymentVerificationEmail(registration)

    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registrations.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully"
    });
  } catch (error) {
    console.error("Delete registration error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
