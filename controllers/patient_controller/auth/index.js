const Patients = require("../../../models/patient_schema");
const Mservice = require('../../../utils/micro_functions');

exports.login=async(req,res)=>{
    
    try{
        const { email, password }=req.fields;
        const checking=await Patients.findOne({email:req.fields.email,status:'active'});
        if(checking===null){
            res.status(404).json({status:'Invalid Credentials'});
            return;
        }
        const checkPassword=await Mservice.validatePassword(password, checking.password);
        if(!checkPassword) {
            res.status(404).json({status:'Invalid Credentials'});
            return;
        }

        await Patients.updateOne({email:email},{$set:{verified:true}});
        const token = Mservice.generateToken(checking._id,60*60*24*30);
        res.status(202).json({status:'success',data:{token:token}});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }

}