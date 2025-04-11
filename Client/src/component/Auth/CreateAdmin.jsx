import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './create.css'; // We'll create this CSS file

function CreateAdmin() {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/Admin/reg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Admin created successfully!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(data.message || 'Failed to create admin');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="create-admin-container">
      <h1 className="create-admin-title">Create Admin Account</h1>
      <form onSubmit={handleSubmit} className="create-admin-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={admin.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Admin
        </button>
      </form>
    </div>
  );
}

export default CreateAdmin;