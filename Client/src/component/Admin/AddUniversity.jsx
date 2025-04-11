import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Add-Uni.css';

function UniversitiesManagement() {
  const [universities, setUniversities] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/uni/universities');
      console.log("API Response:", response.data); 

      const data = response.data;
      if (Array.isArray(data)) {
        setUniversities(data);
      } else if (data?.universities && Array.isArray(data.universities)) {
        setUniversities(data.universities);
      } else {
        setUniversities([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to fetch universities');
      setUniversities([]); // Ensure it’s always an array
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await axios.delete(`/api/universities/${id}`);
        setUniversities((prev) => prev.filter(uni => uni._id !== id));
      } catch (err) {
        alert('Failed to delete university');
      }
    }
  };

  return (
    <div className="universities-management">
      <div className="management-header">
        <h1>Universities Management</h1>
        <Link to="/admin/universities/add" className="add-button">
          + Add New University
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="universities-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Established</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.length > 0 ? (
              universities.map(university => (
                <tr key={university._id}>
                  <td>{university.name}</td>
                  <td>{university.location}</td>
                  <td>{new Date(university.established).getFullYear()}</td>
                  <td>{university.courses.length}</td>
                  <td>
                    <Link to={`/admin/universities/edit/${university._id}`} className="edit-button">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(university._id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No universities found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UniversitiesManagement;
