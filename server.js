const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/contact", async (req, res) => {
    try {

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_PASS
            }
        });

        // Email to you
        await transporter.sendMail({
            from: process.env.BREVO_USER,
            to: "your-email@gmail.com",
            subject: `New Contact Form Message from ${name}`,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        // Auto reply
        await transporter.sendMail({
            from: process.env.BREVO_USER,
            to: email,
            subject: "Thank you for contacting us",
            html: `
                <h2>Thank You</h2>
                <p>Hello ${name},</p>
                <p>We have received your message successfully.</p>
                <p>Our team will get back to you soon.</p>
                <br>
                <p>Regards,</p>
                <p>Your Company Name</p>
            `
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.error("Email Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});