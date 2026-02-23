import mongoose from "mongoose";
import colors from "colors"
export let mongooseconnection = async () => {
    try {
        console.log(`Connecting to MongoDB at ${process.env.mongoconnect}...`.bgYellow);
        await mongoose.connect(process.env.mongoconnect, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("mongodb connected".bgGreen)

    } catch (error) {
        console.log(`Error: ${error.message}`.bgRed);
        process.exit(1);
    }
}