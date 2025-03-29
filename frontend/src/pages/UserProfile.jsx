import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

const UserProfile = () => {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Platforma | <span className="text-primary"> Transportation</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="languageDropdown"
                   role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  English
                </a>
                <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                  <li><a className="dropdown-item" href="#">Français</a></li>
                  <li><a className="dropdown-item" href="#">Deutsch</a></li>
                  <li><a className="dropdown-item" href="#">Italiano</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/registration" className="btn btn-primary">Register</Link>
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
              <Link className="nav-link" to="/">Domestic Cargo</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="#">Need Carriers?</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-cargo" className="btn btn-primary">Add Cargo</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container my-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">User Profile</h2>
          <p>Manage your profile information, company details, and preferences.</p>
          <div className="heading-line"
               style={{ borderBottom: '3px solid #57cc99', width: '60px', margin: '0.5rem auto 1.5rem' }}>
          </div>
        </div>

        {/* Profile Details */}
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Personal Details */}
              <div className="col-md-6 border-end">
                <h5 className="card-title text-primary mb-3">Personal Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">👤 <strong>Name:</strong> John Doe</li>
                  <li className="list-group-item">✉️ <strong>Email:</strong> johndoe@example.com</li>
                  <li className="list-group-item">📞 <strong>Phone:</strong> +41 123 456 789</li>
                  <li className="list-group-item">🗣️ <strong>Preferred Language:</strong> English</li>
                </ul>
              </div>

              

              {/* Company Details */}
              <div className="col-md-6">
                <h5 className="card-title text-primary mb-3">Company Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">🏢 <strong>Company:</strong> Transportation Ltd.</li>
                  <li className="list-group-item">📍 <strong>Address:</strong> Main street 45, Zurich</li>
                  <li className="list-group-item">📌 <strong>ZIP Code:</strong> 8000</li>
                  <li className="list-group-item">🌍 <strong>Canton:</strong> Zurich</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary px-4" onClick={openModal}>
                Edit Profile
                </button>
                </div>
          </div>

{/* Modal for Editing Profile */}
{showModal && (
        <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" defaultValue="John Doe" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" defaultValue="johndoe@example.com" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-control" defaultValue="+41 123 456 789" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Preferred Language</label>
                      <select className="form-select">
                        <option selected>English</option>
                        <option>Deutsch</option>
                        <option>Français</option>
                        <option>Italiano</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Company Name</label>
                      <input type="text" className="form-control" defaultValue="Transportation Ltd." />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-control" defaultValue="Main street 45, Zurich" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">ZIP Code</label>
                      <input type="text" className="form-control" defaultValue="8000" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Canton</label>
                      <input type="text" className="form-control" defaultValue="Zurich" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        </div>

        {/* Preferences */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">Preferences & Settings</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">🔔 <strong>Notifications:</strong> Enabled</li>
              <li className="list-group-item">🔒 <strong>Password:</strong> ************</li>
              <li className="list-group-item">🔑 <strong>Two-factor authentication(2FA):</strong> Enabled</li>
              <li className="list-group-item">🕒 <strong>Timezone:</strong> CET (Central European Time)</li>
              
            </ul>
            <div className="text-center mt-4">
              <Link className="btn btn-secondary px-4" to="#">Manage Preferences</Link>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-4">
          <button className="btn btn-outline-danger px-4">Log Out</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            © 2023 Platforma Transportation. The top transportation platform in Swiss.
          </p>
          <div className="footer-links">
            <Link to="#">Services</Link>
            <Link to="#">Support</Link>
            <Link to="#">Contacts</Link>
            <Link to="#">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
