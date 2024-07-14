import { model, Schema, Types } from 'mongoose'

const companySchema=new Schema({
companyName:{
    type:String,
    unique:true
},
desc:{
    type:String,
},
industry:{
    type:String
},
numberOfEmployees:{
    type:Number,
    min:2,
    max:11
},
companyEmail:{
    type:String,
    unique:true
},
companyHR:{
    type:Types.ObjectId,
    ref:'User'
}
},{
    timestamps:true
})

export const Company=model('Company',companySchema)