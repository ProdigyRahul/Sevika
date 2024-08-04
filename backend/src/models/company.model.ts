import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  companyName: string;
  industry: string;
  description: string;
  website: string;
}

const CompanySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  description: { type: String },
  website: { type: String },
});

export default mongoose.model<ICompany>("Company", CompanySchema);
