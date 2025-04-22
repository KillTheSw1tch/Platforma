import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import '../styles/UsetProfile.css';
import i18n from '../i18n';
import axios from 'axios';

const UserProfile = () => {

  const { t } = useTranslation();

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {

    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
  
    fetch('http://127.0.0.1:8000/api/user/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Отримані дані з бекенду:", data);  // Додаємо тут
        if (data.username) {
          setUserData(data);
        } else {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      });
  }, [navigate]);
  

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleLogout = () => {
      localStorage.removeItem('authToken');
      navigate('/login', { replace: true });
      window.location.reload();
    };
    // Функция обновления профиля
    const updateProfile = async (updatedData) => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.put('http://127.0.0.1:8000/api/user/profile/', updatedData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUserData(response.data);
        alert(t('Профіль оновлено!'));
        setShowModal(false);
      } catch (error) {
        console.error('Помилка оновлення:', error);
        alert(t('Помилка оновлення профілю.'));
      }
    };

  return (
    <div>
      {/* Profile Section */}
      <div className="container my-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">{t('user_profile')}</h2>
          <p>{t('manage_profile_info')}</p>
        </div>

        {/* Profile Details */}
        <div className="card_user shadow-sm">
          <div className="card-body_user">
            <div className="row">
              {/* Personal Details */}
              <div className="col-md-6 border-end">
                <h5 className="card-title text-primary mb-3">{t('personal_details')}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">👤 <strong>{t('name')}:</strong> {userData.username}</li>
                  <li className="list-group-item">✉️ <strong>{t('email')}:</strong> {userData.email}</li>
                  <li className="list-group-item">📞 <strong>{t('phone')}:</strong> {userData.profile?.phone || 'Not provided'}</li>
                  <li className="list-group-item">🗣️ <strong>{t('preferred_language')}:</strong> {userData.profile?.preferred_language || 'English'}</li>
                </ul>
              </div>

              

              {/* Company Details */}
              <div className="col-md-6">
                <h5 className="card-title text-primary mb-3">{t('company_details')}</h5>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">🏢 <strong>{t('company')}:</strong> {userData.profile?.company || 'Not provided'}</li>
                <li className="list-group-item">📍 <strong>{t('address')}:</strong> {userData.profile?.address || 'Not provided'}</li>
                <li className="list-group-item">📌 <strong>{t('zip_code')}:</strong> {userData.profile?.zip_code || 'Not provided'}</li>
                <li className="list-group-item">🌍 <strong>{t('canton')}:</strong> {userData.profile?.canton || 'Not provided'}</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="bbtn-main px-4" onClick={openModal}>
              {t('edit_profile')}
                </button>
                </div>
          </div>

      {/* Modal for Editing Profile */}
        {showModal && (
          <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{t('edit_profile')}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const updatedData = {
                    username: e.target.username.value,
                    email: e.target.email.value,
                    profile: {
                      company: e.target.company.value,
                      address: e.target.address.value,
                      zip_code: e.target.zip.value,
                      canton: e.target.canton.value,
                      phone: e.target.phone.value,
                      preferred_language: e.target.language.value,
                    }
                  };
                  updateProfile(updatedData);
                }}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">{t('name')}</label>
                        <input type="text" name="username" className="form-control" defaultValue={userData?.username || ''} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">{t('email')}</label>
                        <input type="email" name="email" className="form-control" defaultValue={userData?.email || ''} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">{t('phone')}</label>
                        <input 
                          type="text"
                          name="phone"
                          className="form-control"
                          defaultValue={userData.profile?.phone || ''} 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">{t('preferred_language')}</label>
                        <select name="language" className="form-select" defaultValue={userData.profile?.preferred_language || 'English'}>
                          <option>{t('english')}</option>
                          <option>{t('german')}</option>
                          <option>{t('french')}</option>
                          <option>{t('italian')}</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">{t('company')}</label>
                        <input type="text" name="company" className="form-control" defaultValue={userData.profile?.company || 'Transportation Ltd.'} />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">{t('address')}</label>
                        <input type="text" name="address" className="form-control" defaultValue={userData.profile?.address || 'Main street 45, Zurich'} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">{t('zip_code')}</label>
                        <input type="text" name="zip" className="form-control" defaultValue={userData.profile?.zip || '8000'} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">{t('canton')}</label>
                        <input type="text" name="canton" className="form-control" defaultValue={userData.profile?.canton || 'Zurich'} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={closeModal}>
                        {t('close')}
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {t('save_changes')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* Preferences */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">{t('preferences_settings')}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">🔔 <strong>{t('notifications')}:</strong> Enabled</li>
              <li className="list-group-item">🔒 <strong>{t('password')}:</strong> ************</li>
              <li className="list-group-item">🔑 <strong>{t('two_factor_authentication')}:</strong> Enabled</li>
              <li className="list-group-item">🕒 <strong>{t('timezone')}:</strong> CET (Central European Time)</li>
              
            </ul>
            <div className="text-center mt-4">
              <Link className="btn btn-secondary px-4" to="#">{t('manage_preferences')}</Link>
            </div>
          </div>
        </div>


        {/* Logout Button */}
        <div className="text-center mt-4">
          {/* Logout Button */}
          <div className="text-center mt-4">
            <button className="btn logout-btn px-4" onClick={handleLogout}>{t('log_out')}</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <p className="mb-0 text-muted">
            {t('footer_text')}
          </p>
          <div className="footer-links">
            <Link to="/services">{t('services')}</Link>
            
            <Link to="/contacts">{t('contacts')}</Link>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
