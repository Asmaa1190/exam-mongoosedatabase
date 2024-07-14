
import  { Schema,model} from 'mongoose'

const schema=new Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    userName:{
        type:String
    },
  
    email:{
        type:String,
        unique:true
      
    },
    confimEmail:{
        type:Boolean,
        default:false
    },
    password:String,
    recoveryEmail:String,
    DOB:{
        type:Date,
        default:Date.now 
    },
    mobileNumber:{
        type:Number,
        unique:true
    },
    role:{
        type:String,
        default:'user',
        enum:['user','company_HR']
    },
    status:{
        type:String
    }
},{
    timestamps:{updatedAt:false},
    versionKey:false
})
export const User=model('User',schema)

