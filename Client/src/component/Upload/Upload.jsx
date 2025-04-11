import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './upload.css';
import Navbar from '../Navigation/Navbar';

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Auto-fill title with file name if empty
      if (!title) {
        const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
        setTitle(fileName);
      }
    }
  };

  // Handle text input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Reset form
  const resetForm = () => {
    setFile(null);
    setTitle("");
    setDescription("");
    setUniversity("");
    setCourse("");
    setSubject("");
    setTags("");
    setError("");
    setSuccess("");
    // Reset file input
    const fileInput = document.getElementById('uploadFile');
    if (fileInput) fileInput.value = "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    
    if (!title || !university || !course || !subject) {
      setError("Title, university, course, and subject are required fields");
      return;
    }
    
    setUploading(true);
    setError("");
    setSuccess("");
    
    // Create a FormData object to bundle file and text fields
    const formData = new FormData();
    formData.append('file', file); // Changed from 'pdfFile' to 'file' as per your API
    formData.append('title', title);
    formData.append('description', description);
    formData.append('university', university);
    formData.append('course', course);
    formData.append('subject', subject.toLowerCase());
    
    if (tags) {
      formData.append('tags', tags);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      
      console.log("Upload successful:", response.data);
      setSuccess("File uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error("Error uploading note:", error);
      setError(error.response?.data?.error || "Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Get file size in readable format
  const getFileSize = (file) => {
    if (!file) return '';
    const size = file.size;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      
      <div className="upload-page">
      <Navbar />
        <h1 className="upload-title">Upload Notes</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <label htmlFor="uploadFile" className="upload-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="upload-icon"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 
                 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 
                 2h3a8 8 0 0 0 .75-15.956z"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 
                 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            />
          </svg>
          {file ? `Selected: ${file.name} (${getFileSize(file)})` : 'Select File'}
          <input 
            type="file" 
            id="uploadFile" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.xls,.xlsx"
          />
          <p className="upload-desc">
            PDF, DOC, DOCX, PPT, PPTX, TXT, XLS, XLSX are accepted.
          </p>
        </label>

        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input 
                  type="text" 
                  id="title" 
                  placeholder="Enter title for your notes" 
                  value={title}
                  onChange={handleInputChange(setTitle)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea 
                  id="description" 
                  placeholder="Enter a brief description of the content" 
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="university">University:</label>
                <input 
                  type="text" 
                  id="university" 
                  placeholder="Enter university name" 
                  value={university}
                  onChange={handleInputChange(setUniversity)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="course">Course:</label>
                <input 
                  type="text" 
                  id="course" 
                  placeholder="Enter course name" 
                  value={course}
                  onChange={handleInputChange(setCourse)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="Enter subject" 
                  value={subject}
                  onChange={handleInputChange(setSubject)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="tags">Tags:</label>
                <input 
                  type="text" 
                  id="tags" 
                  placeholder="Enter tags separated by commas (e.g., midterm, exam, notes)" 
                  value={tags}
                  onChange={handleInputChange(setTags)}
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Notes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;