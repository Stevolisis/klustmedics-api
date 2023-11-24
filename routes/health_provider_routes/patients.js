var express=require('express');
const router=express.Router();
const { get_patients, get_patient, add_patient, edit_patient, delete_patient } = require('../../controllers/health_provider_controller/patients/index');
const { verifyUser } = require('../../middlewares/verifyUser');


router.get('/get_patients/:limit',verifyUser,get_patients);
router.get('/get_patient/:id',verifyUser,get_patient);
router.post('/add_patient',verifyUser,add_patient);
router.patch('/edit_patient/:id',verifyUser,edit_patient);
router.delete('/delete_patient/:id',verifyUser,delete_patient);


module.exports=router;