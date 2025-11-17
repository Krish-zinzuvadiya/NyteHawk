import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import CarouselSection from './CarouselSection';
import MiniBlogCards from './Blogs';
import Footer from './Footer';
import { ReactTyped } from "react-typed";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="logo"><img src="/images/logo1.png" alt="NyteHawk Logo" className="logo" /></div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button className="get-started" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
      </nav>

      <div className="landing-content">
  <h1>
    Welcome To, <br />
    <span className="gradient-text">NyteHawk</span>
  </h1>

  <p>
    When the city sleeps, we're awake. Get instant access to essential services 24/7 with nytehwk - your trusted night companion.
  </p>

  {/* NEW TYPING LINE */}
  <h2 className="typed-line">
    <ReactTyped
      strings={[
        "Nearby Essentials",
        "24/7 Emergency Support",
        "Anytime Anywhere",
        "Your Night Companion"
      ]}
      typeSpeed={60}
      backSpeed={35}
      loop
    />
  </h2>

  <div className="cta-buttons">
    <button onClick={() => navigate('/signup')}>Start Now →</button>
    <button className="learn-more" onClick={() => navigate('/about')}>Learn More</button>
  </div>
</div>

    </div>
        <section className="why-choose-section">
    <h2 className="why-heading">Why Choose <span className="brand">nytehwk</span>?</h2>
    <p className="why-subtext">
        We understand that life doesn't stop when the sun goes down. That's why we're here for you, all night long.
    </p>

    <div className="why-cards-container">
        <div className="why-card">
        <div className="why-icon"><ion-icon name="time-outline"></ion-icon></div>
        <h3 className="why-title">24/7 Availability</h3>
        <p className="why-text">Round-the-clock service when you need it most. No matter the hour, we're here.</p>
        </div>

        <div className="why-card">
        <div className="why-icon"><ion-icon name="flash-outline"></ion-icon></div>
        <h3 className="why-title">Lightning Fast</h3>
        <p className="why-text">Quick response times and instant service delivery. Your time is precious, especially at night.</p>
        </div>

        <div className="why-card">
        <div className="why-icon"><ion-icon name="shield-checkmark-outline"></ion-icon></div>
        <h3 className="why-title">Safe & Secure</h3>
        <p className="why-text">Your safety is our priority. All services are verified and secure for peace of mind.</p>
        </div>
    </div>
    </section>

    <CarouselSection />
    <MiniBlogCards />
    <Footer />
    </>
  );
};

export default LandingPage;
