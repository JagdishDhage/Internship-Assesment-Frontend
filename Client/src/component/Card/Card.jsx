import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ category, url }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (url) {
      navigate(url); // Navigate to the provided URL
    }
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img
        src="https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q="
        alt={category}
        className="card-image"
      />
      <div className="card-content">
        <h3 className="card-title">{category}</h3>
        <p className="card-name">John Doe</p>
        <button className="card-button">Add to Favorite</button>
      </div>
    </div>
  );
}

export default Card;
