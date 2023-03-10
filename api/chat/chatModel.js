import mongoose, { Types, Schema, model } from "mongoose";
import Message from "./messageModel.js";

const chatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    assigned: {
        //The agent assigned to this chat, can be null
        type: Types.ObjectId,
        ref: "User",
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    messages: [
        {
            type: Types.ObjectId,
            ref: "Message",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },

    //expires in 24 hours
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
});

const Chat = model("Chat", chatSchema);

export default Chat;
