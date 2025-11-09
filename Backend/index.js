import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { mongooseconnection } from "./mongodbconnection/monogodbconnection.js";
import userrouter from "./routers/Userrouter.js";
import router from "./routers/Touranamentroute.js";
import announcement from "./routers/Announcemetrouter.js";


let app = express();

dotenv.config();
mongooseconnection();

app.use(express.json())

app.use(cors())  
   
app.use( "/api/v1" ,userrouter)
app.use( "/api/v1" ,router)
app.use( "/api/v1" ,announcement)
app.use("/uploads", express.static("uploads"));


let port  = process.env.PORT ||7700
app.listen(port   , ()=>{
    console.log(`server is running on port ${port}`.bgBlue);
})