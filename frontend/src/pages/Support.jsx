import React, { useEffect } from 'react';
import '../styles/Support.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Support() {
    const { t } = useTranslation();

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
    // Обработчик смены языка
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            
=======
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

            {/* Информация поддержки */}
            <div className="contact-container">
                <div className="contact-card">
                    <div className="contact-logo">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karte_Schweizer_Sprachgebiete_2021.png/330px-Karte_Schweizer_Sprachgebiete_2021.png"
                            alt="Support Image"
                            className="img-fluid"
                        />
                    </div>
                    <div className="contact-info">
                        <h2>{t("support")}</h2>
                        <p>{t("We are here to help you with any questions or issues you may have. Our support team is ready to assist you.")}</p>
                        <h3>{t("General Questions")}</h3>
                        <p>{t("Find answers to frequently asked questions about our services and platform.")}</p>
                        <h3>{t("Technical Support")}</h3>
                        <p>{t("Having trouble using the platform? Our technical team is ready to assist you.")}</p>
                        <h3>{t("Feedback")}</h3>
                        <p>{t("Your feedback is important to us. Share your experience to help us improve.")}</p>
                        <button className="btn btn-primary mt-3">{t('Contact Support')}</button>
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
