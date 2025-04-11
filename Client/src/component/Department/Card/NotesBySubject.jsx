import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Search, FileText, Download, Tag } from "lucide-react";
import "./NotesBySubject.css";

function NotesBySubject() {
  const { subject, university, course } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const subjectName = location.state?.subjectName || subject || "Subject";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let url;
        if (university && course && subject) {
          url = `http://localhost:3000/api/university/${encodeURIComponent(university)}/course/${encodeURIComponent(course)}/subject/${encodeURIComponent(subject.toLowerCase())}`;
        } else {
          url = `http://localhost:3000/api/subject/${encodeURIComponent(subject.toLowerCase())}`;
        }
     
        const response = await axios.get(url);
        setNotes(response.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError(err.response?.data?.error || err.message || "Error fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [university, course, subject]);

  const filteredNotes = notes.filter((note) => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.description && note.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="notes-container">
      <nav className="breadcrumb">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="breadcrumb-path">
          <span className="breadcrumb-current">Notes for "{subjectName}"</span>
        </div>
      </nav>

      <header className="notes-header">
        <h2 className="notes-title">{subjectName} Notes</h2>
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading notes...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      ) : (
        <>
          {filteredNotes.length === 0 ? (
            <div className="no-notes-container">
              <p className="no-notes">No notes found for this subject.</p>
              <p className="no-notes-suggestion">Be the first to contribute! Upload notes for this subject.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <div key={note._id} className="note-card">
                  <div className="note-card-header">
                    <h3 className="note-title">{note.title}</h3>
                    {note.tags && note.tags.length > 0 && (
                      <div className="note-tags">
                        {note.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="note-tag">
                            <Tag size={12} />
                            {tag}
                          </span>
                        ))}
                        {note.tags.length > 3 && (
                          <span className="note-tag-more">+{note.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {note.description && (
                    <p className="note-description">{note.description.slice(0, 100)}
                      {note.description.length > 100 ? '...' : ''}
                    </p>
                  )}
                  
                  <div className="note-meta">
                    <span className="note-date">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                  
                  <div className="note-actions">
                    <Link
                      to={`/view-note/${note._id}`}
                      state={{ noteData: note }}
                      className="view-note-btn"
                    >
                      <FileText size={16} /> View
                    </Link>
                    <a 
                      href={`http://localhost:3000${note.contentURL}`}
                      download
                      className="download-note-btn"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NotesBySubject;
