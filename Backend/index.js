import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { mongooseconnection } from "./mongodbconnection/monogodbconnection.js";
import userrouter from "./routers/Userrouter.js";
import router from "./routers/Touranamentroute.js";
import announcement from "./routers/Announcemetrouter.js";
import Registrationroute from "./routers/Registrationrouter.js";
import Bracketsroute from "./routers/Bracketsmodel.js";


let app = express();

dotenv.config();
app.use(express.json())

app.use(cors())

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/v1", userrouter)
app.use("/api/v1", router)
app.use("/api/v1", announcement)
app.use("/api/v1", Registrationroute)
app.use("/api/v1", Bracketsroute)
app.use("/uploads", express.static("uploads"));

mongooseconnection().then(() => {
    let port = process.env.PORT || 7700
    app.listen(port, () => {
        console.log(`server is running on port ${port}`.bgBlue);
    })
});