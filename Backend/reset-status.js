import mongoose from 'mongoose';
import Registrations from './models/Registrations.js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from the current directory
dotenv.config();

async function resetRegistrations() {
    try {
        const mongoUri = process.env.mongoconnect || "mongodb://localhost:27017/vortx";
        console.log("Connecting to:", mongoUri);

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");

        const result = await Registrations.updateMany(
            { paymentStatus: "verified" },
            { $set: { paymentStatus: "pending" } }
        );

        console.log(`Successfully reset ${result.modifiedCount} registrations back to 'pending'.`);
        console.log("You can now test the 'Send Email' button from a clean state.");

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Reset failed:", error);
        process.exit(1);
    }
}

resetRegistrations();
