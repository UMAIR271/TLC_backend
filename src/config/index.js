import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  MONGODB_URL:
    process.env.MONGODB_URL || "mongodb://localhost:27017/TLCWebsite",
  JWT_SECRET: process.env.JWT_SECRET || "yoursecret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  folderName: process.env.folderName,
  SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
  SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
  SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
  SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
  SMTP_SENDER_EMAIL: process.env.SMTP_SENDER_EMAIL,
  profileImageFolder: process.env.profileImageFolder,
  CollectionImageFolder: process.env.CollectionImageFolder,
};

export default config;
