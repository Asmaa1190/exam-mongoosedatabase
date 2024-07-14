import Joi from "joi"


export const companyVal=Joi.object({
    companyName:Joi.string().required().min(2).max(20),
    companyHR:Joi.string().required().hex().length(24),
    desc:Joi.string().required().min(2).max(200),
    industry:Joi.string().required().min(2).max(200),
    numberOfEmployees:Joi.number().min(2).max(12),
    companyEmail:Joi.string().required().email(),  
})
