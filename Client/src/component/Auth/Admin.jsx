import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://learn-notes-kappa.vercel.app/user/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin),
        credentials: 'include', // Required for sending cookies
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Admin login successful!', { position: 'top-center' });
        setTimeout(() => {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        }, 2000);
      } else {
        toast.error(data.message || 'Admin login failed', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', { position: 'top-center' });
    }
  };

  const handleOnChange = (event) => {
    setAdmin((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className="admin-login">
      <form className="form">
        <div className="flex-column">
          <label>Admin Email</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter admin email"
            className="input"
            type="email"
            name="email"
            onChange={handleOnChange}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter admin password"
            className="input"
            type="password"
            name="password"
            onChange={handleOnChange}
          />
        </div>

        <button onClick={handleSubmit} className="button-submit" type="button">
          Admin Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
