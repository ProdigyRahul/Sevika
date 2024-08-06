/**
 * Configuration for Cloudinary integration using v2 API.
 * Sets up the Cloudinary configuration with credentials from environment variables.
 * Ensures secure API communication.
 */
import { v2 as cloudinary } from "cloudinary";
import config from "./config";

cloudinary.config({
  cloud_name: config.cloud_name, // Cloudinary cloud name
  api_key: config.cloud_key, // Cloudinary API key
  api_secret: config.cloud_secret, // Cloudinary API secret
  secure: true, // Ensure secure API communication
});

export default cloudinary;
