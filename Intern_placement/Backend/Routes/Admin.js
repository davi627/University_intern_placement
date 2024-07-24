import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Admin } from '../Models/Admin.js';

const router = express.Router();

// Register new admin
router.post('/register', async (req, res) => {
    try {
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const adminCount = await Admin.countDocuments();
        if (adminCount >= 1) {
            return res.status(400).json({ message: "Registration limit reached" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const admin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login admin
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.KEY, { expiresIn: '1h' });
        admin.password = undefined;

        return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({
            status: true,
            message: "Logged in",
            admin: { username: admin.username }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get current admin details
router.get('/current-admin', async (req, res) => {
  const token = req.cookies.token;
  console.log('Token:', token);  // Log token for debugging
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
      const decoded = jwt.verify(token, process.env.KEY);
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
      
      res.json(admin);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    try {
        const loggedInUser = await Admin.findOne({ email });
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'davidmbita001@gmail.com',
                pass: 'jtfq pvyu memx szjh'
            }
        });
        const token = jwt.sign({ id: loggedInUser._id }, process.env.KEY, { expiresIn: '5m' });

        var mailOptions = {
            from: 'davidmbita001@gmail.com',
            to: email,
            subject: 'Reset password',
            text: `http://localhost:5173/resetpassword`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 360000 }).json({ status: true, message: "Email sent" });
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/resetpassword', async (req, res) => {
    const token = req.cookies.token;
    const { password } = req.body;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        // Verify the token and decode the user ID
        const decoded = jwt.verify(token, process.env.KEY);
        const id = decoded.id;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await Admin.findByIdAndUpdate(id, { password: hashedPassword });
        if (!updatedUser) return res.status(404).json({ message: 'Admin not found' });

        return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
        return res.status(400).json({ status: false, message: 'Invalid or expired token' });
    }
});

export { router as AdminRouter };
