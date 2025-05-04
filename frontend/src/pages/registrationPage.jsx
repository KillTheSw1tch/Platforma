import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
=======


>>>>>>> Stashed changes
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.css';

import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


function RegistrationPage() {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const { t } = useTranslation();
  const navigate = useNavigate();
   

  // При завантаженні сторінки встановлюємо мову з localStorage (якщо є)
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Стан для полів форми
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [postNumber, setPostNumber] = useState('');

  const [telephone, setTelephone] = useState('');
  const [mobile, setMobile] = useState('');

  const [formOfAddress, setFormOfAddress] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [clientType, setClientType] = useState('transporter');

  // Обробник відправки форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Формуємо об’єкт з усіма полями
    const payload = {
      username,
      password,
      email,
      profile: { 
          company: companyName,
          address: address,
          canton: district,
          zip_code: postNumber,
          phone: telephone,
          mobile: mobile,
          preferred_language: preferredLanguage,
          client_type: clientType,
      }
    };
    console.log("Payload:", JSON.stringify(payload, null, 2));
=======
=======
>>>>>>> Stashed changes

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
  
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userEmail', email);
        if (data.token) {
          localStorage.setItem('authToken', data.token); // 💾 Сохраняем токен!
        }
        navigate('/verify-code'); 
      }
       else {
        alert('⚠️ Помилка: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('❌ Помилка запиту:', error);
      alert('Сталася помилка при реєстрації.');
    }
  };
=======
=======
>>>>>>> Stashed changes
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
  

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return (
    
    <div className="container_reg py-5">
      {/* Заголовок сторінки */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">{t('create_account')}</h1>
        <p className="mb-1">
          {t('already_registered')}{' '}
          <a href="/login" style={{ color: 'var(--main-color)', textDecoration: 'none' }}>
            {t('login')}
          </a>
        </p>
        <div
          className="heading-line mx-auto"
          style={{ borderBottom: '3px solid var(--main-color)', width: '50px', marginBottom: '1.5rem' }}
        ></div>
      </div>

<<<<<<< Updated upstream
      {/* Форма реєстрації */}
      <form className="mx-auto" style={{ maxWidth: '700px' }} onSubmit={handleSubmit}>
        
        {/* Блок: Дані компанії */}
=======
      {/* Registration Form */}
      <form className="mx-auto" style={{ maxWidth: '700px' }} onSubmit={handleSubmit}>

        {/* Section: Company Details */}
>>>>>>> Stashed changes
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="section-title" style={{ color: 'var(--main-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {t('company_section')}
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="companyName" className="form-label">{t('company')}</label>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder={t('company_name')}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">{t('address')}</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder={t('street_house_number')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="district" className="form-label">{t('canton')}</label>
              <input
                type="text"
                className="form-control"
                id="district"
                placeholder={t('canton')}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="postNumber" className="form-label">{t('zip_postcode')}</label>
              <input
                type="text"
                className="form-control"
                id="postNumber"
                placeholder={t('zip_postcode')}
                value={postNumber}
                onChange={(e) => setPostNumber(e.target.value)}
              />
=======
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
>>>>>>> Stashed changes
=======
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
>>>>>>> Stashed changes
            </div>
          </div>
        </div>

        {/* Блок: Персональні дані */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="section-title" style={{ color: 'var(--main-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            {t('personal_details')}
=======
          {t('personal_details')}
>>>>>>> Stashed changes
=======
          {t('personal_details')}
>>>>>>> Stashed changes
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="formOfAddress" className="form-label">{t('form_of_address')}</label>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <select
                className="form-select"
                id="formOfAddress"
                value={formOfAddress}
                onChange={(e) => setFormOfAddress(e.target.value)}
              >
=======
              <select className="form-select" id="formOfAddress">
>>>>>>> Stashed changes
=======
              <select className="form-select" id="formOfAddress">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                placeholder={t('first_name')}
=======
                placeholder="First name"
>>>>>>> Stashed changes
=======
                placeholder="First name"
>>>>>>> Stashed changes
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="col-md-6">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <label htmlFor="surname" className="form-label">{t('surname')}</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder={t('surname')}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
=======
=======
>>>>>>> Stashed changes
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
>>>>>>> Stashed changes
            </div>
            
            <div className="col-md-6">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <label htmlFor="password" className="form-label">{t('password')}</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
=======
=======
>>>>>>> Stashed changes
              <label htmlFor="email" className="form-label">{t('email')}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder={t('email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              />
            </div>
            
            <div className="col-md-6">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <label htmlFor="email" className="form-label">{t('email')}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder={t('email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
=======
              <label htmlFor="telephone" className="form-label">{t('telephone')}</label>
              <input type="tel" className="form-control" id="telephone" placeholder={t('telephone_example')} />
>>>>>>> Stashed changes
=======
              <label htmlFor="telephone" className="form-label">{t('telephone')}</label>
              <input type="tel" className="form-control" id="telephone" placeholder={t('telephone_example')} />
>>>>>>> Stashed changes
            </div>
            
            <div className="col-md-6">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <label htmlFor="telephone" className="form-label">{t('telephone')}</label>
              <input
                type="tel"
                className="form-control"
                id="telephone"
                placeholder={t('telephone_example')}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
=======
              <label htmlFor="mobile" className="form-label">{t('mobile')}</label>
              <input type="tel" className="form-control" id="mobile" placeholder={t('mobile_example')} />
>>>>>>> Stashed changes
=======
              <label htmlFor="mobile" className="form-label">{t('mobile')}</label>
              <input type="tel" className="form-control" id="mobile" placeholder={t('mobile_example')} />
>>>>>>> Stashed changes
            </div>
            
            <div className="col-md-6">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <label htmlFor="mobile" className="form-label">{t('mobile')}</label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                placeholder={t('mobile_example')}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            
            <div className="col-md-6">
              <label htmlFor="language" className="form-label">{t('preferred_language')}</label>
              <select
                className="form-select"
                id="language"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
              >
=======
              <label htmlFor="language" className="form-label">{t('preferred_language')}</label>
              <select className="form-select" id="language">
>>>>>>> Stashed changes
=======
              <label htmlFor="language" className="form-label">{t('preferred_language')}</label>
              <select className="form-select" id="language">
>>>>>>> Stashed changes
                <option value="">{t('select_language')}</option>
                <option value="en">{t('english')}</option>
                <option value="de">{t('german')}</option>
                <option value="fr">{t('french')}</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="clientType" className="form-label">{t('client_type')}</label>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <select
                className="form-select"
                id="clientType"
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
              >
=======
              <select className="form-select" id="clientType">
>>>>>>> Stashed changes
=======
              <select className="form-select" id="clientType">
>>>>>>> Stashed changes
                <option value="transporter">{t('transporter')}</option>
                <option value="client">{t('client')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Блок: Згода, reCAPTCHA та кнопка */}
        <div className="section-divider" style={{ margin: '2rem 0' }}>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="termsCheck" required />
            <label className="form-check-label" htmlFor="termsCheck">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              {t('accept_privacy')}{' '}
=======
            {t('accept_privacy')}{' '}
>>>>>>> Stashed changes
=======
            {t('accept_privacy')}{' '}
>>>>>>> Stashed changes
              <a href="#" style={{ color: 'var(--main-color)' }}>{t('privacy_policy')}</a>.
            </label>
          </div>

          <div className="mb-3">
            {/* Placeholder reCAPTCHA */}
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

<<<<<<< Updated upstream
          <button type="submit" className="btn-main px-4 py-2">
            {t('registration')}
=======
          <button type="submit" className="btn btn-main px-4 py-2">
          {t('registration')}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
