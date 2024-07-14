import { Job } from "../../../database/models/Job.model.js"
import { App } from '../../../database/models/application.model.js'
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"


// Add Job 
export const addJob = catchError(async (req, res) => {
    const { title, location, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills, addedBy } = req.body

    const newJob = await Job.insertMany(req.body)
    res.status(200).json({ message: 'Job added successfully', newJob })
})

// Delete Job
export const deleteJob = catchError(async (req, res) => {
    const { jobId } = req.params
    const deletedJob = await Job.deleteOne({ _id: jobId })
    res.status(200).json({ message: 'Job deleted successfully', deletedJob })

})

// Get all Jobs with their company’s information
export const getAllJobs = catchError(async (req, res) => {

    const jobs = await Job.find().populate('addedBy')
    res.status(200).json({ message: 'All jobs fetched successfully', jobs })

})

// Get all Jobs for a specific company
export const getCompanyJobs = catchError(async (req, res) => {
    const { role } = req.headers
    const { companyName } = req.query
    const { id } = req.params
    const jobs = await Job.find({ addedBy: id }).populate('addedBy', +'title')
    res.status(200).json({ message: 'All jobs fetched successfully', jobs })
})

// Get all Jobs that match the following filters 
// export const getFilteredJobs=async(req,res)=>{
//     const{role}=req.headers
//     const{seniorityLevel,jobDescription,technicalSkills,softSkills}=req.query
//     // const{companyName,workingTime,location,jobTitle}=req.params
//     if(role==='companyHR'||role==='User'){  
//     const jobs=await Job.find({seniorityLevel,jobDescription,technicalSkills,softSkills})
//     res.status(200).json({message:'All jobs fetched successfully',jobs})
// }else{
//     res.status(401).json({message:'Unauthorized'})
// }

// }
export const getFilteredJobs = catchError(async (req, res) => {

    const { seniorityLevel, jobDescription, technicalSkills, softSkills } = req.query
    // const{companyName,workingTime,location,jobTitle}=req.params
    const filters = {}
    if (req.query.workingTime) filters.workingTime = req.query.workingTime;
    if (req.query.seniorityLevel) filters.seniorityLevel = req.query.seniorityLevel;
    if (req.query.jobDescription) filters.jobDescription = req.query.jobDescription;
    const jobs = await Job.find(filters)
    res.status(200).json({ message: 'All jobs fetched successfully', jobs })

})



// Apply to Job
export const applyToJob = catchError(async (req, res, next) => {
    const { jobId } = req.params;
    const { userId, userSoftSkills, userTechSkills } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
        // return res.status(404).json({ message: 'Job not found' });
        next(new appError('job not found', 404))
    }
    const userResume = req.file.path
    const newApplication = await App.insertMany({
        jobId,
        userId,
        userSoftSkills,
        userTechSkills,
        userResume

    });
    res.status(200).json({ message: 'Application submitted successfully', newApplication });
})