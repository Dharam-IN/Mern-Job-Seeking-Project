import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Provide a title"],
        minLength: [3, "Title must contains at least 3 characters"],
        maxLength: [30, "Title can't exceed 30 characters"]
    },
    description: {
        type: String,
        required: [true, "Please Provide a description"],
        minLength: [3, "Description must contains at least 3 characters"],
        maxLength: [350, "Description can't exceed 350 characters"]
    },
    category: {
        type: String,
        required: [true, "Job category is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    fixedsalery:{
        type: Number,
        minLength: [4, "Fixed Salery contain at least 4 digits"],
        maxLength: [9, "Fixed Salery can't exceed 9 digits"]
    },
    saleryFrom:{
        type: Number,
        minLength: [4, "Salery From contain at least 4 digits"],
        maxLength: [9, "Salery From can't exceed 9 digits"]
    },
    saleryTo:{
        type: Number,
        minLength: [4, "Salery To contain at least 4 digits"],
        maxLength: [9, "Salery To can't exceed 9 digits"]
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

export const Job = mongoose.model("Job", jobSchema)
