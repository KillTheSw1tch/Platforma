import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { getToken } from '../components/getToken';

function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Язык
  const changeLanguage = (lng) => {
    if (['en', 'fr', 'de', 'it'].includes(lng)) {
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    }
  };

  // Проверка токена на каждой перезагрузке и при изменении localStorage
  useEffect(() => {
    const checkLogin = () => {
      const token = getToken();
      setIsLoggedIn(!!token);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    // Полная очистка
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('companyData');
    localStorage.removeItem('documentsStatus');

    setIsLoggedIn(false);
    navigate('/');
    window.location.reload(); // Гарантированная перезагрузка с новым стейтом
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">{t("platform_name") || "Platforma Transportation"}</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {/* Language */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t("language")}
              </a>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>{t("english")}</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>{t("french")}</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('de')}>{t("german")}</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('it')}>{t("italian")}</button></li>
              </ul>
            </li>

            {/* Logged In */}
            {isLoggedIn ? (
              <>
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-dark dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    👤 {localStorage.getItem('userFullName') || t("profile")}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item" to="/my-orders">{t("my_orders")}</Link></li>
                    <li><Link className="dropdown-item" to="/my-company">{t("my_company")}</Link></li>
                    <li><Link className="dropdown-item" to="/profile">{t("profile")}</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button className="btn btn-secondary ms-2" onClick={handleLogout}>
                    {t("logout")}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t("login")}</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/registration">
                    {t("registration")}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
