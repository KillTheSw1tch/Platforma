
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next'

function Navbar() {

  const { t } = useTranslation();

   const changeLanguage = (lng) => {
     if (['en', 'fr', 'de', 'it'].includes(lng)) {
       i18n.changeLanguage(lng);
       localStorage.setItem('i18nextLng', lng);
     }
   };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи є в localStorage збережений токен
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Видаляємо токен з localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">(t{'Platforma Transportation'})</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

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
                    <li>
                      <Link className="dropdown-item" to="/my-orders">{t("my_orders")}</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/my-company">{t("my_company")}</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/profile">{t("profile")}</Link>
                    </li>
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
  