const Providers = require("../../../models/health_provider_schema");
const Medications = require("../../../models/medication_schema");
const Mservice = require('../../../utils/micro_functions');


exports.get_medications=async (req,res)=>{
    try{
        const {day,month,year}=req.params;
        const {id}=req.user;
        const medications_get=await Medications.find({patient_id:id,day:day,month:month,year:year}).sort({_id:-1});
        res.status(200).json({status:'success',data:medications_get});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}



exports.get_medication=async (req,res)=>{
    
    try{
        const {id}=req.params;
        const medication=await Medications.findOne({_id:id,patient_id:req.user.id});
        res.status(200).json({status:'success',data:medication});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.add_medication=async (req,res)=>{

    try{
        const { name, dosage, type, number_of_pills, timing, frequency, time, duration }=req.fields;
        const { id } = req.user;
        const date=new Date();

        const new_medication = new Medications({
            patient_id:id,
            name:name,
            dosage:dosage,
            type:type,
            number_of_pills:number_of_pills,
            timing,timing,
            frequency:frequency,
            time:time,
            duration:duration,
            status:'active',
            taken:false,
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        })
        await new_medication.save();
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}



exports.edit_medication=async (req,res)=>{

    try{
        let medication_to_edit = req.fields;
        medication_to_edit.updatedAt = Date.now();

        await Medications.updateOne({_id:req.params.id},{$set:medication_to_edit});
        res.status(200).json({status:'success'});
        
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.delete_medication=async (req,res)=>{

    try{
        const { id } = req.params;
        await Medications.deleteOne({_id:id,patient_id:req.user.id});
        res.status(200).json({status:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}

exports.medication_reminder_status=async (req,res)=>{

    try{
        const { status, id } = req.params;
        await Medications.updateOne({_id:id},{$set:{status:status}});
        res.status(200).json({status:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.medication_taken_status=async (req,res)=>{

    try{
        const { id } = req.params;
        await Medications.updateOne({_id:id},{$set:{taken:true}});
        res.status(200).json({status:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}
