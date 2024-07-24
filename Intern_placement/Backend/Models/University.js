import mongoose from 'mongoose'

const UniversitySchema= new mongoose.Schema({
    university:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    kraPin:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    }
   
})

const UniversityModel=mongoose.model('University',UniversitySchema)

export { UniversityModel as University}