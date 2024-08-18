import mongoose, { Document, Schema } from "mongoose";


export interface IApproval extends Document {
    motivation: mongoose.Types.ObjectId;
    referral: mongoose.Types.ObjectId;
    contribution: mongoose.Types.ObjectId;
}

const ApprovalSchema: Schema = new Schema({
    motivation: { type: Schema.Types.ObjectId, required: true, ref: 'Motivation' }, // Assuming these are references to other models
    referral: { type: Schema.Types.ObjectId, required: true, ref: 'Referral' },
    contribution: { type: Schema.Types.ObjectId, required: true, ref: 'Contribution' }
});


const Approval = mongoose.model<IApproval>("Approval", ApprovalSchema);

export default Approval;
