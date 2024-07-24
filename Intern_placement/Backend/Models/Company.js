import mongoose from 'mongoose'

const CompanySchema= new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    companyLocation:{
        type:String,
        required:true
    },
    companyDomain:{
        type:String,
        required:true
    },
    companyEmail:{
        type:String,
        required:true
    },
    companyAddress:{
        type:String,
        required:true
    },
    companyStatus:{
        type:String,
        required:true
    },
    companyKraPin:{
        type:String,
        required:true
    },
    companyContact:{
        type:String,
        required:true
    },
    companyImages:{
        type:[String],
        required:true
    }

})

const CompanyModel=mongoose.model('Company',CompanySchema)

export { CompanyModel as Company}
          
          
         
          
      
         
         
          
         