
import {model, Schema, Types}from'mongoose'

const jobSchema=new Schema({
    title:{
        type:String
    },
    Location:{
        type:String
    },
    workingTime:{
        type:String
    },
    seniorityLevel:{
        type:String,
        enum:['Junior','Mid','Senior','team_lead','SEO']
    },
    jobDescription:{
        type:String
    },
    technicalSkills:[
        {type:String}
    ],
    softSkills:[
        {type:String}
    ],
    addedBy:{
        type:Types.ObjectId,
        ref:'Company'
    }

})
export const Job=model('Job',jobSchema)