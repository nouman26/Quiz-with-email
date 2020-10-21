const express=require("express");
const nodemailer=require("nodemailer");
const path=require("path");
const { body } = require("express-validator");
const app=express();

let port=process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.render('index')
});

app.post("/",(req,res)=>{
    us="18CS26@quest.edu.pk"
    const output = `
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Roll No: ${req.body.roll}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Result</h3>
    <p>${req.body.Result}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: 'noumanarain0@gmail.com', // generated ethereal user
        pass: '0302210676'  // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'noumanarain0@gmail.com', // sender address
      to: req.body.email,us,// list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Quiz Result', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });

    res.render('result')
});


app.listen(port,()=>console.log("server running on port http://localhost:$(5000)"))