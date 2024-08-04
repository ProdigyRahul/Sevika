import mongoose, { Document, Schema } from "mongoose";

export interface INGO extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  organizationName: string;
  description: string;
  website: string;
  registrationNumber: string;
}

const NGOSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  organizationName: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  registrationNumber: { type: String, required: true },
});

export default mongoose.model<INGO>("NGO", NGOSchema);
