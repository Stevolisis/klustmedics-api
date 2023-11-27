var express=require('express');
const router=express.Router();
const { get_medications } = require('../../controllers/health_provider_controller/medications/index');
const { verifyUser } = require('../../middlewares/verifyUser');

router.get('/get_medications/:id',verifyUser,get_medications);


module.exports=router;