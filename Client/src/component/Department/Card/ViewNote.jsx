import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ArrowLeft, Download } from "lucide-react";
import "./viewPdf.css";

function ViewNote() {
  const { filePath } = useParams(); // Fetch note ID from URL params
  const navigate = useNavigate();
  const location = useLocation();
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/note/${filePath}`);
        setNote(response.data);
      } catch (err) {
        console.error("Error fetching note:", err);
        setError(err.response?.data?.error || "Failed to load the note.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNote();
  }, [filePath]);
  
  if (loading) {
    return <div className="loading">Loading note...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!note) {
    return <div className="not-found">Note not found.</div>;
  }
  
  const fileURL = `http://localhost:3000${note.contentURL}`;
  
  return (
    <div className="pdf-view-container">
      {/* Header */}
      <div className="pdf-header">
        <h1 className="pdf-title">{note.title || "Untitled Note"}</h1>
        <div className="button-group">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={16} />
            Back
          </button>
          <a href={fileURL} download className="download-button">
            <Download size={16} />
            Download PDF
          </a>
        </div>
      </div>
      
      {/* PDF Viewer */}
      <div className="pdf-viewer-container">
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
          <Viewer fileUrl={fileURL} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}

export default ViewNote;