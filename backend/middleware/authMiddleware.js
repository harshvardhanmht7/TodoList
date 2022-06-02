import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'


const authMiddleware=asyncHandler(async(req,res,next)=>{
  
    const token=req.headers.authorization
    if(token)
   {
    const JWTSecretKey=process.env.JWT_SECRET

    const decoded = jwt.verify(token,JWTSecretKey );
    const id=decoded.id
    
    
    const user=await userModel.findOne({ _id:id })
    if(user){
        req.user=user
    }
    else {
        throw new Error ('token is invalid !')
    }
   
    
   }

   else{
       throw new Error('no token present')
   }
    
   next()
})


export default authMiddleware