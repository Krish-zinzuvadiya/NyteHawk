// src/components/Contact.js
import React, { useState } from 'react';
import '../styles/Contact.css';
import { FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Server response:', data);
      setStatus(data.success ? '✅ Message Sent!' : '❌ Failed to send');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error sending message');
    }
  };

  return (
    <div className="contact-container">
      <div className="team-section">
        <h2>Team NyteHawk</h2>
        <ul>
          <li>
            Krish Zinzuvadiya <a href="https://github.com/Krish-zinzuvadiya"><FaGithub /></a>
          </li>
          <li>
            Henil Shah <a href="https://github.com/henil7781"><FaGithub /></a>
          </li>
          <li>
            Aaryan Chauhan <a href="https://github.com/aaryan-chauhan"><FaGithub /></a>
          </li>
          <li>
            Vishwa Malviya <a href="#"><FaGithub /></a>
          </li>
        </ul>
      </div>

      <div className="form-section">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send</button>
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
