const path = require('path');
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
});

app.use(express.static(__dirname + '/../client/public'));

app.post("/send", function (req, res) {
    let mailOptions = {
        from: req.body.from,
        name: req.body.name,
        companyName: req.body.companyName,
        to: 'tkachikmarine@gmail.com',
        subject: req.body.subject,
        html: `
      New message from: <b>${req.body.from}</b>
        <p>${req.body.text}</p>
`
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
    });
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log("message sent");
            res.end("sent");
        }
    });
});

app.listen(3000, () => console.log('Server is running on http://127.0.0.1:3000'));