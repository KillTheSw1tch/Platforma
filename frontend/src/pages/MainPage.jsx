import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import CargoCard from '../components/CargoCard';

const HomePage = () => {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cargo/')
      .then(response => setCargos(response.data))
      .catch(error => console.error('Error fetching cargos:', error));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Platforma | <span className="text-primary">Transportation</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button"
                  data-bs-toggle="dropdown">English</a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/fr">Français</Link></li>
                  <li><Link className="dropdown-item" to="/de">Allemand</Link></li>
                  <li><Link className="dropdown-item" to="/it">Italien</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/registration">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-pills py-2">
            <li className="nav-item me-3">
              <Link className="nav-link active" to="/">Domestic Cargo</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/">Need Carriers?</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-cargo" className="btn btn-primary">Add Cargo</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <h4 className="mb-4">Available Cargo</h4>
            <div className="row">
              {cargos.length > 0 ? cargos.map(cargo => (
                <CargoCard key={cargo.id} cargo={cargo} />
              )) : (
                <div className="text-muted">No cargo available at the moment.</div>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Need carriers?</h5>
                <p className="card-text">
                  Get a list of verified carriers and make your shipment easier!
                </p>
                <Link to="/add-cargo" className="btn btn-primary">Add Cargo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <p className="mb-0 text-muted">© 2023 Platforma Transportation. The top transportation platform in Swiss.</p>
          <div className="footer-links">
            <Link to="/services">Services</Link>
            <Link to="/support">Support</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
