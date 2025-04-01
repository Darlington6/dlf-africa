require('dotenv').config(); // Simplified dotenv config
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// Validate critical environment variables first
const requiredEnvVars = ['MONGODB_URI', 'PORT', 'JWT_SECRET'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

const app = express();

// Enhanced CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Security middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Enhanced MongoDB connection with better error handling
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased timeout
      socketTimeoutMS: 45000, // Added socket timeout
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Connection URI used:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@')); // Masked credentials
    process.exit(1);
  }
};

// Route imports
const routes = [
  { path: "/api/auth", router: require("./routes/authRoutes") },
  { path: "/api/courses", router: require("./routes/courseRoutes") },
  { path: "/api/mentorships", router: require("./routes/mentorshipRoutes") },
  { path: "/api/donations", router: require("./routes/donationRoutes") }
];

// Register routes with versioning
routes.forEach(route => {
  app.use(route.path, route.router);
  console.log(`🛣️  Route mounted: ${route.path}`);
});

// Production frontend serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
  console.log('🏗️  Production frontend configured');
}

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";
  
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: isProduction && statusCode === 500 ? 'Internal Server Error' : err.message,
    ...(!isProduction && { stack: err.stack })
  });
});

// Server initialization
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI ? 'Configured' : 'Missing'}`);
      console.log(`🔒 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Missing'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close(false, () => {
          console.log('💤 MongoDB connection closed');
          process.exit(0);
        });
      });
    });
  } catch (err) {
    console.error('💥 Failed to start server:', err);
    process.exit(1);
  }
};

startServer();