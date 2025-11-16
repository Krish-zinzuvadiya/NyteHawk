// Footer.js - Redesigned modern multi-column footer
import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebookF, FaEnvelope, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-column logo-section">
        <a href="/home">
          <img src="/images/logo1.png" alt="Site Logo" className="footer-logo" />
        </a>
        <p>© {year} All rights reserved.</p>
      </div>

      <div className="footer-column">
        <h4>Customer Service</h4>
        <ul>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/help">Help</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Connect with Us</h4>
        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF className='abc'/></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram className='abc'/></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin className='abc' /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter className='abc'/></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub className='abc'/></a>
        </div>
      </div>

      <div className="footer-column subscribe-section horizontal-subscribe">
        <h4>Keep Up To Date</h4>
        <form
  onSubmit={async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const res = await fetch('https://nytehawk-backend-7.onrender.com/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message || 'Something went wrong');
    e.target.reset();
  }}
>
  <input type="email" name="email" placeholder="Enter Email Id" required />
  <button type="submit">Subscribe</button>
</form>

      </div>
    </footer>
  );
};

export default Footer;
