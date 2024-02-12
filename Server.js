const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 
require('dotenv').config();


// NodeMailer transporter configuration
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Route to send email
app.post('/send-email', async (req, res) => {
    const { Name, Email, Project, Message } = req.body;

    // HTML email template
    let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                /* Your CSS styles */
            </style>
        </head>
        <body>
            <div>
                <h2>Project Inquiry</h2>
                <p><strong>Name:</strong> ${Name}</p>
                <p><strong>Email:</strong> ${Email}</p>
                <p><strong>Project:</strong> ${Project}</p>
                <p><strong>Message:</strong></p>
                <p>${Message}</p>
                <p>This email was sent from our website.</p>
            </div>
        </body>
        </html>
    `;

    try {
        // Sending the email
        await transporter.sendMail({
            from: "CoCreateLabs",
            to: process.env.EMAIL_RECIPIENT, // Use environment variable for recipient
            subject: "New Opportunity",
            html: template,
        });
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

// Default route
app.get('/', (req, res) => {
    res.status(200).send('Hello from the backend!');
});

// Start the server

mongoose.connect("mongodb+srv://portfolio:babita123@cluster0.thahtnv.mongodb.net/")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
