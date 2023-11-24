var express=require('express');
const router=express.Router();
const { update_profile, get_doctor_contacts, get_patient } = require('../../controllers/patient_controller/profile/index');
const { verifyUser } = require('../../middlewares/verifyUser');

function allowed_fields(req,res,next){
    if(req.fields.full_name||req.fields.phone_number){
        next();
    }else{
        res.status(404).json({status:'Field not allowed'});
    }
}

router.post('/update_profile',verifyUser,allowed_fields,update_profile);
router.get('/get_patient',verifyUser,get_patient);
router.get('/get_doctor_contacts',verifyUser,get_doctor_contacts);



module.exports=router;