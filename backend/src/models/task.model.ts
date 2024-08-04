import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  creatorId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  location: string;
  startDate: Date;
  endDate: Date;
  requiredVolunteers: number;
  currentVolunteers: number;
  status: "Pending" | "Ongoing" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  requiredVolunteers: { type: Number, required: true },
  currentVolunteers: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Pending", "Ongoing", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITask>("Task", TaskSchema);
