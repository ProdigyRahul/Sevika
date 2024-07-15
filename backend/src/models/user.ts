import { Schema, Document, model } from 'mongoose'

interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument, {}>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
})