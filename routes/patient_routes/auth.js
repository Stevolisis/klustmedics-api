var express=require('express');
const router=express.Router();
const { account_activation } = require('../../controllers/patient_controller/auth/index');


router.post('/account_activation',account_activation);

module.exports=router;