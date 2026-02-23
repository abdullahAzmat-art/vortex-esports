import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Registrations from "./models/Registrations.js";
import Tournamentmodel from "./models/Tournamentmodel.js";

const PLAYER_COUNT = 32; // change to 48 to test 3 pools etc.

const gamingNames = [
    "PhantomX", "NightStalker", "IronCore", "BladeRunner", "FireHawk",
    "StormBreaker", "DarkRaven", "GhostShot", "NeonFang", "CyberPulse",
    "ArcLight", "ShadowStep", "ThunderClad", "VoidWalker", "CrimsonTide",
    "FrostByte", "EmberKing", "SteelGhost", "AzureBlast", "Noxfire",
    "OmegaStrike", "QuantumBolt", "RaptorEdge", "SilentBlade", "TitanFall",
    "VenomSlash", "XtremeSnipe", "YieldBreaker", "ZeroKelvin", "AbyssalKing",
    "BoltStrike", "CosmicFury", "DeltaForce", "EclipsePro", "FalconRift",
    "GalacticOne", "HorizonMark", "IceDagger", "JetBlack", "KineticWave",
    "LunarBeast", "MidnightRush", "NebulaBit", "OrbitalKick", "PlasmaBurn",
];

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Multan", "Faisalabad", "Quetta"];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.mongoconnect, { serverSelectionTimeoutMS: 8000 });
        console.log("Connected!");

        // Get the first tournament to attach registrations to
        const tournament = await Tournamentmodel.findOne();
        if (!tournament) {
            console.error("❌ No tournament found in DB. Please create a tournament first.");
            process.exit(1);
        }
        console.log(`✅ Using tournament: "${tournament.title}" (${tournament._id})`);

        // Remove previously seeded dummy registrations for this tournament
        const deleted = await Registrations.deleteMany({
            tournamentId: tournament._id,
            email: /@seed\.test$/
        });
        if (deleted.deletedCount > 0) {
            console.log(`🗑️  Removed ${deleted.deletedCount} old seed entries`);
        }

        // Build entries
        const entries = [];
        for (let i = 0; i < PLAYER_COUNT; i++) {
            entries.push({
                fullName: `Seed Player ${i + 1}`,
                gamingName: gamingNames[i % gamingNames.length] + (i >= gamingNames.length ? `_${Math.floor(i / gamingNames.length)}` : ""),
                email: `player${i + 1}@seed.test`,
                city: cities[i % cities.length],
                tournamentId: tournament._id,
                paymentProof: "https://placehold.co/400x300?text=PaymentProof",
                paymentStatus: "verified",
            });
        }

        await Registrations.insertMany(entries);
        console.log(`\n🎉 Successfully seeded ${PLAYER_COUNT} verified players for "${tournament.title}"!`);
        console.log(`   → Expected pools: ${Math.ceil(PLAYER_COUNT / 16)} pool(s) of 16`);

    } catch (err) {
        console.error("Seed error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seed();
