import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { Player } from "@lottiefiles/react-lottie-player";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: '', dob: '',
    password: '', confirmPassword: '', pincode: '',
    house: '', area: '', landmark: '', state: '', city: '',
    relative1Name: '', relative1Phone: '', relative2Name: '', relative2Phone: ''
  });

  const [cities, setCities] = useState([]);  // To store cities based on state selection

  const stateCityMap = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur'],
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setForm({ ...form, state: selectedState });

    // Update cities based on selected state
    if (stateCityMap[selectedState]) {
      setCities(stateCityMap[selectedState]);
    } else {
      setCities([]); // Clear the cities if no valid state selected
    }
  };

  const validateStep1 = () => {
    const { name, email, phone, gender, dob, password, confirmPassword } = form;
    if (!name || !email.includes('@') || !email.endsWith('.com') || !phone || !gender || !dob) {
      alert("Please fill all fields correctly in Step 1.");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://nytehawk-backend-7.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (err) {
      alert('Error submitting form.');
      console.error(err);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <div className="signup-card">
          <h2>🚀 Create Account</h2>
          <p className="step-indicator">Step {step} of 3</p>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <input name="name" placeholder="Full Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} required >
                  <option selected hidden blocked>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password (min 8 chars)" onChange={handleChange} required />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
              </>
            )}

            {step === 2 && (
              <>
                <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
                <input name="house" placeholder="Flat, House no., Building, etc." onChange={handleChange} required />
                <input name="area" placeholder="Area, Street, Sector, Village" onChange={handleChange} required />
                <input name="landmark" placeholder="E.g. near Apollo Hospital" onChange={handleChange} />
                <select name="state" onChange={handleStateChange} required>
                  <option value="">Choose a state</option>
                  {Object.keys(stateCityMap).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <select name="city" onChange={handleChange} required>
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <input name="relative1Name" placeholder="Relative 1 Name" onChange={handleChange} required />
                <input name="relative1Phone" placeholder="Relative 1 Phone" onChange={handleChange} required />
                <input name="relative2Name" placeholder="Relative 2 Name" onChange={handleChange} required />
                <input name="relative2Phone" placeholder="Relative 2 Phone" onChange={handleChange} required />
              </>
            )}

            <div className="step-buttons">
              {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
              {step < 3 ? (
                <button type="button" onClick={() => {
                  if (step === 1 && !validateStep1()) return;
                  setStep(step + 1);
                }}>Next</button>
              ) : (
                <button type="submit">Submit</button>
              )}
            </div>
          </form>
          <p className="login-link">Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
      <div className="signup-right">
        <Player
              autoplay
              loop
              src="/images/Animations/Profile.json"
              style={{ height: "90%", width: "90%" }}
            />
      </div>

      <div className="back-btn-container">
  <button className="back-btn" onClick={() => navigate(-1)}>
    <img src="/images/arrow.png" alt="Back" height="40px"/>
  </button>
</div>
    </div>
  );
};

export default Signup;
