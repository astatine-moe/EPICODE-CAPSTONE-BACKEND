import mongoose, { Types, Schema, model } from "mongoose";
import { encrypt, decrypt } from "../../modules/encryption";

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

passwordSchema.pre("save", function (next) {
    this.password = encrypt(this.password);

    next();
});

const Password = model("Password", passwordSchema);

export default Password;
