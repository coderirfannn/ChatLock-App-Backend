import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    content: {
        type: String,
        maxLength: 280

    },
    image: {
        type: String,
        default: "",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],

}, { timestamps: true })

const POST = mongoose.model("POST",userSchema);

export default POST;