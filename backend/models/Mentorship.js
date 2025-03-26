const mongoose = require("mongoose");

const MentorshipSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Mentorship", MentorshipSchema);
