import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, updateProfileImage } from '../../../features/profile/profileSlice';
import './Profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Profile() {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  // Extract profile data from the Redux store
  const { image, username, university, loading, error } = useSelector((state) => state.profile);

  // On component mount, fetch the profile data from the server
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Handle the image change and dispatch an action to update Redux state
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateProfileImage(reader.result));
        setTimeout(() => setUploading(false), 500); // Simulate upload process
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/logout', {
        withCredentials: true,
      });
      console.log('Logout successful:', response.data);
      // Perform any additional logout actions (e.g., redirecting user)
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Display loading or error states if needed
  if (loading) return <div className="profile-loading">Loading your profile...</div>;
  if (error) return <div className="profile-error">Error loading profile: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        {image ? (
          <img src={image} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>
      
      <div className="profile-input-wrapper">
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={handleImageChange}
          className="profile-input"
          accept="image/*"
        />
        <label htmlFor="profileImage" className="profile-input-label">
          {uploading ? "Uploading..." : "Change Photo"}
        </label>
      </div>
      
      <h2 className="profile-username">{username || 'Username'}</h2>
      <p className="profile-university">{university || 'University'}</p>
      
      <div className="profile-details">
        <div className="profile-detail">
          <span className="profile-detail-label">Email:</span>
          <span className="profile-detail-value">user@example.com</span>
        </div>
        <div className="profile-detail">
          <span className="profile-detail-label">Member Since:</span>
          <span className="profile-detail-value">March 2025</span>
        </div>
      </div>
      <div className="navbar-actions" onClick={handleLogout}>
            <button className="btn-profile">
              <Link to="/">LogOut</Link>
            </button>
          </div>
    </div>
  );
}

export default Profile;