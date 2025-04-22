import React, { useEffect, useState } from 'react';
import '../styles/Home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import axios from 'axios';
import CargoCard from '../components/CargoCard';
import VehicleCard from '../components/VehicleCard';
import DetailsPanel from '../components/DetailsPanel'; // путь к компоненту


function HomePage() {
  const { t } = useTranslation();
  const [cargos, setCargos] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Стан для фільтра: "all" - всі, "cargo" - лише вантажі, "vehicle" - лише автомобілі
  const [filter, setFilter] = useState("all");

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [openedDetailsCardId, setOpenedDetailsCardId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);





  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    // Отримання даних із бекенду для вантажів
    axios.get('http://127.0.0.1:8000/api/cargo/')
      .then(response => {
        setCargos(response.data.filter(c => !c.hidden));
      })
      .catch(error => {
        console.error("Error fetching cargos:", error);
      });

    // Отримання даних із бекенду для транспортних засобів
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
      {/* Service Menu – не змінюємо існуючі посилання */}
      <div className="bg-light border-bottom">
        <div className="container">
          <ul className="nav nav-pills py-2">
            <li className="nav-item me-3">
              {isLoggedIn ? (
                <>
                  <Link to="/add-vehicle" className="btn btn-primary me-3">
                    {t("add_vehicle")}
                  </Link>
                  <Link to="/add-cargo" className="btn btn-primary">
                    {t("add_cargo")}
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => alert("Пожалуйста, войдите или зарегистрируйтесь перед добавлением груза или машины.")}
                  >
                    {t("add_vehicle")}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => alert("Пожалуйста, войдите или зарегистрируйтесь перед добавлением груза или машины.")}
                  >
                    {t("add_cargo")}
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      
      {/* Advertisement Section */}
      <div className="container my-4">
        <div style={{
          backgroundColor: '#fffbea',
          border: '1px solid #ffe58f',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '10px' }}>
            🔈 {t("advertisement") || "Рекламний блок"}
          </h4>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>
            🚛 Потрібен надійний перевізник? Додайте свій вантаж та отримайте пропозиції вже сьогодні!
          </p>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="btn btn-warning">
            👉 Детальніше
          </a>
        </div>
      </div>
      
      {/* Фільтруючі кнопки (додаємо після рекламного блоку) */}
      <div className="container my-4">
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-secondary "
            onClick={() => setFilter("cargo")}
          >
            {t("available_cargo")}
          </button>
          
          <Link to="/search-cargo" className="btn btn-primary">
              {t("find_trans_cargo")}
          </Link>
          
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setFilter("vehicle")}
          >
            {t("available_vehicle")}
          </button>
        </div>
      </div>
      
      {/* Основний контент залежно від фільтра */}
      <div className="container my-5 position-relative">
        <div className="row">
          <div className="col-12">
            {filter === "cargo" && (
              <div className={`row cargo-list ${isDetailsOpen || isEditing ? 'shifted' : ''}`}>


                <h4 className="mt-5">{t("available_cargo")}</h4>
                {cargos.length > 0 ? cargos.map((cargo) => (
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
                <div className={`row cargo-list ${isDetailsOpen || isEditing ? 'shifted' : ''}`}>

                <h4 className="mt-5">{t("available_vehicles")}</h4>
                
                  {vehicles.length > 0 ? vehicles.map((vehicle) => (
                    <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    setIsDetailsOpen={setIsDetailsOpen}
                    openedDetailsCardId={openedDetailsCardId}
                    setOpenedDetailsCardId={setOpenedDetailsCardId}
                    setIsEditing={setIsEditing}   // 🔥 добавь это
                  />
                  )) : (
                    <div className="text-muted">{t("no_vehicles_found")}</div>
                  )}
                </div>
              
            )}

            {filter === "all" && (
              <>
                <div className={`row cargo-list ${isDetailsOpen || isEditing ? 'shifted' : ''}`}>
                  {cargos.length > 0 ? cargos.map((cargo) => (
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

                
                <div className={`row cargo-list ${isDetailsOpen || isEditing ? 'shifted' : ''}`}>
                  {vehicles.length > 0 ? vehicles.map((vehicle) => (
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

      <DetailsPanel
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setOpenedDetailsCardId(null);
        }}
        cargo={cargos.find(c => c.id === openedDetailsCardId)}
      />

      
      {/* Footer */}
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


/*<div className="card">
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
              </div>
            </div>*/
