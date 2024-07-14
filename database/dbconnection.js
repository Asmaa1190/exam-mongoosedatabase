import {connect} from 'mongoose' 


export const dbConnect = connect('mongodb://127.0.0.1:27017/AppJob').then(() => {
    console.log('database connected successfully.')
}).catch(err=>console.log(err))