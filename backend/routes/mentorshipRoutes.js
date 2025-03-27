const express = require("express");
const Mentorship = require("../models/Mentorship");
const { protect } = require("./middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Apply auth middleware to protect all mentorship routes
router.use(protect);

// Validation rules for mentorship request
const mentorshipRequestValidation = [
  check("mentorId")
    .notEmpty()
    .withMessage("Mentor ID is required")
    .isMongoId()
    .withMessage("Invalid Mentor ID format")
];

router.post("/request", mentorshipRequestValidation, async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed"
    });
  }

  const { mentorId } = req.body;

  try {
    // Prevent self-mentorship
    if (mentorId === req.user.id) {
      return res.status(400).json({ 
        success: false,
        message: "Cannot send mentorship request to yourself" 
      });
    }

    // Check if request already exists
    const existingRequest = await Mentorship.findOne({
      mentor: mentorId,
      mentee: req.user.id,
      status: { $in: ["pending", "accepted"] } // Check both pending and accepted statuses
    });

    if (existingRequest) {
      return res.status(400).json({ 
        success: false,
        message: existingRequest.status === "pending" 
          ? "Mentorship request already sent" 
          : "Mentorship already established"
      });
    }

    const mentorship = new Mentorship({ 
      mentor: mentorId, 
      mentee: req.user.id,
      status: "pending",
      requestedAt: new Date()
    });

    await mentorship.save();

    res.status(201).json({ 
      success: true,
      message: "Mentorship request sent successfully",
      data: mentorship
    });
  } catch (error) {
    console.error("Mentorship error:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Server Error",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
});

module.exports = router;