const bcrypt=require("bcryptjs");
const nodemailer=require("nodemailer");
require('dotenv').config();
const jwt=require("jsonwebtoken");
const ejs=require("ejs");
const path=require("path");
const { cloudinary } = require('../services/cloudinary');

const validImagetype=['jpg','JPG','png','PNG','jpeg','JPEG','gif','GIF','webp','WEBP'];
//----------Validate Image-------------
function validateImage(req,res){
  if(!validImagetype.includes(req.files.img.type.split('/')[1],0)) {
    res.status(200).json({status:'Invalid Image Type'});
    return;
  }else if(req.files.img.size >=1048576 ) {
      res.status(200).json({status:'Image Size must be less than 1mb'});
      return;
  }
}

//------------Single Upload-------------
async function imgUpload(file) {
    try{ 
      const img = await cloudinary.uploader.upload(file.path);
      return img;
    }catch(err){
      console.log(err);
      throw new Error('Error uploading image')
    };
}
  
  //-------------Multi Upload-------------
  async function multimgUpload(files){
    
    try{
        const filesSave=[];
    
            for (let i = 0; i < files.length; i++) {
            const img=await cloudinary.uploader.upload(files[i].path);
            filesSave.push({public_id:img.public_id,url:img.secure_url});  
            }
    
        return filesSave;
    
    }catch(err){
        throw new Error('Error uploading images')
    }
}




//-------------Delete Single Image-----------------
async function deleteImage(id){
    try{
      const deleteFile=await cloudinary.uploader.destroy(id);
      return deleteFile;
    }catch(err){
      throw new Error(err.message);
    }
  }
  
  //-------------Delete Multiple Image-----------------
  function deleteImages(files){
    const filesDelete=[];
    try{
      files.map(async file=>{
        if(file.name){
          const fileDelete=await cloudinary.uploader.destroy(file.img.public_id);
          filesDelete.push(fileDelete);
        }else{
          const fileDelete=await cloudinary.uploader.destroy(file.public_id);
          filesDelete.push(fileDelete);
        }
  
      });
    }catch(err){
      throw new Error(err.message);
    }
}


//------------Hash Passwords---------------
async function hashPassword(password) {

    try{console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii: ',password)

        let hashedPassword=await bcrypt.hash(password,10);
        return hashedPassword; 

    }catch{
        throw new Error('Password Encryption Failed')
    }
}


//------------Validate Password-------------
async function validatePassword(password,passwordToValidate) {

    try{
        const checkPassword=await bcrypt.compare(password, passwordToValidate);
        if(!checkPassword) return false
        return true;

    }catch{
        return false
    }
}



//------------Generate Token-------------
function generateToken(id,duration) {

    try{
        const token = jwt.sign({ id: id }, process.env.JWT_PASS, { expiresIn: duration });
        if(!token) throw new Error('Generate Token Error')
        return token;

    }catch{
        throw new Error('Generate Token Error')
    }
}

//------------Validate Token-------------
function validateToken(token) {
  console.log('token',token||'pppppppppp');
    try{
        const verify=jwt.verify(token,process.env.JWT_PASS);
        console.log('verify',verify||'kkkkkkkkkkkkkkk');
        if(!verify) return false
        return verify;

    }catch{
        return false
    }
}
  
//----------------Send Email-----------------

async function sendMail(template, subject, toEmail, data) {

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASS,
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    const emailTemplate=await ejs.renderFile(`${path.dirname(__dirname)}/views/${template}.ejs`,data);
  
    var mailOptions = {
      from: 'harmonicsub8@gmail.com',
      to: toEmail,
      subject: subject,
      html: emailTemplate
    };
  
    try{
        const send=await transporter.sendMail(mailOptions);
        if(!send) return false;
        return true
    }catch(err){
        throw new Error(err.message);
    }
}


//---------Generate setLength of Random Number-------
function randomFixedInteger(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}





module.exports={validateImage,imgUpload,multimgUpload,deleteImage,deleteImages,hashPassword,validatePassword,sendMail,
    generateToken,validateToken,randomFixedInteger};
