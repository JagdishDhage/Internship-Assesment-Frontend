import React from 'react';
import './Card.css'; // Import CSS for styling

function Card({ title, description, onLearnMore }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <button className="card-btn" onClick={onLearnMore}>
        Learn More
      </button>
    </div>
  );
}

export default Card;
