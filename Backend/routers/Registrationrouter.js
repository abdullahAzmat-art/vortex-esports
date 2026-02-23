import e from "express";
import { addtheteam, deleteRegistration, getRegistrationsByTournament, getSingleRegistration, sendemailforverfication } from "../Controllers/Registrationcontroller.js";

import { parser } from "../utility/cloudinary.js";

let Registrationroute = e.Router()

// Multer error handling middleware
const handleMulterError = (req, res, next) => {
    const upload = parser.single("paymentProof");

    upload(req, res, (err) => {
        if (err) {
            console.error("Multer/Cloudinary error on registration:", err.message);
            return res.status(500).json({
                success: false,
                message: "Payment proof upload failed. Please check Cloudinary configuration.",
                error: err.message
            });
        }
        next();
    });
};

Registrationroute.post("/addteam", handleMulterError, addtheteam)

Registrationroute.get("/getteam", getRegistrationsByTournament)


Registrationroute.get("/getteam/:id", getSingleRegistration)


Registrationroute.get("/sendemail/:id", sendemailforverfication)

Registrationroute.delete("/registration/:id", deleteRegistration)

export default Registrationroute