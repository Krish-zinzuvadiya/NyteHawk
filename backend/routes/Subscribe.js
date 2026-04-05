// backend/subscribe.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ✅ Subscriber schema
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema, 'Subscribers');

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ✅ POST /api/subscribe
router.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already subscribed.' });
    }

    await Subscriber.create({ email });

    // Send welcome email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thanks for subscribing to NyteHawk!',
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
    <h2 style="font-size: 16px;">🚀 Welcome to the <strong>NyteHawk Family!</strong></h2>
    <p>Thank you for subscribing. You’ll now receive our latest updates and news directly in your inbox.</p>

    <h3 style="margin-top: 20px; color:#444;">✨ Features We Provide:</h3>
    <ul style="line-height: 1.6; color: #555;">
      <li>🏥 Best Hospitals</li>
      <li>💊 Nearby Pharmacies</li>
      <li>🍽️ Restaurants around you</li>
      <li>🏧 ATMs at your service</li>
      <li>⛽ Nearby Fuel Stations</li>
      <li>🔜 And more upcoming features!</li>
    </ul>

    <p style="margin-top: 20px;">Regards,<br><strong>Team NyteHawk</strong></p>

    <div style="margin-top: 25px;">
      <a href="https://github.com/krishrami09" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="24" height="24" />
      </a>
      <a href="https://www.instagram.com/krish_zinzuvadiya09" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" height="24" />
      </a>
    </div>
  </div>
`
    });

    res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (err) {
    console.error('❌ Subscription Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
