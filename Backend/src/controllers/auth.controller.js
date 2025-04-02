
const userModel = require("../models/user.model");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/sendOTP");

const signUpController = async function(req,res){
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const userAlreadyExist = await userModel.findOne({email})

        if(userAlreadyExist){
            return res.status(409).json({
                message: "User already exist"
            })
        }

        
        const otp = generateOTP();
        const otpExpiary = Date.now() + 5 * 60 * 1000;
        
        await sendOTP({
            to: email,
            subject: "Stack_Wave Email Verification Code",
            html: `<div style="max-width: 400px; margin: auto; background: #222; padding: 20px; border-radius: 8px;">
            <h2 style="color: #00c8ff;">StackWave Verification Code</h2>
            <p style="font-size: 16px; color: #bbbbbb;">Use this OTP to verify your email:</p>
            <div style=" font-size: 24px; font-weight: bold; color: #ffcc00; background: #333; padding: 10px; border-radius: 5px; letter-spacing: 3px;">${otp}</div>
                <p style="margin-top: 10px;"> This OTP expires in 5 minutes. </p>
            </div>`
        })

        const hashedPassword = await userModel.hashPassword(password);
        // otp = await userModel.hashPassword(otp);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiary
        })

        const token = user.generateToken();

        delete user._doc.password
        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(201).json({
            user,
            token,
            message: "user created successfully"
        })

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const loginController = async function(req,res){
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({email}).select("+password")

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = user.generateToken();

        delete user._doc.password
        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(200).json({
            user,
            token,
            message: "User logged In successfully"
        })

    } 
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const profileController = async function(req,res){
    try{
        const { _id } = req?.user;
        console.log(req.user);
        

        if(!_id){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const user = await userModel.findById(_id);

        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(200).json({
            user
        })

    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const verifyController = async function(req,res){
    try{
        const otp = req.body.otp;
        const userId = req.user._id;

        console.log(otp);
        

        const user = await userModel.findById(userId);
        if(!user){
            res.status(401).json({ message: "Unauthorized" })
        }

        if(Date.now() > user.otpExpiary){
            return res.status(400).json({
                message: "Otp is expired"
            })
        }

        if(otp !== user.otp){
            return res.status(400).json({
                message: "Invalid OTP"
            })
        }

        user.isVerified = true;
        await user.save();

        delete user._doc.otp
        delete user._doc.otpExpiary

        res.status(200).json({
            user,
            message: "User verified successfully"
        })

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    signUpController,
    loginController,
    profileController,
    verifyController
}