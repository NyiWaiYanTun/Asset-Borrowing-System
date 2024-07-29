const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const app = express();
const con = require('../config/db');
app.use(express.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '6531501224@lamduan.mfu.ac.th',
    pass: 'gtoz nopb slgp xjng'
  }
});

// Generate JWT token with user email encoded
function generateVerificationToken(email) {
  return jwt.sign({ email }, 'KTS', { expiresIn: '1h' });
}
async function sendEmail(email, res){
    const verificationToken = generateVerificationToken(email);
    try {
      await transporter.sendMail({
        from: '6531501224@lamduan.mfu.ac.th',
        to: email,
        subject: 'Email Verification',
        html: `Click <a href="http://localhost:4000/verify/${verificationToken}">here</a> to verify your email.`
      });
      res.status(200).send('Verification email sent');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending verification email');
    }
}
async function verifyToken(token, res){
    try {
        const decoded = jwt.verify(token, 'KTS');
        const email = decoded.email;
        
        con.query('UPDATE users SET isVerified= TRUE WHERE email= ?;', [email], (err, result)=>{
            if (err) {
                console.error('Server error:', err);
                res.status(500).send('server error');
              } else {
                console.log('verified');
                res.status(200).sendFile(path.join(__dirname, '../a_medium.html'));
              }
        })
      } catch (error) {
        console.error('Error verifying email:', error);
        res.status(400).send('Invalid or expired verification link.');
      }
}

module.exports = {
    sendEmail,
    verifyToken
  }
