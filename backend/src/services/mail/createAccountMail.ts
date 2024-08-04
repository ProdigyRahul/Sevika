import config from "@/config/config";
import { logger } from "@/config/logger";
import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: config.smtp.auth,
});

export const sendVerificationEmail = async (
  to: string,
  token: string,
  userName: string
) => {
  const logoPath = path.join(__dirname, "../../public/Sevika-logo.png");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email for Sevika</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #E8F3FF;
        }
        .container {
          background-color: #FFFFFF;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          max-width: 150px;
          height: auto;
        }
        h1 {
          color: #4A90E2;
          border-bottom: 2px solid #4A90E2;
          padding-bottom: 10px;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          color: #4A90E2;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 5px;
          background-color: #E8F3FF;
          padding: 10px;
          border-radius: 5px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #7f8c8d;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="cid:logo" alt="Sevika Logo">
        </div>
        <h2 style="text-align: center;">Welcome to Sevika</h2>
        <p style="font-size: 18px; color: #555;">Hello, ${userName}</p>
        <p>Thank you for joining Sevika, your platform for connecting volunteers with meaningful opportunities. To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
        <div class="otp">${token}</div>
        <p>This OTP will expire in 5 minutes. If you didn't request this verification, please disregard this email.</p>
        <p>We're excited to have you join our community of volunteers making a difference!</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Sevika. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: config.email.from,
    to,
    subject: "Verify Your Email for Sevika",
    html: htmlContent,
    attachments: [
      {
        filename: "Sevika-logo.png",
        path: logoPath,
        cid: "logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.warn(`Verification email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
