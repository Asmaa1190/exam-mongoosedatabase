import bcrypt from 'bcrypt'
import { User } from '../../database/models/User.model.js'


export const checkEmail=async(req,res,next)=>{
    let isExist=await User.findOne({email:req.body.email})
    if(isExist){
        return res.status(409).json({message:"User already exist"})
    }
    req.body.password=bcrypt.hashSync(req.body.password,8)
    next()
}
