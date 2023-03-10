import mongoose, { Types, Schema, model } from "mongoose";

const messageModel = new Schema({
    chat: {
        type: Types.ObjectId,
        ref: "Chat",
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = model("Message", messageModel);

export default Message;
