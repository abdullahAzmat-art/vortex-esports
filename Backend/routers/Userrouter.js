import e from "express";
import { deleteuser, getaluser, getuserbyid, googlecontroller, logincontroller, updateuser, usercontroller } from "../Controllers/Usercontroller.js";
let userrouter = e.Router();

userrouter.post("/register", usercontroller);

userrouter.post("/login", logincontroller);

userrouter.post("/google" , googlecontroller)

userrouter.get("/getuser" , getaluser)
userrouter.get("/getuser/:id" , getuserbyid)

userrouter.delete("/deleteuser/:id" , deleteuser )

userrouter.put("/updateuser/:id" ,updateuser )
export default userrouter;