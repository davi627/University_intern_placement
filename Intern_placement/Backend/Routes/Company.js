import express from 'express'
import { Company } from '../Models/Company.js'

const router = express.Router()

router.post ("/details",async(req,res)=>{
    const {
        companyName,
        companyLocation,
        companyDomain,
        companyEmail,
        companyAddress,
        companyStatus,
        companyKraPin,
        companyContact,
        companyImages
        
    }=req.body
    console.log(req.body)
    try {
        const company = new Company({
            companyName,
            companyLocation,
            companyDomain,
            companyEmail,
            companyAddress,
            companyStatus,
            companyKraPin,
            companyContact,
            companyImages
        })
        await company.save()
        res.status(201).send('Company details added successfully')
        
    } catch (error) {
        res.status(400).send(error.message)

        
    }

    
    
})

export {router as companyRouter}