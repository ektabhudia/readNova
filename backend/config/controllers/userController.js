import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const id = await User.createUserManual(name, email, password);
    res.status(201).json({ message: "User created", id });
  } catch (err) {
    next(err);
  }
};
export const resetPassMailVerify = async (req, res) => {
  const { email } = req.body;

  try {
    const mail = await User.resetMailVerification(email);

    if (!mail || mail.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (mail[0].Status === 1) {
      const info = await sendOTP(email, mail[0].Code);
      return res.status(200).json({
        status:1,
        message: "OTP sent successfully",
        emailResponse: info.response, // include transporter info if needed
      });
    } else {
      return res.status(404).json({
        message: "Email not found in system",
        status: mail[0].Status,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


console.log("EMAIL_USER11:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  // service: "gmail", // or use SMTP
  host: "smtp.gmail.com",
  port: 465,               // 465 (secure) or 587 (TLS)
  secure: true,  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTP(email, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your OTP code is: ${code}. It will expire in 5 minutes.`,
  };
   try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response); // Gmail usually returns "250 OK ..."
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
}
export default { getUsers, addUser , resetPassMailVerify};
