import Joi from "joi"


export const jobVal=Joi.object({
    title:Joi.string().required().min(2).max(20),
    addedBy:Joi.string().required().hex().length(24),
    location:Joi.string().required().min(2).max(200),
    workingTime:Joi.string().required().min(2).max(200),
    seniorityLevel:Joi.string().required().min(2).max(200),
    jobDescription:Joi.string().required().min(2).max(200),
    technicalSkills:Joi.string().required().min(2).max(200),
    softSkill:Joi.string().required().min(2).max(200),  
})
