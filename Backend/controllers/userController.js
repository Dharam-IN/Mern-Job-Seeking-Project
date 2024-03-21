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

    if(isEmail){
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
