
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: [true,"answerId is required"]
    },
    content: {
        type: String,
        required: [true,"content is required"],
        maxLength: 1000,
        trim: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,"authorId is required"]
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
},{ timestamps : true })

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
