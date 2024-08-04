import { model, Model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "@/config/config";

// Interface for VerificationToken document
interface IVerificationToken extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

// Interface for VerificationToken model
interface IVerificationTokenModel extends Model<IVerificationToken> {
  createToken(userId: string | Types.ObjectId): Promise<string>;
  validateToken(
    userId: string | Types.ObjectId,
    token: string
  ): Promise<boolean>;
}

// Define VerificationToken schema
const verificationTokenSchema = new Schema<
  IVerificationToken,
  IVerificationTokenModel
>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config.otpExpire, // Token expires after the configured time
  },
});

// Hash token before saving
verificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
  next();
});

// Static method to create a new token
verificationTokenSchema.statics.createToken = async function (
  userId: string | Types.ObjectId
) {
  const token = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit token
  const userObjectId =
    typeof userId === "string" ? new Types.ObjectId(userId) : userId;

  const verificationToken = new this({
    userId: userObjectId,
    token: token,
  });

  await verificationToken.save();
  return token;
};

// Static method to validate a token
verificationTokenSchema.statics.validateToken = async function (
  userId: string | Types.ObjectId,
  token: string
) {
  const userObjectId =
    typeof userId === "string" ? new Types.ObjectId(userId) : userId;
  const verificationToken = await this.findOne({ userId: userObjectId });

  if (!verificationToken) {
    return false;
  }

  const isValid = await bcrypt.compare(token, verificationToken.token);
  if (isValid) {
    await verificationToken.deleteOne();
  }

  return isValid;
};

// Create and export the VerificationToken model
const VerificationToken = model<IVerificationToken, IVerificationTokenModel>(
  "VerificationToken",
  verificationTokenSchema
);

export default VerificationToken;
