const Patients = require("../../../models/patient_schema");
const Mservice = require('../../../utils/micro_functions');


exports.get_all_patients=async (req,res)=>{
    
    try{
        const {limit}=req.params;
        const patients_get=await Patients.find({}).select('-activation_code').limit(limit).sort({_id:-1});
        res.status(200).json({status:'success',data:patients_get});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}

exports.get_patients=async (req,res)=>{
    
    try{
        const {limit}=req.params;
        const {id}=req.user;
        const patients_get=await Patients.find({provider_id:id}).select('-activation_code').limit(limit).sort({_id:-1});
        res.status(200).json({status:'success',data:patients_get});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.get_patient=async (req,res)=>{
    
    try{
        const {id}=req.params;
        const patient=await Patients.findOne({_id:id,provider_id:req.user.id}).select('-activation_code');
        res.status(200).json({status:'success',data:patient});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.add_patient=async (req,res)=>{

    try{
        const { full_name, email, phone_number, health_condition, date_of_birth, gender }=req.fields;
        const { id } = req.user;
        const user_exist = await Patients.findOne({email:email});
        const date=new Date();
        const activation_code = Mservice.randomFixedInteger(6);
        console.log(user_exist);

        if(user_exist){
            res.status(404).json({status:'patient exist'});
            return;
        }
        const new_patient = new Patients({
            provider_id:id,
            full_name:full_name,
            email:email,
            phone_number:phone_number,
            health_condition:health_condition,
            date_of_birth:date_of_birth,
            gender:gender,
            status:'active',
            verified:false,
            activation_code:activation_code,
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        });
        await Mservice.sendMail('welcome2','Welcome to KlustMedics', email, { name:full_name });
        await Mservice.sendMail('passcode','Activate your account', email, { name:full_name, passcode:activation_code });
        await new_patient.save();
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.edit_patient=async (req,res)=>{

    try{
        const { id } = req.params;
        req.fields.updatedAt = Date.now();
        await Patients.updateOne({_id:id,provider_id:req.user.id},{$set:req.fields});
        res.status(200).json({status:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.delete_patient=async (req,res)=>{

    try{
        const { id } = req.params;
        await Patients.deleteOne({_id:id,provider_id:req.user.id});
        res.status(200).json({status:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}