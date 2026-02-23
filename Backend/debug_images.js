import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tournament from './models/Tournamentmodel.js';

dotenv.config();

// Debug: Print environment variables
console.log("MONGODB_URL:", process.env.MONGODB_URL);
console.log("mongoconnect:", process.env.mongoconnect);

const connectDB = async () => {
    try {
        // Use the variable name from .env (mongoconnect)
        const dbUrl = process.env.mongoconnect || process.env.MONGODB_URL;

        if (!dbUrl) {
            throw new Error("MongoDB connection string not found in environment variables.");
        }

        await mongoose.connect(dbUrl);
        console.log('MongoDB Connected');

        const tournaments = await Tournament.find({}, 'title picture');
        console.log('Tournaments Image Paths:');
        tournaments.forEach(t => {
            console.log(`Title: ${t.title}, Picture: ${t.picture}`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
