const express=require("express");
const app=express();
const path = require('path')

let port=process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.render('index')
});

app.post('/', function (req, res) {  
    res.send(req.body.Result+' Submitted Successfully!');
});

app.listen(port,()=>console.log("server running on port http://localhost:$(5000)"))