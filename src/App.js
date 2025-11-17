// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainHome from './components/MainHome';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import BackToTop from './components/Back_To_Top'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const isLoggedIn = localStorage.getItem('nytehawk-user');

  return (
    <>
    <Router>
      <Routes>
        {/* Landing / Redirect route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <>
              <LandingPage />
              <BackToTop />
              </>
            )
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* Main App routes */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <MainHome />
              <Footer />
              <BackToTop />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Services />
              <Footer />
              <BackToTop />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
              <BackToTop />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
              <BackToTop />
            </>
          }
        />

        <Route
          path="/help"
          element={
            <>
              <Navbar />
              <Help />
              <Footer />
              <BackToTop />
            </>
          }
        />

        {/* Profile route with guard */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Profile />
                <Footer />
                <BackToTop />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      
      </Routes>
    </Router>
             {/* Vercel Analytics */}
      <Analytics />
    </>
  );
}

export default App;
