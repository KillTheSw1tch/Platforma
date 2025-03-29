import React from 'react';

function CargoCard({ cargo }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {cargo.loading_city_primary} → {cargo.unloading_city_primary}
          </h5>
          <p className="card-text">
            📅 <strong>From:</strong> {cargo.date_from} <br/>
            📅 <strong>To:</strong> {cargo.date_to}<br/>
            📦 <strong>Type:</strong> {cargo.cargo_type}<br/>
            ⚖️ <strong>Weight:</strong> {cargo.weight} t<br/>
            📐 <strong>Volume:</strong> {cargo.volume ? cargo.volume + ' m³' : 'N/A'}<br/>
            📝 <strong>Notes:</strong> {cargo.extra_info || 'No extra info'}
          </p>
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default CargoCard;
