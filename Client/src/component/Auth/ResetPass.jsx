import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";

function ResetPass() {
  const { token } = useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0: none, 1: weak, 2: medium, 3: strong

  useEffect(() => {
    if (!token) {
      setIsError(true);
      setErrorMessage("Invalid or expired reset link.");
    }
  }, [token]);

  useEffect(() => {
    // Simple password strength checker
    if (!newPassword) {
      setPasswordStrength(0);
    } else if (newPassword.length < 8) {
      setPasswordStrength(1); // weak
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword
      )
    ) {
      setPasswordStrength(3); // strong
    } else {
      setPasswordStrength(2); // medium
    }
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setErrorMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 1500);

      // Uncomment this for real API call
      
      const response = await fetch(`http://localhost:3000/user/ResetPassword/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Password reset failed.");
      }

      setIsSuccess(true);
      
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      //setIsSubmitting(false); // Moved to setTimeout for demo
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-header">
        <h1>Reset Your Password</h1>
        <p>Enter your new password below.</p>
      </div>
      <div className="reset-password-card">
        {isError && (
          <div className="error-message">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "10px", flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{errorMessage}</p>
          </div>
        )}
        {isSuccess ? (
          <div className="success-message">
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <p>
              Password reset successfully! <a href="/login">Login here</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-field-container">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={passwordVisible ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
              {newPassword && (
                <div className="password-strength">
                  <div
                    className={`password-strength-bar ${
                      passwordStrength === 1
                        ? "strength-weak"
                        : passwordStrength === 2
                        ? "strength-medium"
                        : passwordStrength === 3
                        ? "strength-strong"
                        : ""
                    }`}
                  ></div>
                </div>
              )}
              {passwordStrength > 0 && (
                <div style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "var(--text-secondary)" }}>
                  Password strength: {passwordStrength === 1 ? "Weak" : passwordStrength === 2 ? "Medium" : "Strong"}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-field-container">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`reset-button ${isSubmitting ? "loading" : ""}`}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPass;