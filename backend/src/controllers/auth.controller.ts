import { Types } from "mongoose";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User, { IUser } from "@/models/user.model";
import VerificationToken from "@/models/verification.model";
import { sendVerificationEmail } from "@/services/mail/createAccountMail";
import { sendForgetPasswordLink } from "@/services/mail/resetPasswordMail";
import config from "@/config/config";
import { logger } from "@/config/logger";

export const googleSignInController: RequestHandler = async (req, res) => {
  try {
    const { googleId, email, firstName, lastName, photoURL } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      // If user exists, update Google-specific fields
      user.googleId = googleId;
      user.photoURL = photoURL;
      user.isVerified = true;
      await user.save();
    } else {
      // If user doesn't exist, create a new user
      user = new User({
        googleId,
        email,
        firstName,
        lastName,
        photoURL,
        isVerified: true,
        termsAccepted: true,
        userType: "Volunteer",
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Google Sign-In successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    logger.error("Google Sign-In error:", error);
    res.status(500).json({ message: "Error in Google Sign-In" });
  }
};

export const completeProfileController: RequestHandler = async (req, res) => {
  try {
    const { userId, phoneNumber, city, location, userType } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phoneNumber = phoneNumber;
    user.city = city;
    user.location = location;
    user.userType = userType;
    await user.save();

    res.status(200).json({
      message: "Profile completed successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        phoneNumber: user.phoneNumber,
        city: user.city,
        location: user.location,
      },
    });
  } catch (error) {
    logger.error("Complete profile error:", error);
    res.status(500).json({ message: "Error in completing profile" });
  }
};

export const signupController: RequestHandler = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      city,
      location,
      userType,
      termsAccepted,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      city,
      location,
      userType,
      termsAccepted,
      referralCode: crypto.randomBytes(6).toString("hex"),
    });

    await newUser.save();

    // Generate verification token (6-digit OTP)
    const verificationToken = await VerificationToken.createToken(newUser._id);

    // Send verification email
    sendVerificationEmail(newUser.email, verificationToken, newUser.firstName);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for the verification code.",
      userId: newUser._id,
    });
  } catch (error) {
    logger.error("Signup error:", error);
    res.status(500).json({ message: "Error in user registration" });
  }
};

export const verifyEmailController: RequestHandler = async (req, res) => {
  try {
    const { userId, token } = req.body;

    logger.info(
      `Attempting to verify email for user ${userId} with token ${token}`
    );

    const isValid = await VerificationToken.validateToken(userId, token);

    if (!isValid) {
      logger.warn(`Invalid or expired verification code for user ${userId}`);
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User not found for id ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    logger.info(`Email verified successfully for user ${userId}`);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    logger.error("Email verification error:", error);
    res.status(500).json({ message: "Error in email verification" });
  }
};

export const reVerifyEmailController: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    await VerificationToken.findOneAndUpdate(
      { userId: user._id },
      { token: verificationToken },
      { upsert: true }
    );

    sendVerificationEmail(user.email, verificationToken, user.firstName);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    logger.error("Re-verify email error:", error);
    res.status(500).json({ message: "Error in resending verification email" });
  }
};

export const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ message: "Error in user login" });
  }
};
export const forgetPasswordController: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    sendForgetPasswordLink(user.email, resetToken, user.firstName);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    logger.error("Forget password error:", error);
    res.status(500).json({ message: "Error in forget password process" });
  }
};

export const updatePasswordController: RequestHandler = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    logger.error("Update password error:", error);
    res.status(500).json({ message: "Error in updating password" });
  }
};

export const isAuthController: RequestHandler = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    logger.error("Auth check error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const logoutController: RequestHandler = async (req, res) => {
  // Since we're using JWT, we don't need to do anything server-side for logout
  // The client should remove the token from storage
  res.status(200).json({ message: "Logged out successfully" });
};

export const candidateapproval: RequestHandler = async (req, res) => {
  const { status } = req.body;
};
