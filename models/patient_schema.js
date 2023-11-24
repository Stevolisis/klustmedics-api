const mongoose=require('mongoose');

const patientSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    provider_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'healthproviders',
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    health_condition:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date_of_birth:{
        type:String,
        required:true
    },
    profile_img:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    status:{
        type:String,
        required:true
    },
    activation_code:{
        type:String,
        required:true
    },
    // token:{
    //     type:String,
    //     required:true
    // },
    verified:Boolean,
    day:{
        type:String,
        required:true,
        immutable:true
    },
    month:{
        type:String,
        required:true,
        immutable:true
    },
    year:{
        type:String,
        required:true,
        immutable:true
    },
    created_at:{
        type:Date,
        default:()=>Date.now(),
        required:true,
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now(),
        required:true,
    }
})

//---------------------------------------------------
module.exports=mongoose.model('patients',patientSchema);