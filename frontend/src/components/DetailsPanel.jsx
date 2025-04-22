// src/components/DetailsPanel.jsx
import React from 'react';
import './DetailsPanel.css';

const DetailsPanel = ({ isOpen, onClose, cargo }) => {
  if (!isOpen || !cargo) return null;

  return (
    <div className={`details-panel ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>&times;</button>

      <h3>Details of {cargo.route}</h3>

      <div className="info-group">
        <strong>From:</strong> <span>{cargo.from}</span>
      </div>
      <div className="info-group">
        <strong>To:</strong> <span>{cargo.to}</span>
      </div>
      <div className="info-group">
        <strong>Type:</strong> <span>{cargo.type}</span>
      </div>
      <div className="info-group">
        <strong>Transport Type:</strong> <span>{cargo.transportType}</span>
      </div>
      <div className="info-group">
        <strong>Weight:</strong> <span>{cargo.weight} t</span>
      </div>
      <div className="info-group">
        <strong>Volume:</strong> <span>{cargo.volume} m³</span>
      </div>
      <div className="info-group">
        <strong>Price:</strong> <span>{cargo.price}</span>
      </div>

      <div className="reviews">
        <h4>Reviews</h4>
        <ul>
          {cargo.reviews?.map((review, idx) => (
            <li key={idx}>{review}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsPanel;
