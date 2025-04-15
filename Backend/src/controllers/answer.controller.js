
const answerModel = require("../models/answer.model");
const commentModel = require("../models/comment.model");
const userModel = require("../models/user.model");


const addAnswerController = async function(req,res){
    try{
        const questionId = req.params?.questionId;
        const userId = req.user?._id;

        if(!questionId){
            return res.status(400).json({
                message: "Question not found"
            })
        }

        if(!userId){
            return res.status(401).json({
                message: "User not authenticated"
            })
        }

        const { content } = req.body;

        if(!content){
            return res.status(400).json({
                message: "Content is required"
            })
        }

        const answer = await answerModel.create({
            questionId,
            authorId: userId,
            content
        })

        const user = await userModel.findById(userId);
        user.answerGivenCount++;
        await user.save();

        res.status(201).json({
            message: "answer created successfully",
            answer
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const editAnswerController = async function(req,res){
    try{
        const answerId = req.params?.answerId;
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "User not authenticated"
            })
        }

        if(!answerId){
            return res.status(400).json({
                message: "AnswerId is required"
            })
        }

        const isAnswerExist = await answerModel.findById(answerId);
        if(!isAnswerExist){
            return res.status(404).json({
                message: "Answer not found"
            })
        }

        if(userId.toString() !== isAnswerExist.authorId.toString()){
            return res.status(403).json({
                message: "User is not authorized to edit this answer"
            })
        }

        const { content } = req.body;
        if(!content){
            return res.status(400).json({
                message: "Content is required"
            })
        }

        isAnswerExist.content = content;
        const answer = await isAnswerExist.save();

        res.status(200).json({
            message: "answer updated successfully",
            answer
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteAnswerController = async function(req,res){
    try{
        const answerId = req.params?.answerId;
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        if(!answerId){
            return res.status(400).json({
                message: "AnswerId is required"
            })
        }

        const isAnswerExist = await answerModel.findById(answerId);
        if(!isAnswerExist){
            return res.status(404).json({
                message: "Answer not found"
            })
        }

        if(userId.toString() !== isAnswerExist.authorId.toString()){
            return res.status(403).json({
                message: "User is not authorized to delete this answer"
            })
        }

        await answerModel.findByIdAndDelete(answerId);

        const user = await userModel.findById(userId);
        user.answerGivenCount--;
        await user.save();

        await commentModel.deleteMany({ answerId: answerId });

        res.status(200).json({
            message: "answer deleted successfully",
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const upVoteAnswerController = async function(req,res){
    try{
        const answerId = req.params?.answerId;
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        if(!answerId){
            return res.status(400).json({
                message: "AnswerId is required"
            })
        }

        const isAnswerExist = await answerModel.findById(answerId);
        if(!isAnswerExist){
            return res.status(404).json({
                message: "Answer not found"
            })
        }

        if(userId.toString() === isAnswerExist.authorId.toString()){
            return res.status(403).json({
                message: "User cannot vote on their own answer"
            })
        }

        isAnswerExist.vote++;
        await isAnswerExist.save();

        res.status(200).json({
            message: "answer upVote sucessfully",
            newVoteCount: isAnswerExist.vote
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const downVoteAnswerController = async function(req,res){
    try{
        const answerId = req.params?.answerId;
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        if(!answerId){
            return res.status(400).json({
                message: "AnswerId is required"
            })
        }

        const isAnswerExist = await answerModel.findById(answerId);
        if(!isAnswerExist){
            return res.status(403).json({
                message: "Answer not found"
            })
        }

        if(userId.toString() === isAnswerExist.authorId.toString()){
            return res.status(403).json({
                message: "User cannot vote on their own answer"
            })
        }   

        isAnswerExist.vote--;
        await isAnswerExist.save();

        res.status(200).json({
            message: "answer downVote sucessfully",
            newVoteCount: isAnswerExist.vote
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    addAnswerController,
    editAnswerController,
    deleteAnswerController,
    upVoteAnswerController,
    downVoteAnswerController
}