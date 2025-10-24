// Updated Profile.js with editable fields including emergency contacts
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('nytehawk-user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && parsedUser.email) {
            setUser(parsedUser);
            setForm(parsedUser);
          } else {
            navigate('/');
          }
        } catch (err) {
          console.error('Error parsing user data:', err);
          navigate('/');
        }
      } else {
        navigate('/');
      }
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nytehawk-user');
    window.location.href = '/';
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200) {
        alert('Profile updated successfully!');
        localStorage.setItem('nytehawk-user', JSON.stringify(data.user));
        setUser(data.user);
        setEditing(false);
      } else {
        alert(data.message || 'Update failed.');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('An error occurred while updating profile.');
    }
  };

  if (loading) return null;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        {editing ? (
          <>
            <input name="name" value={form.name || ''} onChange={handleChange} />
            <input name="dob" value={form.dob || ''} onChange={handleChange} type="date" />
            <input name="gender" value={form.gender || ''} onChange={handleChange} />
            <input name="phone" value={form.phone || ''} onChange={handleChange} />
            <input name="house" value={form.house || ''} onChange={handleChange} placeholder="House / Flat" />
            <input name="area" value={form.area || ''} onChange={handleChange} placeholder="Area" />
            <input name="landmark" value={form.landmark || ''} onChange={handleChange} placeholder="Landmark" />
            <input name="city" value={form.city || ''} onChange={handleChange} />
            <input name="state" value={form.state || ''} onChange={handleChange} />
            <input name="pincode" value={form.pincode || ''} onChange={handleChange} />
            <input name="relative1Name" value={form.relative1Name || ''} onChange={handleChange} placeholder="Relative 1 Name" />
            <input name="relative1Phone" value={form.relative1Phone || ''} onChange={handleChange} placeholder="Relative 1 Phone" />
            <input name="relative2Name" value={form.relative2Name || ''} onChange={handleChange} placeholder="Relative 2 Name" />
            <input name="relative2Phone" value={form.relative2Phone || ''} onChange={handleChange} placeholder="Relative 2 Phone" />
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.house}, {user.area}, {user.landmark}, {user.city}, {user.state} - {user.pincode}</p>
            <p><strong>Emergency Contact 1:</strong> {user.relative1Name} - {user.relative1Phone}</p>
            <p><strong>Emergency Contact 2:</strong> {user.relative2Name} - {user.relative2Phone}</p>
            <button onClick={() => setEditing(true)}>Update Details</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;