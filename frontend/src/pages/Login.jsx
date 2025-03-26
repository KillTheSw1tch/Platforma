import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginPage.css'; // Custom styles with your variables, e.g., --main-color

function LoginPage() {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Login to Your Account</h1>
        <p className="mb-1">
          Don't have an account?{' '}
          <a href="/registration" style={{ color: 'var(--main-color)', textDecoration: 'none' }}>
            Register
          </a>
        </p>
        <div className="heading-line" style={{ borderBottom: '3px solid var(--main-color)', width: '50px', margin: '0.5rem auto 1.5rem' }}></div>
      </div>

      {/* Login Form */}
      <form className="mx-auto" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username or Email</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username or email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit" className="btn btn-main w-100">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
