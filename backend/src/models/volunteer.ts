import { Schema, models, Document } from 'mongoose'

interface volunteerDocument extends Document {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    city: String,
    referral: boolean,
    acceptedTerms: boolean
}

const volunteerSchema = new Schema<volunteerDocument, {}>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
    },
    referral: {
        type: Boolean,
        required: true,
    },
    acceptedTerms: {
        type: Boolean,
        required: true,
    }
})