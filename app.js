let express = require('express');
let app= express();
let twilio =require('twilio');
let bodyParser= require('body-parser');
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({
    extended: true
  }));

const accountsid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
const twilioNumber= process.env.TWILIO_NUMBER;


let client = new twilio(accountsid,authToken)

app.get('/',(req,res)=>{
  res.render('landing');
});

app.get('/store',(req,res)=>{
     res.render('home');
});

var Otp;
var Usernumber;
app.post("/number",function(req,res){
   Usernumber =req.body.phoneNumber;
  console.log("Usernumber",Usernumber);
   Otp= Math.floor(Math.random()*600000);
console.log("OTP",Otp);
  client.messages.create({
  body:`OTP for registration ${Otp}, This will expire in 1 min`,
  to:"+91" + Usernumber,
  from:twilioNumber
}).then((message=>{
console.log("message.SID",message.sid);
res.redirect("password");
}));

});



app.get("/password",function(req,res){
res.render("password")
});

app.get("/notFound",function(req,res){
  res.render("notFound")
  });


var onetimePassword=0;
app.post("/otp",function(req,res){
    const onetimePassword =req.body.password;
    console.log("onetimePassword",onetimePassword);
    console.log("OTP",Otp);
    if(onetimePassword==Otp){
      res.redirect("store")
    }else{
      res.redirect("notFound")
    }
  });

  app.post("/order",function(req,res){

    const orderId= Math.floor(Math.random()*10000000000000000);
    const Amount =Object.keys(req.body)[0];
    console.log("Amount",Amount);
    console.log("Usernumber",Usernumber);
    console.log("OTP",Otp);

    client.messages.create({
    body:`Your Order Id ${orderId} is Confirmed ,Bill:${Amount}`,
    to:"+91" + Usernumber,
    from:twilioNumber
  }).then((message=>{
  console.log("message.SID",message.sid);
  res.send("Itsss Doneeee")
  }));
  });

app.listen(3000,()=>{
    console.log("listening on port 3000");
});

