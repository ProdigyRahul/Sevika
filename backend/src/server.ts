import "@/database";
import compression from "compression";
import cors from "cors";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { logger, morganMiddleware } from "./config/logger";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./routers/auth.router";

// Initialize Express server
const server = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: "Too many requests, please try again later.",
    });
  },
});

// Security and performance middlewares
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

server.use(compression());
server.use(limiter);

// Middleware setup
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static("src/public"));
server.use(morganMiddleware);

// API Routes
server.use("/api/v1/auth", authRouter);

// Health check endpoint
server.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
server.use(errorHandler);

// Start the server
server.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});

// Unhandled promise rejection handler
process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Uncaught exception handler
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
});
