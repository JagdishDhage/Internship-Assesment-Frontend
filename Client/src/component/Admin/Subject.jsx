import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Add-Uni.css';

function SubjectsManagement() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/uni/subjects');
      setSubjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to fetch subjects');
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await axios.delete(`http://localhost:3000/api/subjects/${subjectId}`);
        fetchSubjects(); // Refresh subjects list
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete subject');
      }
    }
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/subjects/${editingSubject._id}`, editingSubject);
      fetchSubjects();
      setEditingSubject(null);
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update subject');
    }
  };

  const renderSubjectTable = () => {
    return (
      <table className="subjects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Credits</th>
            <th>Description</th>
            <th>Prerequisites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject._id}>
              <td>{subject.name}</td>
              <td>{subject.code}</td>
              <td>{subject.credit}</td>
              <td>{subject.description}</td>
              <td>{subject.prerequisites?.length > 0 ? subject.prerequisites.join(', ') : 'None'}</td>
              <td>
                <button 
                  onClick={() => handleEditSubject(subject)} 
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteSubject(subject._id)} 
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderEditForm = () => {
    if (!editingSubject) return null;

    return (
      <div className="edit-subject-form">
        <h2>Edit Subject</h2>
        <form onSubmit={handleUpdateSubject}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editingSubject.name}
              onChange={(e) => setEditingSubject({...editingSubject, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label>Code:</label>
            <input
              type="text"
              value={editingSubject.code}
              onChange={(e) => setEditingSubject({...editingSubject, code: e.target.value})}
              required
            />
          </div>
          <div>
            <label>Credits:</label>
            <input
              type="number"
              value={editingSubject.credit}
              onChange={(e) => setEditingSubject({...editingSubject, credit: parseInt(e.target.value)})}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={editingSubject.description}
              onChange={(e) => setEditingSubject({...editingSubject, description: e.target.value})}
            />
          </div>
          <div>
            <label>Prerequisites:</label>
            <input
              type="text"
              value={editingSubject.prerequisites?.join(', ') || ''}
              onChange={(e) => setEditingSubject({
                ...editingSubject, 
                prerequisites: e.target.value ? e.target.value.split(',').map(p => p.trim()) : []
              })}
            />
            <small>Separate multiple prerequisites with commas</small>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">Save Changes</button>
            <button 
              type="button" 
              onClick={() => setEditingSubject(null)} 
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="subjects-management">
      <div className="management-header">
        <h1>Subjects Management</h1>
        <Link to="/admin/subjects/add" className="add-button">+ Add New Subject</Link>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : subjects.length > 0 ? (
        <>
          {renderSubjectTable()}
          {editingSubject && renderEditForm()}
        </>
      ) : (
        <div className="no-data">No subjects found</div>
      )}
    </div>
  );
}

export default SubjectsManagement;