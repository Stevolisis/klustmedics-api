const Medications = require("../../../models/medication_schema");


exports.get_medications=async (req,res)=>{
    try{
        const { id }=req.params;
        const medications_get=await Medications.find({patient_id:id}).sort({_id:-1});
        res.status(200).json({status:'success',data:medications_get});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}