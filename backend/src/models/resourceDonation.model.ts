import mongoose, { Document, Schema } from "mongoose";

export interface IResourceDonation extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  resourceId: mongoose.Types.ObjectId;
  quantity: number;
  status: string;
  createdAt: Date;
}

const ResourceDonationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resourceId: { type: Schema.Types.ObjectId, ref: "Resource", required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResourceDonation>(
  "ResourceDonation",
  ResourceDonationSchema
);
