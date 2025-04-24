  import React, { useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../styles/loginPage.css';
  import { useTranslation } from 'react-i18next';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  function LoginPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username,
          password,
        });
    
        const { access, refresh } = response.data;
    
        localStorage.setItem('authToken', access);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('userEmail', username);
    
        // 🧠 Загружаем профиль
        const profileRes = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
    
        const profile = profileRes.data;
        localStorage.setItem('userFullName', profile.username || '');
        
        // 💾 Если есть company_info, сохраняем
        if (profile.profile?.company_info) {
          localStorage.setItem('companyData', JSON.stringify(profile.profile.company_info));
        }
    
        // 🔍 Проверяем статус документов
        const statusRes = await axios.get("http://127.0.0.1:8000/api/company/check-approval/", {
          headers: { Authorization: `Bearer ${access}` }
        });
    
        if (statusRes.data.approved) {
          localStorage.removeItem("documentsStatus");
        } else {
          localStorage.setItem("documentsStatus", "pending");
        }
    
        alert(t('login_successful'));
    
        navigate('/user-profile');
    
      } catch (error) {
        console.error('Login failed:', error);
        alert(t('login_failed'));
      }
    };
    

    return (
      <div className="container_login py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">{t('login_title')}</h1>
          <p className="mb-1">
            {t('no_account')}{' '}
            <a href="/registration" >
              {t('register')}
            </a>
          </p>
          <div className="heading-line" ></div>
        </div>

        <form className="mx-auto"  onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">{t('username_or_email')}</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder={t('username_placeholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">{t('password')}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={t('password_placeholder1')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">{t('remember_me')}</label>
          </div>
          <button type="submit" className="btn btn-main w-100">{t('login')}</button>
        </form>
      </div>
    );
  }

  export default LoginPage;
