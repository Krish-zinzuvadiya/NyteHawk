import React from 'react';
import '../styles/About.css';

const About = () => {
return (
<div className="about-container">
<div className="about-hero">
<h1>About NyteHawk</h1>
<p>Your smart guide to essential services after dark</p>
</div>
  <div className="about-content">
    <section className="about-section">
      <h2>🌙 Our Mission</h2>
      <p>
        In today's fast-paced urban world, accessing essential services like pharmacies,
        ATMs, food outlets, and fuel stations during nighttime hours is often difficult.
        NyteHawk is built to solve this problem — by helping users instantly locate open
        and nearby late-night services using a smart, location-aware map platform.
      </p>
    </section>

    <section className="about-section">
      <h2>🚀 What We Do</h2>
      <p>
        NyteHawk provides a modern, mobile-responsive interface powered by real-time data
        from OpenStreetMap and Overpass API. Whether you're a student returning late,
        a traveler in a new city, or someone facing a medical emergency — our app lets
        you find:
      </p>
      <ul>
        <li>Open Pharmacies 💊</li>
        <li>Nearby ATMs 🏧</li>
        <li>Food & Cafes 🍴</li>
        <li>Fuel Stations ⛽</li>
        <li>And more coming soon!</li>
      </ul>
    </section>

    <section className="about-section">
      <h2>👨‍💻 Who We Are</h2>
      <p>
        We’re a team of passionate developers and designers from Ahmedabad, driven to
        build real-world solutions through technology. NyteHawk started as a group project,
        and now it’s evolving into a smart city utility app for everyone.
      </p>
    </section>

    <section className="about-section">
      <h2>🔐 Privacy & Transparency</h2>
      <p>
        We do not track your identity. Location data is used solely to improve your
        service-finding experience and is never stored or shared.
      </p>
    </section>

    <section className="about-section">
      <h2>📫 Get in Touch</h2>
      <p>
        Have feedback, questions, or ideas? Reach out to us at{' '}
        <a href="mailto:support@nytehawk.com">support@nytehawk.com</a> or connect via
        <a href="/contact"> our Contact page</a>.
      </p>
    </section>
  </div>
</div>
);
};

export default About;