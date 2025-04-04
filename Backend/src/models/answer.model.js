
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        maxLength: 2000
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vote: {
        type: Number,
        default: 0
    }
    
},{ timestamps: true })

const answerModel = mongoose.model("Answer", answerSchema);

module.exports = answerModel;
