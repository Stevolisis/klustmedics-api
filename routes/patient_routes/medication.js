var express=require('express');
const router=express.Router();
const { get_medications, get_medication, add_medication, edit_medication, delete_medication, medication_taken_status, medication_reminder_status } = require('../../controllers/patient_controller/medication/index');
const { verifyUser } = require('../../middlewares/verifyUser');


router.get('/get_medications/:day/:month/:year',verifyUser,get_medications);
router.get('/get_medication/:id',verifyUser,get_medication);
router.get('/reminder_status/:id/:status',verifyUser,medication_reminder_status);
router.get('/taken_status/:id',verifyUser,medication_taken_status);
router.post('/add_medication',verifyUser,add_medication);
router.patch('/edit_medication/:id',verifyUser,edit_medication);
router.delete('/delete_medication/:id',verifyUser,delete_medication);


module.exports=router;