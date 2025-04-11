import React, { useState } from 'react';
import './Forget.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/ForgotPassowrd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);

      } else {
        setIsError(true);
      }
      
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    if (email && email.includes('@')) {
      sendEmail();
    } else {
      setIsError(true);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card success-card">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2>Check your email</h2>
          <p>We've sent a password reset link to <span className="email-highlight">{email}</span></p>
          <button onClick={() => setIsSuccess(false)} className="back-button">Back to reset form</button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <h1>Forgot your password?</h1>
        <p>Don't worry, we'll help you reset it.</p>
      </div>
      <div className="forgot-password-card">
        
        {isError && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Please enter a valid email address.</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <button type="submit" disabled={isSubmitting} className={`reset-button ${isSubmitting ? 'loading' : ''}`}>
            {isSubmitting ? (
              <>
                <svg className="spinner" viewBox="0 0 24 24">
                  <circle className="spinner-path" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="spinner-arc" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                </svg>
                Sending Link...
              </>
            ) : 'Reset Password'}
          </button>
        </form>
        <div className="divider"><span>Remember your password?</span></div>
        <a href="/login" className="login-link">Back to Login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
