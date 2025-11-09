import mongoose from "mongoose";

let announcementSchema = new mongoose.Schema({
  title: {
    type: String,}}
 , { timestamps: true }
);

export const Announcementmodel = mongoose.model("Announcement", announcementSchema);