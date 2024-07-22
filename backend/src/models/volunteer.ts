import { Schema, model, Document } from "mongoose"

interface volunteerDocument extends Document {
    reasonToJoin: string;
    foundThrough: string;
    contributions: string;
    categories: string;
}

const volunteerSchema = new Schema<volunteerDocument, {}>({
    reasonToJoin: {
        type: String,
        required: true,
    },
    foundThrough: {
        type: String,
        required: true
    },
    contributions: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
        max: 3,
    }
})

const VolunteerModel = model("Volunterr", volunteerSchema)
export default VolunteerModel;