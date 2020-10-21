const express=require("express");
const app=express();
const path = require('path')

let port=process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine','twig');
app.set('views','./Public/views');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/admin",(req,res)=>{
    
});

app.post('/', function (req, res) {  
    res.send(req.body.Result+' Submitted Successfully!');
});

app.listen(port,()=>console.log("server running on port http://localhost:$(3000)"))