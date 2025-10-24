import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email.endsWith('.com')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
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
      <div className="login-left">
        <img src="/images/1.png" alt="login illustration"/>

      </div>
      <div className="login-right">
        <div className="login-card">
          <h2 className="brand">
  Welcome to <span className="highlight">NyteHawk</span></h2>
          <p> Your Journey Begins Here</p>
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
            <p>You Don't Have an Account? <a href="/signup" class="signup-link">Create Account</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
