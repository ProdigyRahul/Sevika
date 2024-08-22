import { Router } from "express";
import {
  signupController,
  verifyEmailController,
  reVerifyEmailController,
  loginController,
  forgetPasswordController,
  updatePasswordController,
  isAuthController,
  logoutController,
  googleSignInController,
  completeProfileController,
  isCompletedProfile,
  createApproval,
  getApprovalByID,
  updateApproval,
  deleteApproval,
  updateApplicationStatus,
} from "@/controllers/auth.controller";
import fileParser from "@/middlewares/fileParser.middleware";

const authRouter = Router();

/**
 * @route POST /api/v1/auth/signup
 * @description Register a new user
 * @access Public
 */
authRouter.post("/signup", signupController);

/**
 * @route POST /api/v1/auth/verify-email
 * @description Verify email using OTP token
 * @access Public
 */
authRouter.post("/verify-email", verifyEmailController);

/**
 * @route POST /api/v1/auth/re-verify-email
 * @description Re-send email verification
 * @access Public
 */
authRouter.post("/re-verify-email", reVerifyEmailController);

/**
 * @route POST /api/v1/auth/login
 * @description Authenticate user and get token
 * @access Public
 */
authRouter.post("/login", loginController);

/**
 * @route POST /api/v1/auth/google-signin
 * @description Authenticate user with Google
 * @access Public
 */
authRouter.post("/google-signin", googleSignInController);

/**
 * @route POST /api/v1/auth/complete-profile
 * @description Complete user profile after Google Sign-In
 * @access Private
 */
authRouter.post("/complete-profile", fileParser, completeProfileController);

/**
 * @route POST /api/v1/auth/forget-password
 * @description Initiate a password reset
 * @access Public
 */
authRouter.post("/forget-password", forgetPasswordController);

/**
 * @route POST /api/v1/auth/update-password
 * @description Update user password
 * @access Public
 */
authRouter.post("/update-password", updatePasswordController);

/**
 * @route GET /api/v1/auth/is-auth
 * @description Check if user is authenticated and send profile information
 * @access Private
 */
authRouter.get("/is-auth", isAuthController);

/**
 * @route POST /api/v1/auth/logout
 * @description Sign out user and terminate session
 * @access Private
 */
authRouter.post("/logout", logoutController);

/**
 * @route GET /api/v1/auth/is-completed-profile
 * @description Check if user profile is completed
 * @access Private
 */
authRouter.post("/is-completed-profile", isCompletedProfile);

authRouter.post("/create-approval", createApproval);

authRouter.post("/get-approval-by-id", getApprovalByID);

authRouter.post("/update-approval", updateApproval);

authRouter.post("/delete-approval", deleteApproval);

authRouter.post("/update-status", updateApplicationStatus);

export default authRouter;
