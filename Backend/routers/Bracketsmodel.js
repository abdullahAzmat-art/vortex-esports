import express from "express";
import { CreateBrackets, Gettherounded, updateMatchWinner, GetAllBrackets } from "../Controllers/Bracketscontroller.js";

let Bracketsroute = express.Router();


Bracketsroute.post("/createbrackets/:tournamentId", CreateBrackets)

Bracketsroute.get("/getbrackets/:tournamentid/:roundno", Gettherounded)

Bracketsroute.patch("/brackets/:matchId/winner", updateMatchWinner)

Bracketsroute.get("/getallbrackets/:tournamentId", GetAllBrackets)

export default Bracketsroute 