import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { mongooseconnection } from "./mongodbconnection/monogodbconnection.js";


let app = express();

dotenv.config();
mongooseconnection();

app.use(express.json())
app.use(cors())  




let port  = process.env.PORT ||7700
app.listen(port   , ()=>{
    console.log(`server is running on port ${port}`.bgBlue);
})