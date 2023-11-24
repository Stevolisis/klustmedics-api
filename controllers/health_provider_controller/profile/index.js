const Providers = require("../../../models/health_provider_schema");
const Mservice = require('../../../utils/micro_functions');


exports.get_provider=async (req,res)=>{

    try{
        const {id}=req.user;
        const provider = await Providers.findOne({_id:id}).select('-password');
        res.status(200).json({status:'success',data:provider});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.update_profile=async (req,res)=>{

    try{
        let provider_to_edit=req.fields;
        const {id}=req.user;
        provider_to_edit.updatedAt = Date.now();
        let img_to_delete,cloudImg;

        if(req.files.img){
            const profile_img=await Providers.findOne({_id:id}).select('profile_img');

            if(!profile_img.profile_img){
                img_to_delete=null;
                return;
            }
            img_to_delete=profile_img;
            Mservice.validateImage(req,res);
            cloudImg=await Mservice.imgUpload(req.files.img);    
        }

        if(req.files.img){
            provider_to_edit.profile_img={ 
                public_id:cloudImg.public_id , 
                url:cloudImg.url 
            };
        }
        await Providers.updateOne({_id:id},{$set:provider_to_edit});
        // if(img_to_delete&&img_to_delete.public_id) await Mservice.deleteImage(img_to_delete.profile_img.public_id);

        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}
