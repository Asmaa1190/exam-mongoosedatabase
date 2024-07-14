import { Router } from "express";
import { addJob, applyToJob, deleteJob, getAllJobs, getCompanyJobs, getFilteredJobs } from "./job.controller.js";
import { authorize } from "../../middleware/authorize.js";
import { vaildation } from "../../middleware/viladate.js";
import { jobVal } from "./job.validation.js";
import { fileUpload } from "../../fileUplod/fileUplod.js";



const jobRouter=Router()
jobRouter.use(authorize(['User,companyHR']))
jobRouter.post('/addJob',vaildation(jobVal),addJob)
jobRouter.delete('/deleteJob/:jobId',deleteJob)
jobRouter.get('/getAllJobs',getAllJobs)
jobRouter.get('/getCompanyJobs/:id',getCompanyJobs)
jobRouter.get('/getFilteredJobs',getFilteredJobs)
jobRouter.post('/applyToJob/:jobId',fileUpload('cv'),applyToJob)

export default jobRouter
