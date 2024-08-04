import mongoose, { Document, Schema } from "mongoose";

export interface IResourceType extends Document {
  _id: mongoose.Types.ObjectId;
  name: "Food" | "Clothes" | "Books";
}

const ResourceTypeSchema: Schema = new Schema({
  name: { type: String, enum: ["Food", "Clothes", "Books"], required: true },
});

export default mongoose.model<IResourceType>(
  "ResourceType",
  ResourceTypeSchema
);
