import { model, Schema, Types } from 'mongoose'

const appSchema = new Schema({
    jobId: {
        type: Types.ObjectId,
        ref: 'Job'
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    userTechSkills:[
        {
            type: [String],
            required: true
        }
    ],
    userSoftSkills :[
        {
            type: [String],
          required: true
        }
    ],
    userResume:{
        type: String,
        requireed:true
    }
  
})
appSchema.post('init',function(doc){
    doc.userResume="http://localhost:8000/job/applyToJob"+doc.userResume
})
export const App=model('App',appSchema)