var express=require('express');
const router=express.Router();
const { get_resources, get_resource, add_resource, edit_resource, delete_resource } = require('../../controllers/health_provider_controller/resources/index');
const { verifyUser } = require('../../middlewares/verifyUser');


router.get('/get_resources/:limit',verifyUser,get_resources);
router.get('/get_resource/:id',verifyUser,get_resource);
router.post('/add_resource',verifyUser,add_resource);
router.patch('/edit_resource/:id',verifyUser,edit_resource);
router.delete('/delete_resource/:id',verifyUser,delete_resource);


module.exports=router;