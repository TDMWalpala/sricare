const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config()
const MAIL_SETTINGS={
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  };
    
  const transporter = nodemailer.createTransport(MAIL_SETTINGS);
  
  module.exports.sendMail = async (email,msg) => {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: email, 
        subject: '',
        html:msg,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };