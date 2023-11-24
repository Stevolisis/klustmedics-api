const Reviews = require("../../models/review_schema");

exports.get_reviews=async (req,res)=>{
    try{
        const {limit}=req.params;
        const reviews_get=await Reviews.find({}).limit(limit).sort({_id:-1});
        res.status(200).json({status:'success',data:reviews_get});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}

exports.get_review=async (req,res)=>{
    
    try{
        const {id}=req.params;
        const review=await Reviews.findOne({_id:id});
        res.status(200).json({status:'success',data:review});
    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}

exports.add_review=async (req,res)=>{

    try{
        const { star_rate, comment, id }=req.fields;
        const date=new Date();

        const new_review = new Reviews({
            patient_id:id,
            star_rate:star_rate,
            comment:comment,
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear()
        })
        await new_review.save();
        res.status(200).json({status:'success'});

    }catch(err){
        console.log(err);
        res.status(404).json({status:err.message});
    }
}
