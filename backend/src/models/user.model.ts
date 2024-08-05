import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  city?: string;
  location?: string;
  userType: "Volunteer" | "NGO" | "Company";
  isApproved: boolean;
  termsAccepted: boolean;
  isVerified: boolean;
  referralCode?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  googleId?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phoneNumber: { type: String },
  city: { type: String },
  location: { type: String },
  userType: {
    type: String,
    enum: ["Volunteer", "NGO", "Company"],
    required: true,
  },
  isApproved: { type: Boolean, default: false },
  termsAccepted: { type: Boolean, required: true },
  isVerified: { type: Boolean, default: false },
  referralCode: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  googleId: { type: String },
  photoURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (this: IUser & Document, next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return this.password
    ? bcrypt.compare(candidatePassword, this.password)
    : false;
};

export default mongoose.model<IUser>("User", UserSchema);
