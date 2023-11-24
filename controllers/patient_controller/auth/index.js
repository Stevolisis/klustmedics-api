const Patients = require("../../../models/patient_schema");
const Mservice = require('../../../utils/micro_functions');

exports.account_activation=async(req,res)=>{
    
    try{
        const { email, activation_code }=req.fields;
        const find_user = await Patients.findOne({email:email,activation_code:activation_code});
        console.log(find_user)
        if(!find_user){
            res.status(404).json({status:'Invalid Credentials'});
        }else{
            if(find_user.activation_code === activation_code){
                await Patients.updateOne({email:email},{$set:{activation_code:null,verified:true}});
                const token = Mservice.generateToken(find_user._id,60*60*24*30)
                res.status(202).json({status:'success',data:{token:token}});
            }else{
                res.status(404).json({status:'Invalid Credentials'});
            }
        }

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }

}