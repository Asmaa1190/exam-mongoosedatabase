import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    let {token}=req.headers
    jwt.verify(token,'simooz',async(err,decoded)=>{
        if(err){
            return res.status(401).json(err)
        }
      
        req.user=decoded
        next()
    })
}