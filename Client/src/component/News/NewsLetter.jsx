import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './News.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    setLoading(true);
    console.log("Sending request with email:", email);
  
    try {
      const response = await axios.post(
        'http://localhost:3000/newsLetter/subscribe',
        { email },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
  
      toast.success(response.data.message || 'Successfully subscribed to newsletter!');
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      console.log("Error response:", error.response?.data);
      toast.error(error.response?.data?.error || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <h2>Stay Updated with New Notes</h2>
        <p>Get notified when we add new notes for your subjects</p>
        
        {submitted ? (
          <div className="success-message">
            <h3>Thank you for subscribing!</h3>
            <p>Please check your email to verify your subscription.</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              className="primary-btn" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Newsletter;