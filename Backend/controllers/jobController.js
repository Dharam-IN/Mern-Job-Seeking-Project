import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Job} from '../models/jobSchema.js'

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({expired: false});

    res.status(200).json({
        success: true,
        jobs
    })

})


export const postJob = catchAsyncError(async (req, res, next) => {
    const {role} = req.user;

    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resoures", 400));
    }

    const {title, description, category, country, city, location, fixedsalry, saleryFrom, saleryTo} = req.body;

    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please Provide full job details", 400));
    }

    if((!saleryFrom || !saleryTo) && !fixedsalry){
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400))
    }

    if(saleryFrom && saleryTo && fixedsalry){
        return next(new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400))
    }

    const postedBy = req.body._id;

    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        saleryFrom,
        saleryTo, 
        postedBy
    })

})
