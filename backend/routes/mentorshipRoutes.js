const express = require("express");
const Mentorship = require("../models/Mentorship");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/request", authMiddleware, async (req, res) => {
  const { mentorId } = req.body;

  try {
    const mentorship = new Mentorship({ mentor: mentorId, mentee: req.user.id });
    await mentorship.save();

    res.json({ message: "Mentorship request sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
