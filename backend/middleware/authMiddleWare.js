const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure path is correct

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization")?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Authorization denied. No token provided." 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    // Handle different error types specifically
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Session expired. Please log in again." 
      });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }

    console.error('Authentication error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error during authentication" 
    });
  }
};

// Optional: Admin check middleware (can be added as separate middleware)
authMiddleware.adminCheck = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }
  next();
};

module.exports = authMiddleware;