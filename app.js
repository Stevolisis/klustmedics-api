const express = require('express');
const app = express();
const cors=require("cors");
require('dotenv').config();
const mongoose=require('mongoose');
const formidableMiddleware = require('express-formidable');
const ejs=require("ejs");
const health_auth_route=require('./routes/health_provider_routes/auth');
const provider_profile_route=require('./routes/health_provider_routes/profile');
const patients_route=require('./routes/health_provider_routes/patients');
const resources_route=require('./routes/health_provider_routes/resources');
const health_medication_route=require('./routes/health_provider_routes/medications');
const patient_auth_route=require('./routes/patient_routes/auth');
const patient_profile_route=require('./routes/patient_routes/profile')
const medication_route=require('./routes/patient_routes/medication');
const review_route=require('./routes/review_route/index');

app.use(cors({
	origin:'*',
	credentials:true
}));

app.use(formidableMiddleware({multiples: true}));
app.use("/media",express.static('media'));
app.set('view engine','ejs');


// //routes
app.use('/health_provider/auth',health_auth_route);
app.use('/health_provider/profile',provider_profile_route);
app.use('/health_provider/patients',patients_route);
app.use('/health_provider/resources',resources_route);
app.use('/health_provider/medications',health_medication_route);

app.use('/patient/auth',patient_auth_route);
app.use('/patient/profile',patient_profile_route);
app.use('/patient/medication',medication_route);

app.use('/reviews',review_route);





//mongodb connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
    app.listen(80,(err,res)=>{
        if(err){
            console.log('Error '+ err)
        }else{
            console.log('Connected Successfully')
        }
    });
}).catch(err=>{
    console.log(err.message);
});






app.get('/',(req,res)=>{
    res.send('Halla');
});


// app.get('/2',async(req,res)=>{
// 	let name ="John Mike";
// 	let email='john@gmail.com'
// 	let passcode=38297;
	
// 	try{
// 	let emailTemplate=await ejs.renderFile("views/welcome1.ejs",{
//         name: name,
//         email: email,
//         passcode: passcode
// 	});
// 	  res.send(emailTemplate);
// 	}catch(err){
// 	res.send('<h1>Error</h1>')
// 	console.log(err)
// 	}
// });
