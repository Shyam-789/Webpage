
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Check Bearer token format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // Ensure JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        message: "Server authentication configuration error",
      });
    }

    // Verify access token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Validate logged-in user's ID
    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    console.error("Authentication error:", error.message);

    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};

module.exports = authMiddleware;

