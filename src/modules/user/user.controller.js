import { User } from "../../../database/models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { sendEmail } from "../sendEmail/email.js";
import { catchError } from "../../middleware/catchError.js";
import { appError } from "../../utils/appError.js";


// signUp
 export const signUp=catchError(async(req,res)=>{
    const{firstName,lastName,email,password,recoverEmail,DOB,mobileNumber,status}=req.body
    let isEmail=await User.findOne({email})
    if(isEmail) return res.status(400).json({message:"Email already exsist"})
       const hashPassword=bcrypt.hashSync(password,8)
    const applier=await User.insertMany({firstName,lastName,email,password:hashPassword,recoverEmail,DOB,mobileNumber,status})
    sendEmail(req.body.email)
    applier[0].password=undefined
    res.status(200).json({message:"Applier created successfully",applier})
})


// signIn
export const signIn=catchError(async(req,res,next)=>{
    const{email,password,userName,role}=req.body
    let isEmail=await User.findOne({email})
    if(!isEmail||!bcrypt.compare(password,isEmail.password))
        // return res.status(400).json({message:"Invalid Data"})
   return next(new appError('incorrect email or password',401))
     
    // res.status(200).json({message:"Login successfully",isEmail})
    // let Status=await User.updateOne({status:'online'})
    // return res.status(200).json({message:"success",Status})    
    jwt.sign({userId:isEmail._id,userName:isEmail.userName,role:isEmail.role},'simooz',async(err,token)=>{
        let loginStatus=await User.findOneAndUpdate({status:'online'})
        return res.status(200).json({loginStatus:'online',token})
     })
})

// update account
 export const updateAccount=catchError(async(req,res)=>{
    const{firstName,lastName,email,password,recoverEmail,DOB,mobileNumber,status}=req.body
    const{id}=req.params;
    let updated=await User.updateOne({_id:id},{
        firstName,lastName,email,password,recoverEmail,DOB,mobileNumber,status:'online'
    })
    res.status(200).json({message:"Account updated successfully",updated})
 })

//  delete account
export const deleteAccount=catchError(async(req,res)=>{
 
    const{id}=req.params;
    let deleted=await User.deleteOne({_id:id})
    res.status(200).json({message:"Account deleted successfully"})
})

// get user data
export const getUserData=catchError(async(req,res)=>{
    const{id}=req.params;
    const token=req.headers
    if(!token){res.json('u not allowed')}
    else{
        let userData=await User.findOne({_id:id})
        res.status(200).json({message:"User data",userData})
    }
})

// Get profile data for another user
export const getProfileData=catchError(async(req,res)=>{
    const{id}=req.params;
    let user=await User.findOne({_id:id})
res.status(200).json({message:"Profile data",user})
})

// Update password 
export const updatePassword=catchError(async(req,res)=>{
    const{id}=req.params;
    const{password}=req.body
    let updated=await User.updateOne({_id:id},{password})
    res.status(200).json({message:"Password updated successfully",updated})
})


// Get all accounts associated to a specific recovery Email 
export const getAllAccounts=catchError(async(req,res)=>{
    const{recoveryEmail}=req.params
    let accounts=await User.find({recoveryEmail})
    res.status(200).json({message:"All accounts",accounts})
})

// forget password or confirmemail

// export const confirmation=async(req,res)=>{
//     const{firstName,lastName,email,password,recoverEmail,DOB,mobileNumber,status}=req.body
//     let isEmail=await User.findOne({email})
//     if(isEmail) return res.status(400).json({message:"Email already exsist"})
//        const hashPassword=bcrypt.hashSync(password,8)
//     const applier=await User.insertMany({firstName,lastName,email,password:hashPassword,recoverEmail,DOB,mobileNumber,status})
//     sendEmail(req.body.email)
//     applier[0].password=undefined
//     res.status(200).json({message:"Applier created successfully",applier})
// }