import mongoose, { Types, Schema, model } from "mongoose";

//schema for password manager
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, //will be encrypted
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    membership: {
        type: Types.ObjectId,
        ref: "Membership",
    },
    role: {
        type: String,
        enum: ["guest", "user", "writer", "admin", "developer"],
    },
});

const User = model("User", userSchema);

export default User;
