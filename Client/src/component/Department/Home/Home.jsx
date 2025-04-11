import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../Home/Profile/Profile';
import Navbar from '../../Navigation/Navbar';
import Engineering from '../Engiineering/Eng.jsx';
import './Home.css'

// Map department keys to their corresponding components.
const departmentComponents = {
  engineering: Engineering,
  //science: Science,
 // pharmacy: Pharmacy,
};

function cource() {
  const { department } = useParams(); // Extracts the department from the URL
  const Component = department && departmentComponents[department.toLowerCase()];

  return (
    <div className="Home">
     
    <div className="profile-section">
      <Profile />
    </div>

   
    <div className="other-section">
      <div className="navbar-container">
        <Navbar />
      </div>
      <main className="content">
      <div className="card-container">
      {Component ? (
        <Component />
      ) : (
        <div>
          <h2>Department Not Found</h2>
          <p>Please select a valid department. on back page </p>
        </div>
      )}
      </div>
    </main>
    </div>
  </div>
  );
}

export default cource;
