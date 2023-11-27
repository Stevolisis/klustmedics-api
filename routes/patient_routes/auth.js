var express=require('express');
const router=express.Router();
const { login } = require('../../controllers/patient_controller/auth/index');


router.post('/login',login);

module.exports=router;