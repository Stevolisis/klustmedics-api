const mongoose=require('mongoose');

const notificationSchema=new mongoose.Schema({
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patients',
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
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
module.exports=mongoose.model('notifications',notificationSchema);