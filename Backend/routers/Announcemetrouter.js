import e from "express";
import { Createannouncement, Deleteannouncement, Getannouncements } from "../Controllers/Announcementcontroller.js";
let announcement = e.Router();

announcement.post("/createacc" , Createannouncement);

announcement.get("/getacc" , Getannouncements);

announcement.delete("/deleteacc/:id" , Deleteannouncement);
export default announcement;