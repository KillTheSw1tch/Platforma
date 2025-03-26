import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.css'; // Optional: Import your custom styles if needed

function RegistrationPage() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Create New Account</h1>
        <p className="mb-1">
          Already Registered?{' '}
          <a href="/login" style={{ color: 'var(--main-color)', textDecoration: 'none' }}>
            Login
          </a>
        </p>
        <div
          className="heading-line mx-auto"
          style={{ borderBottom: '3px solid var(--main-color)', width: '50px', marginBottom: '1.5rem' }}
        ></div>
      </div>

      {/* Registration Form */}
      <form className="mx-auto" style={{ maxWidth: '700px' }}>
        {/* Section: Company Details */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="section-title" style={{ color: 'var(--main-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Company
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="companyName" className="form-label">Company</label>
              <input type="text" className="form-control" id="companyName" placeholder="Your Company Name" />
            </div>
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="Street / House number" />
            </div>
            <div className="col-md-6">
              <label htmlFor="district" className="form-label">Canton</label>
              <input type="text" className="form-control" id="district" placeholder="Canton" />
            </div>
            <div className="col-md-6">
              <label htmlFor="postNumber" className="form-label">Post Number</label>
              <input type="text" className="form-control" id="postNumber" placeholder="ZIP / Postcode" />
            </div>
          </div>
        </div>

        {/* Section: Personal Details */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="section-title" style={{ color: 'var(--main-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Personal Details
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="formOfAddress" className="form-label">Form of Address</label>
              <select className="form-select" id="formOfAddress">
                <option value="">Please select</option>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First name" />
            </div>
            <div className="col-md-6">
              <label htmlFor="surname" className="form-label">Surname</label>
              <input type="text" className="form-control" id="surname" placeholder="Surname" />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="hello@domain.com" />
            </div>
            <div className="col-md-6">
              <label htmlFor="telephone" className="form-label">Telephone</label>
              <input type="tel" className="form-control" id="telephone" placeholder="e.g. +41 123 4567" />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input type="tel" className="form-control" id="mobile" placeholder="e.g. +41 987 6543" />
            </div>
            <div className="col-md-6">
              <label htmlFor="language" className="form-label">Preferred Language</label>
              <select className="form-select" id="language">
                <option value="">Select language...</option>
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="clientType" className="form-label">Client type</label>
              <select className="form-select" id="clientType">
                <option value="transporter">I am a transporter</option>
                <option value="client">I am a client</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Consent, reCAPTCHA, and Registration Button */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="termsCheck" />
            <label className="form-check-label" htmlFor="termsCheck">
              I confirm that my data is processed in accordance with the{' '}
              <a href="#" style={{ color: 'var(--main-color)' }}>Privacy Policy</a>.
            </label>
          </div>

          <div className="mb-3">
            {/* reCAPTCHA placeholder */}
            <div style={{
              width: '304px',
              height: '78px',
              backgroundColor: '#e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              reCAPTCHA
            </div>
          </div>

          <button type="submit" className="btn btn-main px-4 py-2">
            Registration
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
