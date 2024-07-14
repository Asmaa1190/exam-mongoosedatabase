process.on('uncaughtException', () => {
    console.log('error in code')
})
import express from 'express'
import { dbConnect } from './database/dbconnection.js'
import userRouter from './src/modules/user/user.routes.js'
import jwt from 'jsonwebtoken'
import { User } from './database/models/User.model.js'
import companyRouter from './src/modules/company/company.routes.js'
import jobRouter from './src/modules/Jobmod/job.routes.js'
import { appError } from './src/utils/appError.js'
import { errorHandel } from './src/middleware/errorHandel.js'
import cors from 'cors'


const app = express()
const port =process.env.port||8000
app.use(express.json())
app.use('/uploads',express.static('uploads'))
// const upload=multer({dest:'uploads/'})
dbConnect
app.use(cors())
app.use('/auth', userRouter)
app.use('/Company', companyRouter)
app.use('/job', jobRouter)
// verify token
app.get('/verify/:token', async (req, res, next) => {
    jwt.verify(req.params.token, 'simooz', async (err, payload) => {
        if (err) return res.json(err)
        // if(err)return next('err',401)
        await User.findOneAndUpdate({ email: payload.email }, { confimEmail: true })
        res.json({ message: 'success', email: payload.email })
    })
})
// error handel middelware
app.use('*', (req, res, next) => {
    next(new appError(`route not found${req.originalUrl}`, 401))
})
app.use(errorHandel)
process.on('unhandledRejection', (err) => {
    console.log('error in connection', err)
})
// {https://documenter.getpostman.com/view/32844978/2sA3kPoPjf}{{{post man code APIs}}}
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))