// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const sendOTP = async () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/send-otp', { email });

      if (res.data.success) {
        setServerOtp(res.data.otp); // ⚠️ Only for testing. Don't show OTP in production
        setStep(2);
      } else {
        alert(res.data.message || 'No user found with this email.');
      }
    } catch (err) {
      console.error('OTP sending error:', err);
      alert('Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    if (otp.trim().length !== 6) {
      alert('OTP must be 6 digits.');
      return;
    }

    if (otp.trim() === String(serverOtp)) {
      setStep(3);
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  const updatePassword = async () => {
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/reset-password', {
        email,
        newPassword,
      });

      if (res.data.success) {
        alert('✅ Password updated successfully!');
        window.location.href = '/login';
      } else {
        alert(res.data.message || '❌ Failed to update password.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      alert('Error occurred while resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>🔐 Forgot Password</h2>

        {step === 1 && (
          <>
            <label>📧 Registered Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={sendOTP} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label>🔑 Enter OTP</label>
            <input
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <label>🛡️ New Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button onClick={updatePassword} disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
