import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './University.css';

function University() {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Show loading state
    setLoading(true);
    
    axios.get('http://localhost:3000/uni/universities')
      .then(response => {
        setUniversities(response.data);
        setFilteredUniversities(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching universities:', error);
        setError('Error fetching universities. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter universities based on search term
    const filtered = universities.filter(university => 
      university.name.toLowerCase().includes(term) || 
      (university.description && university.description.toLowerCase().includes(term))
    );
    
    setFilteredUniversities(filtered);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredUniversities(universities);
  };

  // Handle university card click to view courses
  const handleUniversityClick = (university) => {
    // Navigate to university courses page
    navigate(`/university-courses/${university._id}`, {
      state: { universityName: university.name }
    });
  };

  return (
    <div className="university-container">
      <header className="university-header">
        <h2 className="university-title">Universities</h2>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search universities..."
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
          <p>Loading universities...</p>
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
            {filteredUniversities.length === 0 ? (
              <p>No universities found matching "{searchTerm}"</p>
            ) : (
              <p>Showing {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}</p>
            )}
          </div>

          <div className="university-grid">
            {filteredUniversities.map((university) => (
              <div 
                key={university._id} 
                className="university-card"
                onClick={() => handleUniversityClick(university)}
                style={{ cursor: 'pointer' }}
              >
                <div className="university-card-content">
                  <h3 className="university-name">{university.name}</h3>
                  <p className="university-description">{university.description}</p>
                </div>
                <div className="university-card-footer">
                  <div className="university-actions">
                    <button className="view-courses-btn">View Courses</button>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default University;