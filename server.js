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
app.listen(8080,()=>{
    console.log("ruing");
})
