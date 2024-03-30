import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js';
import {User} from '../models/userSchema.js'
import { sendToken } from '../utils/jwtToken.js';

export const register = catchAsyncError(async (req, res, next) => {

    const {name, email, phone, role, password} = req.body;

    if(!name || !email || !phone || !role || !password){
        return next( new ErrorHandler("Please Fill full registration form!"))
    }

    const isEmail = User.findOne({email});

    if(isEmail.length > 0){
        return next(new ErrorHandler("This Email Allready Exists!"));
    }

    const users = await User.create({
        name,
        email,
        phone,
        role,
        password
    })

    sendToken(users, 200, res, "User Registered Successfully!")
    
    res.status(200).json({
        success: true,
        message: "User Registered",
        users
    })

})


// LOGIN
export const login = catchAsyncError(async (req, res, next) => {
    const {email, password, role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please Provide email, password, role", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Please Enter Valid Details LOGIN", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Please Enter Valid Details LOGIN", 400));
    }

    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found!", 400));
    }

    sendToken(user, 200, res, "User Loged In Successfully!");

})


// LOGED OUT USER
export const logout = catchAsyncError(async(req, res, next) => {
    res.status(201).cookie("token", "",{
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logged Out Successfully!"
    })
})