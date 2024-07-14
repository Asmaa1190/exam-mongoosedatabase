import { Router } from "express";
import {   deleteAccount, getAllAccounts, getProfileData, getUserData, signIn, signUp, updateAccount, updatePassword } from "./user.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { vaildation } from "../../middleware/viladate.js";
import { signInVal, signUpVal } from "./user.validation.js";


const userRouter=Router()
userRouter.post('/signUp',vaildation(signUpVal),checkEmail,signUp)
userRouter.post('/signIn',vaildation(signInVal),signIn)
userRouter.put('/updateAccount/:id',verifyToken,updateAccount)
userRouter.delete('/deleteAccount/:id',verifyToken,deleteAccount)
userRouter.get('/getUserData/:id',verifyToken,getUserData)
userRouter.get('/getProfileData/:id',getProfileData)
userRouter.put('/updatePassword/:id',updatePassword)
userRouter.get('/getAllAccounts/:recoveryEmail',getAllAccounts)
// userRouter.post('/confirmation',checkEmail,confirmation)


export default userRouter