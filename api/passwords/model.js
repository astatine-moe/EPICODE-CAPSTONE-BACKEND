import mongoose, { Types, Schema, model } from "mongoose";

//schema for password manager
const passwordSchema = new Schema({
    password: {
        type: String,
        required: true, //will be encrypted
    },
    belongs_to: {
        type: Types.ObjectId,
        ref: "User",
    },
    website: {
        type: String,
    },
    username: {
        type: String,
    },
    type: {
        type: String,
        enum: ["username", "email", "phone", "other"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
    },
});

//TODO: encrypt password
passwordSchema.pre("save", function (next) {
    this.password = this.password;
    next();
});

const Password = model("Password", passwordSchema);

export default Password;
