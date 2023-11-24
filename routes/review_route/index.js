var express=require('express');
const router=express.Router();
const { verifyUser } = require('../../middlewares/verifyUser');
const { get_reviews, get_review, add_review } = require('../../controllers/review_controller');



router.get('/get_reviews',verifyUser,get_reviews);
router.get('/get_review/:id',verifyUser,get_review);
router.post('/add_review',verifyUser, add_review );


module.exports=router;