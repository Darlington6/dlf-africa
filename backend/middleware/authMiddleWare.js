const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // Get token from header (support both 'Authorization' and 'authorization')
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.header("Authorization")?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Authorization denied. No token provided.",
      code: "NO_TOKEN"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists with caching
    const user = await User.findById(decoded.id).select('-password').cache({ key: decoded.id });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    // Enhanced error handling
    const errorResponse = {
      success: false,
      message: "Authentication failed",
      code: "AUTH_ERROR"
    };

    if (err.name === 'TokenExpiredError') {
      errorResponse.message = "Session expired. Please log in again.";
      errorResponse.code = "TOKEN_EXPIRED";
      return res.status(401).json(errorResponse);
    }
    
    if (err.name === 'JsonWebTokenError') {
      errorResponse.message = "Invalid token";
      errorResponse.code = "INVALID_TOKEN";
      return res.status(401).json(errorResponse);
    }

    console.error('[AUTH] Error:', err.message);
    errorResponse.message = "Server error during authentication";
    res.status(500).json(errorResponse);
  }
};

// Role-based access control
const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: `Access restricted to: ${roles.join(', ')}`,
        code: "ACCESS_DENIED"
      });
    }
    next();
  };
};

// Admin check middleware (uses roleMiddleware)
authMiddleware.adminCheck = roleMiddleware('admin');

// Mentor check middleware
authMiddleware.mentorCheck = roleMiddleware('mentor', 'admin');

module.exports = authMiddleware;