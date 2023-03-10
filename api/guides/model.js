import mongoose, { Types, Schema, model } from "mongoose";

const guideSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    author: {
        type: Types.ObjectId,
        ref: "User",
    },
});

//generate slug
//generate short description from html content
guideSchema.pre("save", function (next) {
    this.slug = this.title

        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    const textWithoutHtml = this.content.replace(/<[^>]*>?/gm, "");
    this.shortDescription = textWithoutHtml.substring(0, 100) + "...";

    next();
});

const Guide = model("Guide", guideSchema);

export default Guide;
