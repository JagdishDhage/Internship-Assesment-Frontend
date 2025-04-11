import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Add-Uni.css';

function CoursesManagement() {
  const [universities, setUniversities] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('/api/universities');
      console.log("API Response:", response.data); // Debugging API response

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
      setUniversities([]); // Ensure it's always an array
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (uniId, courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/universities/${uniId}/courses/${courseId}`);
        fetchUniversities(); // Refresh universities to update course list
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  return (
    <div className="courses-management">
      <div className="management-header">
        <h1>Courses Management</h1>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : universities.length > 0 ? (
        universities.map(university => (
          <div key={university._id} className="university-courses-section">
            <h2>{university.name} Courses</h2>
            <Link 
              to={`/admin/universities/${university._id}/courses/add`} 
              className="add-button"
            >
              + Add Course
            </Link>
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Duration</th>
                  <th>Subjects</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {university.courses && university.courses.length > 0 ? (
                  university.courses.map(course => (
                    <tr key={course._id}>
                      <td>{course.name}</td>
                      <td>{course.level}</td>
                      <td>{course.duration} months</td>
                      <td>{course.subjects?.length || 0}</td>
                      <td>
                        <Link 
                          to={`/admin/universities/${university._id}/courses/edit/${course._id}`} 
                          className="edit-button"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteCourse(university._id, course._id)} 
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No courses available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="no-data">No universities found</div>
      )}
    </div>
  );
}

export default CoursesManagement;
