import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addCompany, deleteCompany, getApplications, getCompany, searchCompany, updateCompany } from "./company.controller.js";
import { authorize } from "../../middleware/authorize.js";
import { vaildation } from "../../middleware/viladate.js";
import { companyVal } from "./campany.validation.js";

const companyRouter=Router()
companyRouter.use(authorize(['User,companyHR']))
companyRouter.get('/searchCompany/:companyName',searchCompany)
companyRouter.use(verifyToken)
companyRouter.post('/addCompany',vaildation(companyVal),addCompany)
companyRouter.put('/updateCompany/:id',updateCompany)
companyRouter.delete('/deleteCompany/:id',deleteCompany)
companyRouter.get('/getCompany/:id',getCompany)
companyRouter.get('/getApplications/:desc',getApplications)


export default companyRouter