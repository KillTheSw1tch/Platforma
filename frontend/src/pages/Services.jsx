import React, { useEffect } from 'react';
import '../styles/Services.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Services() {
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

            {/* Информация о сервисах */}
            <div className="contact-container">
                <div className="contact-card">
                    <div className="contact-logo">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karte_Schweizer_Sprachgebiete_2021.png/330px-Karte_Schweizer_Sprachgebiete_2021.png"
                            alt="Services Image"
                            className="img-fluid"
                        />
                    </div>
                    <div className="contact-info">
                        <h2>{t("Our Services")}</h2>
                        <p>{t("Our platform acts as a mediator between companies that need transportation and those that provide carrier services. We make the process of finding and organizing freight transportation simple and efficient.")}</p>
                        <h3>{t("Cargo Transportation")}</h3>
                        <p>{t("Connecting businesses with trusted carriers for reliable and efficient cargo transportation.")}</p>
                        <h3>{t("Carrier Services")}</h3>
                        <p>{t("Providing verified carrier companies to meet your shipping needs.")}</p>
                        <h3>{t("Logistics Solutions")}</h3>
                        <p>{t("Offering logistic management and support to optimize your supply chain.")}</p>
                        <h3>{t("Customer Support")}</h3>
                        <p>{t("Assisting you throughout the transportation process, from booking to delivery.")}</p>
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
