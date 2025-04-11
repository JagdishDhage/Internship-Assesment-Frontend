import React, { useState, useEffect } from 'react';
import './Subjects.css';
import { useNavigate } from 'react-router-dom';
function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
 const navigate = useNavigate();
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/uni/subjects');
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Extract unique categories from course codes (first 3 letters)
  const categories = subjects.length > 0 
    ? ['All', ...new Set(subjects.map(subject => subject.code.substring(0, 3)))]
    : ['All'];

  // Filter subjects based on category and search term
  const filteredSubjects = subjects.filter(subject => {
    const matchesCategory = selectedCategory === 'All' || subject.code.startsWith(selectedCategory);
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="subjects-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subjects-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }
  const handleNavigate=(subject)=>{
    navigate(`/subjects/${subject.name}`);
  }
  return (
    <div className="subjects-container">
      <div className="subjects-header">
        <h1>Browse Subjects</h1>
        <p>Access comprehensive notes for all the courses offered</p>
      </div>

      <div className="subjects-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="subjects-stats">
        <p>Showing <span>{filteredSubjects.length}</span> out of <span>{subjects.length}</span> subjects</p>
      </div>

      <div className="subjects-grid">
        {filteredSubjects.map(subject => (
          <div key={subject._id} className="subject-card">
            <div className="subject-card-header">
              <h3>{subject.name}</h3>
              <span className="subject-code">{subject.code}</span>
            </div>
            <p className="subject-description">{subject.description}</p>
            <div className="subject-details">
              <div className="detail-item">
                <span className="detail-label">Credits:</span>
                <span className="detail-value">{subject.credit}</span>
              </div>
              {subject.prerequisites && subject.prerequisites.length > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Prerequisites:</span>
                  <div className="prerequisites-list">
                    {subject.prerequisites.map((prereq, index) => (
                      <span key={index} className="prerequisite-tag">{prereq}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="access-notes-btn" onClick={() => handleNavigate(subject)}>Access Notes</button>
          </div>
        ))}
      </div>
      
      {filteredSubjects.length === 0 && (
        <div className="no-results">
          <img src="/api/placeholder/150/150" alt="No results" />
          <h3>No subjects found</h3>
          <p>Try adjusting your search criteria or check back later</p>
        </div>
      )}
    </div>
  );
}

export default Subjects;