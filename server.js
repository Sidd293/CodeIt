const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { request } = require('express');
const app = express();
const Schema = mongoose.Schema 
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
mongoose.connect("mongodb+srv://sidhu:7398438689@mernapp.oucv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
usersSchema = new Schema({
name : String,
hobby : String,
});



app.post("/",async (req,res)=>{
   const  username = req.query.username;

    console.log(req.query.username);
    const User = mongoose.model("User",usersSchema);

const f = User.findOne({name : username},(err,found)=>{
if(err) res.send(err) ; else if(found) res.send("already present"+username); else {
    const siddhartha = new User({
        name : username,
        hobby  : "cricket",
    })
    siddhartha.save(); res.send("data sent");
}
})

})
app.get("/",(req,res)=>{
    res.send("api working");
}
        
)



let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siddharthabajpai.temp@gmail.com",
    pass: "sidd293@123",
  },
});


mongodb+srv://admin:<password>@cluster0.4py1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const Certificate = mongoose.model("Certificate", certificateSchema);

certificate = new Certificate({
   subject : req.body.subject,
   score : req.body.score,
   date : today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
  user  : req.body.name,
});

 let mailOptions = {
      from: "siddharthabajpai.temp@gmail.com",
      to: req.body.email,
      subject: subject,
      text: "hello you can download your certificate from  https://certificate-brainlox.herokuapp.com/certificate/"+doc.id,
    
    };
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("email sent");
        res.send("email sent");
      })


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siddharthabajpai.temp@gmail.com",
    pass: "sidd293@123",
  },
});


app.listen(8080,()=>{
    console.log("ruing");
})
