import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // You'll need to create this CSS file

function UniversityCourses() {
  const { universityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const universityName = location.state?.universityName || 'University';
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    
    // Fetch courses for the selected university
    axios.get(`http://localhost:3000/uni/universities/${universityId}`)
      .then(response => {
        // Assuming the response data includes a courses array
        if (response.data && response.data.courses) {
          setCourses(response.data.courses);
        } else {
          setCourses([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching university courses:', error);
        setError('Error fetching courses. Please try again later.');
        setLoading(false);
      });
  }, [universityId]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm) || 
    (course.description && course.description.toLowerCase().includes(searchTerm))
  );

  // Handle course click to navigate to subjects
  const handleCourseClick = (course) => {
    navigate(`/university-courses/${universityId}/course/${course._id}`, {
      state: { 
        universityName: universityName,
        courseName: course.name
      }
    });
  };

  return (
    <div className="courses-container">
      <header className="courses-header">
        <div className="breadcrumbs">
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Universities</span>
          <span> &gt; </span>
          <span>{universityName}</span>
        </div>
        
        <h2 className="courses-title">Courses at {universityName}</h2>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search-button" 
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button className="search-button" onClick={() => handleSearchChange({ target: { value: searchTerm } })}>
            Search
          </button>
        </div>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="results-info">
            {filteredCourses.length === 0 ? (
              searchTerm ? 
                <p>No courses found matching "{searchTerm}"</p> :
                <p>No courses available for this university</p>
            ) : (
              <p>Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}</p>
            )}
          </div>

          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div 
                key={course._id} 
                className="course-card"
                onClick={() => handleCourseClick(course)}
                style={{ cursor: 'pointer' }}
              >
                <div className="course-card-content">
                  <h3 className="course-name">{course.name}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-details">
                    {course.duration && (
                      <p><strong>Duration:</strong> {course.duration} months</p>
                    )}
                    {course.level && (
                      <p><strong>Level:</strong> {course.level}</p>
                    )}
                  </div>
                  
                
                </div>
                <div className="course-card-footer">
                  <button className="view-subjects-btn">
                    {course.subjects?.length > 0 ? 
                      `View ${course.subjects.length} Subjects` : 
                      'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UniversityCourses;