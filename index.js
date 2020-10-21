const express=require("express");
const app=express();
const path = require('path')

let port=process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.post('/', function (req, res) {  
    res.send(req.body.Result+' Submitted Successfully!');
});

app.listen(port,()=>console.log("server running on port http://localhost:$(3000)"))