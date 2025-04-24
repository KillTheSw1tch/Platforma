import React, { useEffect, useState } from 'react';
import '../styles/Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
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

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

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
      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-pills py-2">
            <li className="nav-item me-3">
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
            </li>
          </ul>
        </div>
      </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}

export default HomePage;
