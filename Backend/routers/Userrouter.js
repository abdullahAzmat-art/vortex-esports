import e from "express";
import { logincontroller, usercontroller } from "../Controllers/Usercontroller.js";
let userrouter = e.Router();

userrouter.post("/register", usercontroller);

userrouter.post("/login", logincontroller);
export default userrouter;