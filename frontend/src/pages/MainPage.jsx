import React from 'react';
import '../styles/Home.css';                    // Підключення вашого CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <a className="navbar-brand" href="#">
            Platforma | <span className="text-primary"> Transportation</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Language Switcher */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  English
                </a>
                <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                  <li><a className="dropdown-item" href="homeFR.html">Français</a></li>
                  <li><a className="dropdown-item" href="#">Allemand</a></li>
                  <li><a className="dropdown-item" href="#">Italien</a></li>
                </ul>
                </li>
                <li className="nav-item">
    <Link className="nav-link" to="/login">Login</Link>
                </li>
              <li className="nav-item">
                <Link className='nav-link' to='/registration'>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Service Menu */}
      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-pills py-2">
            <li className="nav-item me-3">
              <a className="nav-link active" href="#">Domestic Cargo</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#">Need Carriers?</a>
            </li>
            <li className="nav-item">
              <a href="/add-cargo" className="btn btn-primary">
                Add Cargo
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          {/* Available Cargo List */}
          <div className="col-lg-8">
            <h4 className="mb-4">Available Cargo</h4>
            <table className="table table-hover cargo-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Origin - Destination</th>
                  <th>Cargo</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>18.03.2024 09:00</td>
                  <td>Zurich → Bern</td>
                  <td>Post &amp; Bags</td>
                  <td>Fragile</td>
                </tr>
                <tr>
                  <td>19.03.2024 12:00</td>
                  <td>Geneva → Sion</td>
                  <td>Goods on Pallets</td>
                  <td>Time-critical</td>
                </tr>
                <tr>
                  <td>20.03.2024 08:30</td>
                  <td>Lugano → Chur</td>
                  <td>Equipment</td>
                  <td>Heavy load</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Need Carriers Card */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Need carriers?</h5>
                <p className="card-text">
                  Get a list of verified carriers and make your shipment easier!
                </p>
                <li className="nav-item">
                  <Link className='nav-link' to='/'>
                    Add Cargo
                  </Link>
                </li>
              </div>
            </div>

            {/* Search Cargo Card */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Search Available Cargo</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="region" className="form-label">Region</label>
                    <select className="form-select" id="region">
                      <option>All regions</option>
                      <option>Zurich</option>
                      <option>Bern</option>
                      <option>Geneva</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cargoType" className="form-label">Cargo Type</label>
                    <select className="form-select" id="cargoType">
                      <option>All cargo types</option>
                      <option>Equipment</option>
                      <option>Documents</option>
                      <option>Food</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="shipper" className="form-label">Shipper</label>
                    <select className="form-select" id="shipper">
                      <option>All shippers</option>
                      <option>Company A</option>
                      <option>Company B</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Search Cargo</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <div>
            <p className="mb-0 text-muted">
              © 2023 Platforma Transportation. The top transportation platform in Swiss.
            </p>
          </div>
          <div className="footer-links">
            <a href="#">Services</a>
            <a href="#">Support</a>
            <a href="#">Contacts</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
