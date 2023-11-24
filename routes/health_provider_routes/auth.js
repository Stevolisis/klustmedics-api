var express=require('express');
const router=express.Router();
const { register, login } = require('../../controllers/health_provider_controller/auth/index');


router.post('/register',register);
router.post('/login',login);

module.exports=router;