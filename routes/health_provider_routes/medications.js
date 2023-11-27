var express=require('express');
const router=express.Router();
const { get_medication } = require('../../controllers/health_provider_controller/medications/index');
const { verifyUser } = require('../../middlewares/verifyUser');

router.get('/get_medication/:id',verifyUser,get_medication);


module.exports=router;