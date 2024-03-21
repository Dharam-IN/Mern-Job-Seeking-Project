import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter Your Name"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"]
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone:{
        type: Number,
        required: [true, "Please Enter Your Phone Number"]
    },
    password:{
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password must be contain at least 8 characters"],
        maxLength: [30, "Password can't exceed 30 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})


// HASING THE PASSWORD
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

})


// COMPARE PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


// JWT GENERATE
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// MODEL
export const User = mongoose.model("user", userSchema)