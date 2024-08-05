import mongoose, { Document, Schema } from "mongoose";

export interface IApproval extends Document {
    reasonToJoin: mongoose.Types.ObjectId;
    referral: mongoose.Types.ObjectId;
    contributionToSevika: mongoose.Types.ObjectId;

}

const ApprovalSchema: Schema = new Schema({
    reasonToJoin: { type: Schema.Types.ObjectId, required: true },
    referral: { type: Schema.Types.ObjectId, required: true },
    contributionToSevika: { type: Schema.Types.ObjectId, required: true }
})

export default mongoose.model<IApproval>("Approval", ApprovalSchema);