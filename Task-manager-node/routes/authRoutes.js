
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


 // =========================
 // Brevo Email API Configuration
 // =========================

async function sendTaskflowEmail({ to, subject, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    throw new Error(
      "BREVO_API_KEY or BREVO_SENDER_EMAIL is missing in environment variables"
    );
  }

  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "TASKFLOW",
          email: senderEmail,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      }),
    }
  );

  if (!response.ok) {
    const errorDetails = await response.text();

    console.error(
      "BREVO EMAIL API ERROR:",
      response.status,
      errorDetails
    );

    throw new Error(
      `Brevo email request failed with status ${response.status}`
    );
  }

  return response.json();
}

// =========================
// Register user
// =========================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail) {
      return res.status(400).json({
        message: "Name and email cannot be empty",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message: "JWT_REFRESH_SECRET is not configured",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    });

    return res.status(201).json({
      message: "Registration successful. You can now login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

// ======================================================
// VERIFY EMAIL
// ======================================================

router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        message: "Email verification token is required",
      });
    }

    const hashedVerificationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedVerificationToken,
      emailVerificationExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired email verification link",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save();

    return res.json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.error("EMAIL VERIFICATION ERROR:", error);

    return res.status(500).json({
      message: "Unable to verify email",
    });
  }
});

// ======================================================
// RESEND VERIFICATION EMAIL
// ======================================================

router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "This email is already verified. You can login.",
      });
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({
        message: "FRONTEND_URL is not configured",
      });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    user.emailVerificationToken = hashedVerificationToken;
    user.emailVerificationExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const verificationUrl =
      `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;




    await sendTaskflowEmail({
      to: user.email,
      subject: "TASKFLOW - Verify Your Email",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#f8fafc;color:#111827;">
          <div style="background:white;padding:30px;border-radius:12px;border:1px solid #e5e7eb;">
            <h1 style="color:#7c3aed;">✦ TASKFLOW</h1>
            <h2>Verify your email</h2>
            <p>Hello ${user.name},</p>
            <p>Here is your new TASKFLOW email verification link.</p>
            <div style="margin:30px 0;">
              <a href="${verificationUrl}" style="display:inline-block;padding:12px 22px;background:#7c3aed;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
                Verify Email
              </a>
            </div>
            <p>This verification link will expire in <strong>10 minutes</strong>.</p>
            <p style="margin-top:30px;color:#6b7280;font-size:13px;">© 2026 TASKFLOW</p>
          </div>
        </div>
      `,
    });

    return res.json({
      message: "A new verification email has been sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("RESEND VERIFICATION ERROR:", error);

    return res.status(500).json({
      message: "Unable to resend verification email",
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
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message: "JWT_REFRESH_SECRET is not configured",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message,
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
        message: "Refresh token required",
      });
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      return res.status(500).json({
        message: "JWT_REFRESH_SECRET is not configured",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
});

// ======================================================
// GET PROFILE
// ======================================================

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto || null,
      },
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Unable to get profile",
    });
  }
});

// ======================================================
// UPDATE PROFILE
// ======================================================

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail) {
      return res.status(400).json({
        message: "Name and email cannot be empty",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: {
        $ne: req.userId,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = trimmedName;
    user.email = normalizedEmail;

    await user.save();

    return res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto || null,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Unable to update profile",
    });
  }
});

// ======================================================
// UPDATE PROFILE PHOTO
// ======================================================

router.put("/profile/photo", authMiddleware, async (req, res) => {
  try {
    const { profilePhoto } = req.body;

    if (!profilePhoto) {
      return res.status(400).json({
        message: "Profile photo is required",
      });
    }

    if (
      typeof profilePhoto !== "string" ||
      !profilePhoto.startsWith("data:image/")
    ) {
      return res.status(400).json({
        message: "Invalid profile photo",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profilePhoto = profilePhoto;

    await user.save();

    return res.json({
      message: "Profile photo updated successfully",
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    console.error("UPDATE PROFILE PHOTO ERROR:", error);

    return res.status(500).json({
      message: "Unable to update profile photo",
    });
  }
});

// ======================================================
// REMOVE PROFILE PHOTO
// ======================================================

router.delete("/profile/photo", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profilePhoto = null;

    await user.save();

    return res.json({
      message: "Profile photo removed successfully",
      profilePhoto: null,
    });
  } catch (error) {
    console.error("REMOVE PROFILE PHOTO ERROR:", error);

    return res.status(500).json({
      message: "Unable to remove profile photo",
    });
  }
});

// ======================================================
// CHANGE PASSWORD
// ======================================================

router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Unable to change password",
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
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not configured");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${frontendUrl}/reset-password/${resetToken}`;


    await sendTaskflowEmail({
      to: user.email,
      subject: "TASKFLOW - Reset Your Password",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#f8fafc;color:#111827;">
          <div style="background:white;padding:30px;border-radius:12px;border:1px solid #e5e7eb;">
            <h1 style="color:#7c3aed;">✦ TASKFLOW</h1>
            <h2>Reset your password</h2>
            <p>Hello ${user.name},</p>
            <p>We received a request to reset your TASKFLOW password.</p>
            <p>Click the button below to create a new password.</p>
            <div style="margin:30px 0;">
              <a href="${resetUrl}" style="display:inline-block;padding:12px 22px;background:#7c3aed;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
                Reset Password
              </a>
            </div>
            <p>This link will expire in <strong>10 minutes</strong>.</p>
            <p>If you did not request a password reset, you can safely ignore this email.</p>
            <p style="margin-top:30px;color:#6b7280;font-size:13px;">© 2026 TASKFLOW</p>
          </div>
        </div>
      `,
    });

    return res.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Unable to process password reset request",
    });
  }
});

// ======================================================
// RESET PASSWORD
// ======================================================

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Reset token and new password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired password reset link",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      message:
        "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Unable to reset password",
    });
  }
});

module.exports = router;
