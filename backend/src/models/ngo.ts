import { Schema, model, Document } from "mongoose"

interface ngoDocument extends Document {
    name: string;
    description: string;
    areasOfWork: string;
    contactNo: string;
    address: string;
    website: string;
    trustName: string;
    foundedDate: Date;
    isGovVerified: boolean;
}

const ngoSchema = new Schema<ngoDocument, {}>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    areasOfWork: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    trustName: {
        type: String,
        required: true,
    },
    foundedDate: {
        type: Date,
        required: true,
    },
    isGovVerified: {
        type: Boolean,
        required: true
    }
})

const NgoModel = model("NGOS", ngoSchema);
export default NgoModel;
