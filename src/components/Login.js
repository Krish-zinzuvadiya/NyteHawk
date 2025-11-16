import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6000); // Hide after 6 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email.endsWith('.com')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // 🟢 DIRECT LOGIN (NO DB)
    if (email === "temp@gmail.com" && password === "1234") {
      const dummyUser = { name: "Temp User", email: "temp@gmail.com" };
      localStorage.setItem("nytehawk-user", JSON.stringify(dummyUser));
      navigate("/home");
      setLoading(false);
      return;
    }

    // Try API login
    try {
      const res = await axios.post('https://nytehawk-backend-7.onrender.com/api/login', {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('nytehawk-user', JSON.stringify(res.data.user));
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {/* 🔵 TEMP CREDENTIAL POPUP */}
      {showPopup && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "white",
          color: "black",
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "14px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 9999
        }}>
          <strong>Temporary Access</strong><br />
         <strong>Email:</strong>  <span style={{ color: "black" }}>temp@gmail.com</span><br />
          <strong>Pass:</strong> <span style={{ color: "black" }}>1234</span>
        </div>
      )}

      <div className="login-left">
        <img src="/images/1.png" alt="login illustration" />
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="brand">Welcome to <span className="highlight">NyteHawk</span></h2>
          <p>Your Journey Begins Here</p>

          <form onSubmit={handleLogin}>
            <label>Email ID</label>
            <input
              type="email"
              placeholder="kunal@bvp.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p>You Don't Have an Account? <a href="/signup" className="signup-link">Create Account</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
