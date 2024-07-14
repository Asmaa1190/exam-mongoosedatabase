import Joi from "joi"


export const signUpVal=Joi.object({
    firstName:Joi.string().required().min(2).max(20),
    lastName:Joi.string().required().min(2).max(20),
    userName:Joi.string().required().min(2).max(20),
    email:Joi.string().required().email(),
    password:Joi.string().required().pattern(/^[A_Z][A_Za-z0-9]{5,20}$/),
    recoveryEmail:Joi.string().required().email(),
    DOB:Joi.date(),
    mobileNumber:Joi.string().required().pattern(/^(010|011|012|015)[0-9]{8}$/),
    status:Joi.string().min(2).max(10)

})
export const signInVal=Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required().pattern(/^[A_Z][A_Za-z0-9]{5,20}$/),
})
