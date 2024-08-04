import mongoose, { Document, Schema } from "mongoose";

export interface IVolunteer extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  skills: string[];
  interests: string[];
  availability: string;
  joiningReason: string;
  hearAboutUs: string;
  contributionHopes: string;
  completedTasks: mongoose.Types.ObjectId[];
}

const VolunteerSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  skills: [{ type: String }],
  interests: [{ type: String }],
  availability: { type: String },
  joiningReason: { type: String },
  hearAboutUs: { type: String },
  contributionHopes: { type: String },
  completedTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);
