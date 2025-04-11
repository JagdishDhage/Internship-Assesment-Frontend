import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './email.css';

function EmailVerification() {
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (!token) {
        setError('Invalid verification link. No token provided.');
        setVerifying(false);
        return;
      }
      
      try {
        const response = await axios.get(
          `http://localhost:3000/newsLetter/verify?token=${token}`,
          { withCredentials: true }
        );
        
        setSuccess(true);
        setVerifying(false);
      } catch (error) {
        console.error('Email verification error:', error);
        setError(error.response?.data?.error || 'Failed to verify email. The link may be expired or invalid.');
        setVerifying(false);
      }
    };
    
    verifyEmail();
  }, [location.search]);
  
  const handleRedirect = () => {
    navigate('/');
  };
  
  return (
    <div className="email-verification-container">
      <div className="email-verification-content">
        <h1>Email Verification</h1>
        
        {verifying ? (
          <div className="verification-loading">
            <p>Verifying your email address...</p>
            <div className="loading-spinner"></div>
          </div>
        ) : success ? (
          <div className="verification-success">
            <h2>Verification Successful!</h2>
            <p>Your email has been successfully verified. You will now receive our newsletter updates.</p>
            <button className="primary-btn" onClick={handleRedirect}>
              Return to Homepage
            </button>
          </div>
        ) : (
          <div className="verification-error">
            <h2>Verification Failed</h2>
            <p>{error}</p>
            <button className="primary-btn" onClick={handleRedirect}>
              Return to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;