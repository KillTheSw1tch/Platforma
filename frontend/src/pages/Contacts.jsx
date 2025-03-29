import React, { useEffect } from 'react';
import '../styles/Contacts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Contacts() {
    const { t } = useTranslation();

    // Обработчик смены языка
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    // Устанавливаем сохраненный язык при загрузке
    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    return (
        <div>
            {/* Навигационная панель */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Platforma | <span className="text-primary">{t("transportation")}</span>
                    </Link>
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
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="languageDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {t("language")}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                                    <li>
                                        <button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => changeLanguage('fr')}>Français</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => changeLanguage('de')}>Deutsch</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => changeLanguage('it')}>Italiano</button>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">{t("login")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registration">{t("register")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Контактная информация */}
            <div className="contact-container">
                <div className="contact-card">
                    <div className="contact-logo">
                        <img
                            src="https://img.goodfon.com/original/1920x1200/9/dc/siniy-fon-logotip-dell-fon.jpg"
                            alt="Company Logo"
                            className="img-fluid"
                        />
                    </div>
                    <div className="contact-info">
                        <h2>{t("contacts")}</h2>
                        <p>{t("email")}: info@company.com</p>
                        <p>{t("phone1")}: +41 22 123 45 67</p>
                        <p>{t("phone2")}: +41 22 765 43 21</p>
                        <p>{t("address")}: 123, Transport Street, Zurich, Switzerland</p>
                    </div>
                </div>
            </div>

            {/* Футер */}
            <footer className="bg-white border-top py-4 mt-5">
                <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
                    <p className="mb-0 text-muted">{t("footer_text")}</p>
                    <div className="footer-links">
                        <Link to="/services">{t("services")}</Link>
                        <Link to="/support">{t("support")}</Link>
                        <Link to="/contacts">{t("contacts")}</Link>
                        <Link to="/faq">{t("faq")}</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
