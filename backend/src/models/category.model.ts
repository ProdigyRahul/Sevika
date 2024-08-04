import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
