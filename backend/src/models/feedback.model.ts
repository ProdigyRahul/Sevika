import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  _id: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  giverId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  feedbackType: "VolunteerForNGO" | "NGOForVolunteer";
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  giverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  feedbackType: {
    type: String,
    enum: ["VolunteerForNGO", "NGOForVolunteer"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
