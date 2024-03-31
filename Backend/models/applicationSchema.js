import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Your Name"],
        minLength: [3, "Name must be contain at least 3 Character"],
        maxLength: [30, "Name can't exceed 30 Character"]
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Please Provide a valid email"],
        required: [true, "Please Provide Your email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Please Provide your cover letter!"]
    },
    phone: {
        type: Number,
        required: [true, "Please Provide Your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please Provide Your Address"]
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    applicantID: {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerID: {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    }
})

export const Application = mongoose.model("application", applicationSchema)