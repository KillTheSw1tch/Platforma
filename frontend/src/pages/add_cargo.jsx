import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddCargoRequest() {
  const [formData, setFormData] = useState({
    loading_city_primary: '',
    loading_postal_primary: '',
    unloading_city_primary: '',
    unloading_postal_primary: '',
    cargo_type: '',
    weight: '',
    volume: '',
    date_from: '',
    date_to: '',
    transport_type: '',
    truck_count: '',
    price: '',
    extra_info: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/cargo/', formData);
      navigate('/');
    } catch (error) {
      console.error('Submission error details:', error.response.data);
      alert('Submission error. Check console.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Add Cargo Request</h1>
      <form onSubmit={handleSubmit} className="row g-3">

        <div className="col-md-6">
          <label className="form-label">Loading city</label>
          <input className="form-control" name="loading_city_primary" onChange={handleChange} required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Loading postal code</label>
          <input className="form-control" name="loading_postal_primary" onChange={handleChange} required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Unloading city</label>
          <input className="form-control" name="unloading_city_primary" onChange={handleChange} required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Unloading postal code</label>
          <input className="form-control" name="unloading_postal_primary" onChange={handleChange} required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Cargo type</label>
          <input className="form-control" name="cargo_type" onChange={handleChange} required/>
        </div>

        <div className="col-md-3">
          <label className="form-label">Weight (tons)</label>
          <input className="form-control" name="weight" type="number" onChange={handleChange} required/>
        </div>

        <div className="col-md-3">
          <label className="form-label">Volume (m³)</label>
          <input className="form-control" name="volume" type="number" onChange={handleChange}/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Date from</label>
          <input className="form-control" name="date_from" type="date" onChange={handleChange} required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Date to</label>
          <input className="form-control" name="date_to" type="date" onChange={handleChange} required/>
        </div>

        <div className="col-md-4">
          <label className="form-label">Transport type</label>
          <input className="form-control" name="transport_type" onChange={handleChange}/>
        </div>

        <div className="col-md-4">
          <label className="form-label">Truck count</label>
          <input className="form-control" name="truck_count" type="number" onChange={handleChange}/>
        </div>

        <div className="col-md-4">
          <label className="form-label">Price</label>
          <input className="form-control" name="price" type="number" onChange={handleChange}/>
        </div>

        <div className="col-12">
          <label className="form-label">Extra information</label>
          <textarea className="form-control" name="extra_info" rows="3" onChange={handleChange}></textarea>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-primary me-3" type="submit">Submit</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>Home</button>
        </div>
      </form>
    </div>
  );
}

export default AddCargoRequest;
