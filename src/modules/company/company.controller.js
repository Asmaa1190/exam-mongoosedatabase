import { Company } from "../../../database/models/Company.model.js"
import { catchError } from "../../middleware/catchError.js"


// Add company
export const addCompany =catchError( async (req, res) => {
    const { companyName, desc, industry, companyEmail } = req.body
        const newCompany = await Company.insertMany(req.body)
        res.status(200).json({ message: "Company added successfully", newCompany })
})

// update Company Data
export const updateCompany = catchError(async (req, res) => {
    const { companyName, desc, industry, companyEmail } = req.body
    const { id } = req.params;
        const updatedCompany = await Company.updateOne({ _id: id }, { companyName, desc, industry, companyEmail })
        res.status(200).json({ message: 'company data updated', updatedCompany })
}
)
// Delete company data
export const deleteCompany =catchError( async (req, res) => {
    const { id } = req.params;
        const deletedCompany = await Company.deleteOne({ _id: id })
        res.status(200).json({ message: 'company data deleted', deletedCompany })
})

// Get company data 
export const getCompany =catchError( async (req, res) => {
    const { id } = req.params;
        const company = await Company.findById({ _id:id })
        res.status(200).json({ message: 'company data fetched', company })
})

// Search for a company with a name.
export const searchCompany = catchError(async (req, res) => {
    const { companyName } = req.params;
        const company = await Company.find({ companyName})
        res.status(200).json({ message: 'company data fetched', company })
})

// Get all applications for specific Job
export const getApplications =catchError( async (req, res) => {
    const{desc}=req.params;
        const applications = await Company.find({ desc })
        res.status(200).json({ message: 'applications fetched', applications })
})
