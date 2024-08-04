import dotenv from "dotenv";
import { logger } from "./logger";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/sevika",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpire: process.env.JWT_EXPIRE || "7d",
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: {
      name: "Sevika",
      address: process.env.EMAIL_USER || "noreply@sevika.com",
    },
  },
  smtp: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  otpExpire: parseInt(process.env.OTP_EXPIRE || "300", 10),
  password_reset_link: process.env.PASSWORD_RESET_LINK,
  cloud_name: process.env.CLOUD_NAME,
  cloud_key: process.env.CLOUD_KEY,
  cloud_secret: process.env.CLOUD_SECRET,
};

const checkEnvironmentVariables = () => {
  const variables = [
    "NODE_ENV",
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "JWT_EXPIRE",
    "EMAIL_USER",
    "EMAIL_PASS",
    "OTP_EXPIRE",
    "PASSWORD_RESET_LINK",
    "CLOUD_NAME",
    "CLOUD_KEY",
    "CLOUD_SECRET",
  ];

  variables.forEach((variable) => {
    if (process.env[variable]) {
      logger.warn(`Environment variable ${variable} is properly configured.`);
    } else {
      logger.warn(
        `Environment variable ${variable} is not set. Using default value.`
      );
    }
  });
};

// Call the function to check environment variables
checkEnvironmentVariables();

export default config;
