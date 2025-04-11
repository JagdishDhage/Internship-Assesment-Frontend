import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-grid">
        <Link to="/admin/universities" className="dashboard-card">
          <div className="card-icon">🏫</div>
          <h2>Manage Universities</h2>
          <p>Add, edit, and remove universities</p>
        </Link>
        <Link to="/admin/courses" className="dashboard-card">
          <div className="card-icon">📚</div>
          <h2>Manage Courses</h2>
          <p>View and modify course offerings</p>
        </Link>
        <Link to="/admin/subjects" className="dashboard-card">
          <div className="card-icon">📖</div>
          <h2>Manage Subjects</h2>
          <p>Manage subject details and prerequisites</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;