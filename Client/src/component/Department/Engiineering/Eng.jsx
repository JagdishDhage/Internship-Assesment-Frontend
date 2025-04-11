import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import SubjectsView from '../Card/SubjectsView';
import './Eng.css'
import { setSelectedCourseId } from '../../../features/profile/cource';

function Eng() {
  const departmentId = useSelector(state => state.department?.selectedDepartment);
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (!departmentId) {
      setError("No department selected. Please choose a department. from back page");
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dept/departments/${departmentId}/courses/`);
        if (!response.ok) throw new Error('Failed to fetch courses.');
        
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No courses available for this department.');
        }

        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [departmentId]);

  if (loading) return <div className="dept loading-message">Loading courses...</div>;
  if (error) return <div className="dept error-message">{error}</div>;

  return (
    <div className="dept">
      {selectedCourse ? (
        <SubjectsView 
          departmentId={departmentId} 
          courseId={selectedCourse._id} 
          onBack={() => setSelectedCourse(null)}
        />
      ) : (
        <div>
          <h2>Engineering Courses</h2>
          {courses.length === 0 ? (
            <p className="no-courses">No courses available.</p>
          ) : (
            <div className="card-container">
              {courses.map(course => (
                <Card
                  key={course._id}
                  title={course.name}
                  description={course.description}
                  onLearnMore={() => {
                    setSelectedCourse(course);
                    dispatch(setSelectedCourseId(course._id));
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Eng;
