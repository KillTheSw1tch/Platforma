<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import '../styles/Home.css'; 
=======
import React, { useEffect } from 'react';
import '../styles/Home.css';
>>>>>>> Stashed changes
=======
import React, { useEffect } from 'react';
import '../styles/Home.css';
>>>>>>> Stashed changes
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import axios from 'axios';
import CargoCard from '../components/CargoCard';
import VehicleCard from '../components/VehicleCard';
import DetailsPanel from '../components/DetailsPanel';
import { getToken } from '../components/getToken';

function HomePage() {
  const { t } = useTranslation();
  const [cargos, setCargos] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState("all");

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [openedDetailsCardId, setOpenedDetailsCardId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

=======

function HomePage() {
  const { t } = useTranslation();

  // Используем сохраненный язык при загрузке страницы
>>>>>>> Stashed changes
=======

function HomePage() {
  const { t } = useTranslation();

  // Используем сохраненный язык при загрузке страницы
>>>>>>> Stashed changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream

    axios.get('http://127.0.0.1:8000/api/cargo/')
      .then(response => {
        setCargos(response.data.filter(c => !c.hidden));
      })
      .catch(error => {
        console.error("Error fetching cargos:", error);
      });

    axios.get('http://127.0.0.1:8000/api/trucks/')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  useEffect(() => {
    setIsDetailsOpen(false);
    setOpenedDetailsCardId(null);
  }, [filter]);

  return (
    <div>
      {/* Верхнее меню */}
=======
=======
>>>>>>> Stashed changes
  }, []);

  // Функция изменения языка с сохранением в localStorage
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); // Сохранение языка
  };

  return (
    <div>
      {/* Navigation */}
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
                  <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
                  <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>Français</button></li>
                  <li><button className="dropdown-item" onClick={() => changeLanguage('de')}>Deutsch</button></li>
                  <li><button className="dropdown-item" onClick={() => changeLanguage('it')}>Italiano</button></li>
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

      {/* Service Menu */}
>>>>>>> Stashed changes
      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-pills py-2">
            <li className="nav-item me-3">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              {isLoggedIn ? (
                <>
                  <Link to="/add-vehicle" className="btn btn-primary me-3">{t("add_vehicle")}</Link>
                  <Link to="/add-cargo" className="btn btn-primary">{t("add_cargo")}</Link>
                </>
              ) : (
                <>
                  <button className="btn btn-primary me-2" onClick={() => alert("Пожалуйста, войдите или зарегистрируйтесь.")}>{t("add_vehicle")}</button>
                  <button className="btn btn-primary" onClick={() => alert("Пожалуйста, войдите или зарегистрируйтесь.")}>{t("add_cargo")}</button>
                </>
              )}
=======
=======
>>>>>>> Stashed changes
              <a className="nav-link active" href="#">{t("domestic_cargo")}</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#">{t("need_carriers")}</a>
            </li>
            <li className="nav-item">
              <a href="/add-cargo" className="btn btn-primary">
                {t("add_cargo")}
              </a>
>>>>>>> Stashed changes
            </li>
          </ul>
        </div>
      </div>

<<<<<<< Updated upstream
      {/* Реклама */}
      <div className="container my-4">
        <div style={{
          backgroundColor: '#fffbea',
          border: '1px solid #ffe58f',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <h4><strong>🔈 {t("advertisement")}</strong></h4>
          <p>🚛 Потрібен надійний перевізник? Додайте вантаж та отримайте пропозиції вже сьогодні!</p>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="btn btn-warning">👉 Детальніше</a>
        </div>
      </div>

      {/* Кнопки фильтра */}
      <div className="container my-4">
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-secondary" onClick={() => setFilter("cargo")}>{t("available_cargo")}</button>
          <Link to="/search-cargo" className="btn btn-primary">{t("find_trans_cargo")}</Link>
          <button className="btn btn-outline-secondary" onClick={() => setFilter("vehicle")}>{t("available_vehicle")}</button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="container my-5 position-relative">
        <div className="row">
          <div className="col-12">
            <div className="row">
              
              {/* Левая панель */}
              {isDetailsOpen && openedDetailsCardId && (
                
                <div className="sticky-details-panel">
                  <DetailsPanel
                    cargo={(filter === "cargo" || filter === "all") ? cargos.find(c => c.id === openedDetailsCardId) : undefined}
                    vehicle={(filter === "vehicle" || filter === "all") ? vehicles.find(v => v.id === openedDetailsCardId) : undefined}
                    onClose={() => {
                      setOpenedDetailsCardId(null);
                      setIsDetailsOpen(false);
                    }}
                  />
                </div>
              )}

              {/* Правая часть – карточки */}
              <div className={`${isDetailsOpen ? "col-lg-8 col-md-7" : "col-12"}`}>
                {filter === "cargo" && (
                  <div className="cargo-list">
                    <h4 className="mt-5">{t("available_cargo")}</h4>
                    {cargos.length > 0 ? cargos.map(cargo => (
                      <CargoCard
                        key={cargo.id}
                        cargo={cargo}
                        setIsDetailsOpen={setIsDetailsOpen}
                        openedDetailsCardId={openedDetailsCardId}
                        setOpenedDetailsCardId={setOpenedDetailsCardId}
                      />
                    )) : (
                      <div className="text-muted">{t("no_cargos_found")}</div>
                    )}
                  </div>
                )}

                {filter === "vehicle" && (
                  <div className="cargo-list">
                    <h4 className="mt-5">{t("available_vehicles")}</h4>
                    {vehicles.length > 0 ? vehicles.map(vehicle => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        setIsDetailsOpen={setIsDetailsOpen}
                        openedDetailsCardId={openedDetailsCardId}
                        setOpenedDetailsCardId={setOpenedDetailsCardId}
                        setIsEditing={setIsEditing}
                      />
                    )) : (
                      <div className="text-muted">{t("no_vehicles_found")}</div>
                    )}
                  </div>
                )}

                {filter === "all" && (
                  <>
                    <div className="cargo-list">
                      {cargos.length > 0 ? cargos.map(cargo => (
                        <CargoCard
                          key={cargo.id}
                          cargo={cargo}
                          setIsDetailsOpen={setIsDetailsOpen}
                          openedDetailsCardId={openedDetailsCardId}
                          setOpenedDetailsCardId={setOpenedDetailsCardId}
                        />
                      )) : (
                        <div className="text-muted">{t("no_cargos_found")}</div>
                      )}
                    </div>

                    <div className="cargo-list">
                      {vehicles.length > 0 ? vehicles.map(vehicle => (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          setIsDetailsOpen={setIsDetailsOpen}
                          openedDetailsCardId={openedDetailsCardId}
                          setOpenedDetailsCardId={setOpenedDetailsCardId}
                        />
                      )) : (
                        <div className="text-muted">{t("no_vehicles_found")}</div>
                      )}
                    </div>
                  </>
                )}
=======
      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <h4 className="mb-4">{t("available_cargo")}</h4>
            <table className="table table-hover cargo-table">
              <thead>
                <tr>
                  <th>{t("time")}</th>
                  <th>{t("origin_destination")}</th>
                  <th>{t("cargo")}</th>
                  <th>{t("notes")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>18.03.2024 09:00</td>
                  <td>Zurich → Bern</td>
                  <td>Post & Bags</td>
                  <td>Fragile</td>
                </tr>
                <tr>
                  <td>19.03.2024 12:00</td>
                  <td>Geneva → Sion</td>
                  <td>Goods on Pallets</td>
                  <td>Time-critical</td>
                </tr>
                <tr>
                  <td>20.03.2024 08:30</td>
                  <td>Lugano → Chur</td>
                  <td>Equipment</td>
                  <td>Heavy load</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{t("need_carriers")}</h5>
                <p className="card-text">{t("carriers_hint")}</p>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-cargo">
                    {t("add_cargo")}
                  </Link>
                </li>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{t("search")}</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="region" className="form-label">{t("region")}</label>
                    <select className="form-select" id="region">
                      <option>{t("all_regions")}</option>
                      <option>Zurich</option>
                      <option>Bern</option>
                      <option>Geneva</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cargoType" className="form-label">{t("cargo_type")}</label>
                    <select className="form-select" id="cargoType">
                      <option>{t("all_cargo_types")}</option>
                      <option>Equipment</option>
                      <option>Documents</option>
                      <option>Food</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="shipper" className="form-label">{t("shipper")}</label>
                    <select className="form-select" id="shipper">
                      <option>{t("all_shippers")}</option>
                      <option>Company A</option>
                      <option>Company B</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">{t("search")}</button>
                </form>
>>>>>>> Stashed changes
              </div>
            </div>

           
          </div>
          {/* Футер */}
          <footer className="bg-white border-top py-4 mt-5 fixed-bottom">
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
      </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream

      {/* Футер */}
      <footer className="bg-white border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
          <p className="mb-0 text-muted">{t("footer_text")}</p>
          <div className="footer-links">
            <Link to="/services">{t("services")}</Link>
            <Link to="/contacts">{t("contacts")}</Link>
          </div>
        </div>
      </footer>
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  );
}

export default HomePage;
