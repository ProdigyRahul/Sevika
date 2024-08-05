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

export const sendForgetPasswordLink = async (
  to: string,
  link: string,
  userName: string
) => {
  const logoPath = path.join(__dirname, "../../public/Sevika-logo.png");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Sevika Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #FFF5EE;
        }
        .container {
          background-color: #FFFFFF;
          border-radius: 8px;
          padding: 30px;
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
        h2 {
          color: #FF5B22;
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .reset-button {
          display: block;
          width: 200px;
          margin: 30px auto;
          padding: 10px 20px;
          background-color: #FF5B22;
          color: #FFFFFF;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
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
        <h2>Reset Your Sevika Password</h2>
        <p>Hello ${userName},</p>
        <p>We received a request to reset your password for your Sevika account. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <a href="${link}" class="reset-button">Reset Password</a>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you're having trouble clicking the button, copy and paste the following link into your web browser:</p>
        <p>${link}</p>
        <p>If you need further assistance, please don't hesitate to contact our support team.</p>
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
    subject: "Reset Your Sevika Password",
    html: htmlContent,
    attachments: [
      {
        filename: "Sevika.png",
        path: logoPath,
        cid: "logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.warn(`Password reset email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
