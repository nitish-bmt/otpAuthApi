import express, { request, response, Router } from 'express';
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// app.use("/api/v1", Router);
const userOTP = [];


app.listen(PORT, () => {
  console.log(`server is up and running: http://localhost:${PORT}/`);
});

app.get('/ggmate', (request, response) => {
  response.send('gg mate!');
});

app.post('/sendOTP', (request, response) => {
  console.log(request.body);
  const { email } = request.body;
  sendOTP(email);
  response.send(`otp sent to ${email}`);
});

app.post('/authOTP', (request, response) => {
  const { email, otp } = request.body;
  response.send(auth(email, otp));

});

app.get('/sendOTPurl/:email', (request, response) => {
  const email = request.params.email;
  response.json(sendOTP(email));
});

app.get('/authOTPurl/:email/:otp', (request, response) => {
  
  const { email, otp } = request.params;
  console.log(email, otp);
  
  return response.status(200).json({
    otpStatus: auth(email, otp),
  });
});


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "nodemon.v8@gmail.com",
    pass: "krqxydwmweppdami",

  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendOTP(userEmail) {

  const ind = userOTP.map(usr => usr.email).lastIndexOf(userEmail);
  console.log("ind--",ind)
  if(ind != -1)
  userOTP.splice(ind, 1);

  try {
    const OTP = Math.floor(Math.random() * 10000);
    console.log(typeof (OTP));
    userOTP.push({ email: userEmail, otp: OTP });
    // console.log(userOTP);
    return userOTP;
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"AUTHENTICATOR" <auth@noreply.com>', // sender address
      to: `${userEmail}`, // list of receivers
      subject: "Verification OTP", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Your OTP for verification is ${OTP}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  catch (error) {
    console.log('OTP not sent', error)
  }
}

function auth(userEmail, otp) {
  const ind = userOTP.map(usr => usr.email).lastIndexOf(userEmail);
  // const ind = 0; 
  console.log(ind);
  if (ind === -1) {
    return 'INVALID_EMAIL'; //email not found
  }
  else if (userOTP[ind].otp == otp) {
    userOTP.splice(ind, 1);
    return 'AUTHENTICATED'; //authenticated
  }

  return 'INVALID_OTP'; //unauthorised
}

// main().catch(console.error);
