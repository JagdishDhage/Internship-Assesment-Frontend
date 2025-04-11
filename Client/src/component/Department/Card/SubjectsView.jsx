import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import './SubjectsView.css';

function CourseSubjects() {
  const { universityId, courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const universityName = location.state?.universityName || 'University';
  const courseName = location.state?.courseName || 'Course';

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Fetch subjects only
    axios.get(`http://localhost:3000/uni/universities/${universityId}/courses/${courseId}/subjects`)
      .then(response => {
        setSubjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
        setError('Error fetching subjects. Please try again later.');
        setLoading(false);
      });
  }, [universityId, courseId]);

  const handleSubjectClick = (subject) => {
    // Navigate to NotesBySubject component with the necessary params and state
    navigate(`/university/${universityName.toLowerCase()}/course/${courseName.toLowerCase()}/subject/${subject.name.toLowerCase()}`, {
      state: { 
        subjectName: subject.name,
        universityName: universityName,
        courseName: courseName
      }
    });
  };

  return (
    <div className="subjects-container">
      <header className="subjects-header">
        <div className="breadcrumbs">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            <ArrowLeft size={16} />
            Universities
          </button>
          <span> &gt; </span>
          <button 
            onClick={() => navigate(`/university-courses/${universityId}`, {
              state: { universityName }
            })} 
            className="breadcrumb-link"
          >
            {universityName}
          </button>
          <span> &gt; </span>
          <span className="current-breadcrumb">{courseName}</span>
        </div>
        
        <h2 className="course-title">{courseName} - Subjects</h2>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading subjects...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      ) : (
        <div className="subjects-section">
          {subjects.length > 0 ? (
            <div className="subjects-grid">
              {subjects.map((subject) => (
                <div 
                  key={subject._id} 
                  className="subject-card"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <div className="subject-card-content">
                    <h4 className="subject-name">{subject.name}</h4>
                    {subject.code && (
                      <p className="subject-code">Code: {subject.code}</p>
                    )}
                    <p className="subject-description">
                      {subject.description ? 
                        (subject.description.length > 100 ? 
                          `${subject.description.substring(0, 100)}...` : 
                          subject.description) : 
                        'No description available'}
                    </p>
                    {subject.credits && (
                      <p className="subject-credits">Credits: {subject.credits}</p>
                    )}
                    <div className="view-notes-btn">View Notes</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-subjects">No subjects available for this course.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseSubjects;