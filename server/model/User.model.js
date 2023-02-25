import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique username"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email"],
        unique: [true, "Email already exists"]
    },
    firstName: {
        type: String,
        required: false,
        unique:false
    },
    lastName: {
        type: String,
        required: false,
        unique: false
    },
    mobile: {
        type: Number,
        required: false,
        unique: false
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    profileImg: {
        type: String,
        required: false,
        unique: false
    }
})

export default mongoose.model.Users || mongoose.model('User', UserSchema);