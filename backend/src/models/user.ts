import { Schema, Document, model } from 'mongoose'

interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    hasReferral: string;
    isVerified: boolean;
    verificationToken: string;
    roles: { type: [String], default: ['member'] },
    termsAccepted: boolean;
    privacyPolicy: boolean;
    profilePicture: string;
    bio: string;
    skills: string;

}

const userSchema = new Schema<UserDocument, {}>({
    firstName: {
        type: String,
        unique: true,
        required: true
    },
    lastName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        unique: true,
        required: true,
    },
    hasReferral: {
        type: String,
        unique: true,
        required: true,
    },
    isVerified: {

    }
})

const UserModel = model("User", userSchema)
export default UserModel;