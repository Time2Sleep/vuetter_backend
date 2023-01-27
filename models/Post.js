import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Post', PostSchema)