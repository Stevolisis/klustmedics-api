const Resources = require("../../../models/resource_schema");
const Mservice = require('../../../utils/micro_functions');


exports.get_resources=async (req,res)=>{
    
    try{
        const {limit}=req.params;
        const {id}=req.user;
        const resources_get=await Resources.find({provider_id:id}).populate({path:'provider_id',select:'full_name email phone_number profile_img'}).select('-activation_code').limit(limit).sort({_id:-1});
        res.status(200).json({status:'success',data:resources_get});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.get_resource=async (req,res)=>{
    
    try{
        const {id}=req.params;
        const resource=await Resources.findOne({_id:id,provider_id:req.user.id});
        res.status(200).json({status:'success',data:resource});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.add_resource=async (req,res)=>{

    try{
        const { title, description, content }=req.fields;
        const { id } = req.user;
        const date=new Date();

        Mservice.validateImage(req,res);
        const cloudImg=await Mservice.imgUpload(req.files.img);
        const new_resource = new Resources({
            provider_id:id,
            title:title,
            description:description,
            content:content,
            img:{ public_id:cloudImg.public_id,url:cloudImg.url},
            status:'active',
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        })
        await new_resource.save();
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.edit_resource=async (req,res)=>{

    try{
        let resource_to_edit = req.fields;
        resource_to_edit.updatedAt = Date.now();
        const { id } = req.user;
        let img_to_delete,cloudImg;

        if(req.files.img){
            const image=await Resources.findOne({_id:req.params.id,provider_id:id}).select('img');
            img_to_delete=image;
            Mservice.validateImage(req,res);
            cloudImg=await Mservice.imgUpload(req.files.img);    
        }

        if(req.files.img){
            resource_to_edit.img={ 
                public_id:cloudImg.public_id , 
                url:cloudImg.url 
            };
        }
        await Resources.updateOne({_id:req.params.id},{$set:resource_to_edit});
        if(img_to_delete.public_id) await Mservice.deleteImage(img_to_delete.img.public_id);
        res.status(200).json({status:'success'});
        
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}


exports.delete_resource=async (req,res)=>{

    try{
        const { id } = req.params;
        await Resources.deleteOne({_id:id,provider_id:req.user.id});
        res.status(200).json({status:'success'});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}