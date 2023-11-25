const Patients = require("../../../models/patient_schema");
const Providers = require("../../../models/health_provider_schema");
const Mservice = require('../../../utils/micro_functions');


exports.get_patient=async (req,res)=>{

    try{
        const {id}=req.user;
        const patient = await Patients.findOne({_id:id}).select('-activation_code');
        res.status(200).json({status:'success',data:patient});
        
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}

exports.update_profile=async (req,res)=>{

    try{
        let patient_to_edit=req.fields;
        const {id}=req.user;
        patient_to_edit.updatedAt = Date.now();
        let img_to_delete,cloudImg;

        if(req.files.img){
            const profile_img=await Patients.findOne({_id:id}).select('profile_img');

            if(!profile_img.profile_img){
                img_to_delete=null;
                return;
            }
            img_to_delete=profile_img;
            Mservice.validateImage(req,res);
            cloudImg=await Mservice.imgUpload(req.files.img);    
        }

        if(req.files.img){
            patient_to_edit.profile_img={ 
                public_id:cloudImg.public_id , 
                url:cloudImg.url 
            };
        }
        await Patients.updateOne({_id:id},{$set:patient_to_edit});
        if(img_to_delete&&img_to_delete.public_id) await Mservice.deleteImage(img_to_delete.profile_img.public_id);

        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}




exports.get_doctor_contacts=async (req,res)=>{

    try{
        const { id } = req.user;
        const provider = await Patients.findOne({_id:id});
        const get_provider = await Providers.findOne({_id:provider.provider_id}).select('-password');
        res.status(200).json({status:'success',data:get_provider});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}