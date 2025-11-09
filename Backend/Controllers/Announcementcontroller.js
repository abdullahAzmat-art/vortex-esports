import { Announcementmodel } from "../models/announcement.js";

export let Createannouncement = async (req, res) => {
    try {
    const announcement = new Announcementmodel(req.body);
    await announcement.save();
    res.status(201).json({
      message: "Announcement created successfully ✅",
      announcement
    });
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export let Getannouncements = async (req, res) => {
    try {
    const announcements = await Announcementmodel.find();
    res.status(200).json(announcements);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export let Deleteannouncement = async (req, res) => {
    try {
    const announcement = await Announcementmodel.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found ❌" });
    }
    res.status(200).json({ message: "Announcement deleted successfully ✅" });
    } catch (err) {
    res.status(500).json({ message: err.message }); 
    }
}
