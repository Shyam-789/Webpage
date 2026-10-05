const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const router = express.Router();


// =========================
// Email transporter
// =========================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Check email configuration
transporter.verify((error) => {
  if (error) {
    console.error(
      "EMAIL CONFIGURATION ERROR:",
      error.message
    );
  } else {
    console.log(
      "Email transporter is ready"
    );
  }
});


// =========================
// Register user
// =========================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail) {
      return res.status(400).json({
        message: "Name and email cannot be empty"
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured"
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message: "JWT_REFRESH_SECRET is not configured"
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});


// =========================
// Login API
// =========================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured"
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message: "JWT_REFRESH_SECRET is not configured"
      });
    }

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d"
      }
    );

    res.json({
      message: "Login successful",

      accessToken: accessToken,

      refreshToken: refreshToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});


// =========================
// Refresh Access Token
// =========================

router.post("/refresh", (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required"
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message:
          "JWT_REFRESH_SECRET is not configured"
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message:
          "JWT_SECRET is not configured"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    res.json({
      accessToken: newAccessToken
    });

  } catch (error) {
    return res.status(401).json({
      message:
        "Invalid or expired refresh token"
    });
  }
});


// ======================================================
// FORGOT PASSWORD
// ======================================================

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail
    });

    // Do not reveal whether the email exists
    if (!user) {
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent."
      });
    }

    // Generate secure reset token
    const resetToken =
      crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedResetToken =
      crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Token expires after 10 minutes
    user.resetPasswordToken =
      hashedResetToken;

    user.resetPasswordExpires =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    // Check frontend URL
    const frontendUrl =
      process.env.FRONTEND_URL;

    if (!frontendUrl) {
      return res.status(500).json({
        message:
          "FRONTEND_URL is not configured"
      });
    }

    // Create reset URL
    const resetUrl =
      `${frontendUrl}/reset-password/${resetToken}`;

    // Send reset email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: user.email,

      subject:
        "TASKFLOW - Reset Your Password",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background: #f8fafc;
          color: #111827;
        ">

          <div style="
            background: white;
            padding: 30px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
          ">

            <h1 style="
              color: #7c3aed;
              margin-bottom: 10px;
            ">
              ✦ TASKFLOW
            </h1>

            <h2>
              Reset your password
            </h2>

            <p>
              Hello ${user.name},
            </p>

            <p>
              We received a request to reset
              your TASKFLOW password.
            </p>

            <p>
              Click the button below to create
              a new password.
            </p>

            <div style="
              margin: 30px 0;
            ">
              <a
                href="${resetUrl}"
                style="
                  display: inline-block;
                  padding: 12px 22px;
                  background: #7c3aed;
                  color: white;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                "
              >
                Reset Password
              </a>
            </div>

            <p>
              This link will expire in
              <strong>10 minutes</strong>.
            </p>

            <p>
              If you did not request a password
              reset, you can safely ignore this
              email.
            </p>

            <p style="
              margin-top: 30px;
              color: #6b7280;
              font-size: 13px;
            ">
              © 2026 TASKFLOW
            </p>

          </div>
        </div>
      `
    });

    return res.json({
      message:
        "If an account with that email exists, a password reset link has been sent."
    });

  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to process password reset request"
    });
  }
});


// ======================================================
// RESET PASSWORD
// ======================================================

router.post("/reset-password", async (req, res) => {
  try {
    const {
      token,
      password
    } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message:
          "Reset token and new password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters"
      });
    }

    // Hash received token
    const hashedResetToken =
      crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find valid non-expired token
    const user = await User.findOne({
      resetPasswordToken:
        hashedResetToken,

      resetPasswordExpires: {
        $gt: new Date()
      }
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid or expired password reset link"
      });
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    user.password =
      hashedPassword;

    // Invalidate reset token
    user.resetPasswordToken = null;

    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      message:
        "Password reset successfully. You can now login with your new password."
    });

  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to reset password"
    });
  }
});


module.exports = router;