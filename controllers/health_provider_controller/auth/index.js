const Providers = require("../../../models/health_provider_schema");
const Mservice = require('../../../utils/micro_functions')

exports.register=async (req,res)=>{
    
    try{
        const {full_name,email,phone_number,password}=req.fields;
        const provider_exist=await Providers.findOne({email:email});
        if(provider_exist){
            res.status(404).json({status:'User with this email exist'});
            return;
        }
        const date=new Date();
        const hashed_password = await Mservice.hashPassword(password);

        const provider_scheme = new Providers({
            full_name:full_name,
            email:email,
            phone_number:phone_number,
            password:hashed_password,
            status:'active',
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        });
        await provider_scheme.save();
        await Mservice.sendMail('welcome1','Welcome to KlustMedics', email, { name:full_name });
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error', data:err.message});
    }
}



exports.login=async (req,res)=>{

    try{
        const checking=await Providers.findOne({email:req.fields.email,status:'active'});
        if(checking===null){
            res.status(404).json({status:'Invalid Credentials'});
            return;
        }
        const checkPassword=await Mservice.validatePassword(req.fields.password, checking.password);
        if(!checkPassword) {
            res.status(404).json({status:'Invalid Credentials'});
            return;
        }
        
        const token=Mservice.generateToken(checking._id,60 * 60 * 24 * 30);
        
        res.status(202).json({status:'success',data:{token:token}});

    }catch(err){
        console.log(err);
        res.status(404).json({status:'error'});
    }

}