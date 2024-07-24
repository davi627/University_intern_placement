import express from "express"
import { University } from "../Models/University.js"

const router = express.Router()


// Get all universities details
router.post("/details",async(req,res)=>{
    const {
        university,
        location,
        domain,
        email,
        address,
        status,
        contact,
        kraPin,
        images
        
    }=req.body
    console.log(req.body)

    const newUniversity= await University.create({
        university,
        location,
        domain,
        email,
        address,
        status,
        contact,
        kraPin,
        images
      
    })
    try {
        console.log(newUniversity)
        if(!newUniversity){
            return res.status(400).json({message: "Failed to create university"})
        }

        console.log('newUniversity: ',newUniversity);
        res.status(201).json(newUniversity)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
})

export {router as UniversityRouter}