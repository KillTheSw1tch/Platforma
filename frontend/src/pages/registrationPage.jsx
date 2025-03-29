import React, { useState, useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.css'; // Optional: Import your custom styles if needed

import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


function RegistrationPage() {

  const { t } = useTranslation();

  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userEmail', email); // сохраняем email пользователя
        window.location.href = '/verify-code';    // редирект на страницу ввода кода
      }
       else {
        alert('⚠️ Ошибка: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('❌ Ошибка запроса:', error);
      alert('Произошла ошибка при регистрации.');
    }
  };
  


  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">{t('create_account')}</h1>
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
      <form className="mx-auto" style={{ maxWidth: '700px' }} onSubmit={handleSubmit}>

        {/* Section: Company Details */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="section-title" style={{ color: 'var(--main-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Company
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="companyName" className="form-label">{t('company')}</label>
              <input type="text" className="form-control" id="companyName" placeholder={t('company_name')} />
            </div>
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">{t('address')}</label>
              <input type="text" className="form-control" id="address" placeholder={t('street_house_number')} />
            </div>
            <div className="col-md-6">
              <label htmlFor="district" className="form-label">{t('canton')}</label>
              <input type="text" className="form-control" id="district" placeholder={t('canton')} />
            </div>
            <div className="col-md-6">
              <label htmlFor="postNumber" className="form-label">{t('post_number')}</label>
              <input type="text" className="form-control" id="postNumber" placeholder={t('zip_postcode')} />
            </div>
          </div>
        </div>

        {/* Section: Personal Details */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="section-title" style={{ color: 'var(--main-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          {t('personal_details')}
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="formOfAddress" className="form-label">{t('form_of_address')}</label>
              <select className="form-select" id="formOfAddress">
                <option value="">{t('please_select')}</option>
                <option value="mr">{t('mr')}</option>
                <option value="ms">{t('ms')}</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">{t('first_name')}</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">{t('password')}</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="col-md-6">
              <label htmlFor="surname" className="form-label">{t('surname')}</label>
              <input type="text" className="form-control" id="surname" placeholder="Surname" />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">{t('email')}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder={t('email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="telephone" className="form-label">{t('telephone')}</label>
              <input type="tel" className="form-control" id="telephone" placeholder={t('telephone_example')} />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label">{t('mobile')}</label>
              <input type="tel" className="form-control" id="mobile" placeholder={t('mobile_example')} />
            </div>
            <div className="col-md-6">
              <label htmlFor="language" className="form-label">{t('preferred_language')}</label>
              <select className="form-select" id="language">
                <option value="">{t('select_language')}</option>
                <option value="en">{t('english')}</option>
                <option value="de">{t('german')}</option>
                <option value="fr">{t('french')}</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="clientType" className="form-label">{t('client_type')}</label>
              <select className="form-select" id="clientType">
                <option value="transporter">{t('transporter')}</option>
                <option value="client">{t('client')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Consent, reCAPTCHA, and Registration Button */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="termsCheck" />
            <label className="form-check-label" htmlFor="termsCheck">
            {t('accept_privacy')}{' '}
              <a href="#" style={{ color: 'var(--main-color)' }}>{t('privacy_policy')}</a>.
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
          {t('registration')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
