import mongoose, { Document, Schema } from "mongoose";

export interface IResource extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  typeId: mongoose.Types.ObjectId;
}

const ResourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  typeId: { type: Schema.Types.ObjectId, ref: "ResourceType", required: true },
});

export default mongoose.model<IResource>("Resource", ResourceSchema);
