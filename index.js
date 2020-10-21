const express=require("express");
const bodyParser=require("body-parser");
const nodemailer=require("nodemailer");
const path=require("path");
const { body } = require("express-validator");
const app=express();

app.set('view engine','twig');

// Body Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use('/public',express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render('contact')
})

app.post("/send",(req,res)=>{
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
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
      to: '18CS26@quest.edu.pk, saad26273043@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
})
app.listen(process.env.PORT || 3000,()=>console.log("App is RUnning"))