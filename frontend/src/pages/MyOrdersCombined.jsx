import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CargoCard from '../components/CargoCard';
import VehicleCard from '../components/VehicleCard';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import '../styles/Myorder.css';



function MyOrdersCombined() {

  const { t } = useTranslation();

  const [cargos, setCargos] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [viewMode, setViewMode] = useState('cargo');
  const [isEditing, setIsEditing] = useState(false);

  const [openedDetailsCardId, setOpenedDetailsCardId] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);





  const navigate = useNavigate();

  

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }

    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (!token || !email) {
      alert("Пожалуйста, войдите в систему.");
      navigate('/login');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/cargo/', {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => {
        const userCargos = res.data.filter(c => c.email === email);
        setCargos(userCargos);
      })
      .catch(err => console.error("Ошибка при получении грузов:", err));

    axios.get('http://127.0.0.1:8000/api/trucks/', {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => {
        const userVehicles = res.data.filter(v => v.email === email);
        setVehicles(userVehicles);
      })
      .catch(err => console.error("Ошибка при получении транспорта:", err));
  }, []);

  return (
    <div className="container my-5">


      <h2 className="mb-4">{t("my_orders")}</h2>

      <div className="mb-4 d-flex gap-3">
        <button
          className={`btn ${viewMode === 'cargo' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('cargo')}
        >
          {t("cargo")}
        </button>
        <button
          className={`btn ${viewMode === 'vehicle' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setViewMode('vehicle');
            setIsDetailsOpen(false); // сброс сдвига
            setIsEditing(false);     // сброс сдвига от редактирования
          }}
          
        >
           {t("transportation")}
        </button>
      </div>

      <div className={`row cargo-list ${isEditing || isDetailsOpen ? 'shifted' : ''}`}>
        {viewMode === 'cargo' ? (
          cargos.length > 0 ? (
            cargos.map(c => (
              <CargoCard
              key={c.id}
              cargo={c}
              onDelete={(id) => {
                const token = localStorage.getItem('authToken');
                axios.delete(`http://127.0.0.1:8000/api/cargo/${id}/`, {
                  headers: { Authorization: `Token ${token}` }
                }).then(() => {
                  setCargos(prev => prev.filter(cargo => cargo.id !== id));
                }).catch(err => {
                  console.error("Ошибка при удалении груза:", err);
                  alert("⚠️ Не удалось удалить заказ");
                });
              }}
              setIsEditing={setIsEditing}
              setIsDetailsOpen={setIsEditing}
              openedDetailsCardId={openedDetailsCardId}         // <-- ДОБАВЬ ЭТО
              setOpenedDetailsCardId={setOpenedDetailsCardId}   // <-- И ЭТО
              setIsDetailsOpen={setIsDetailsOpen}  
            />

            ))
          ) : (
            <p className="text-muted">{t("no_cargo_yet")}</p>
          )
        ) : (
          vehicles.length > 0 ? (
            vehicles.map(v => (
              <VehicleCard
              key={v.id}
              vehicle={v}
              onDelete={(id) => {
                const token = localStorage.getItem('authToken');
                axios.delete(`http://127.0.0.1:8000/api/trucks/${id}/`, {
                  headers: { Authorization: `Token ${token}` }
                }).then(() => {
                  setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
                }).catch(err => {
                  console.error("Ошибка при удалении груза:", err);
                  alert("⚠️ Не удалось удалить заказ");
                });
              }}
              setIsEditing={setIsEditing}
              setIsDetailsOpen={setIsEditing}
              openedDetailsCardId={openedDetailsCardId}         // <-- ДОБАВЬ ЭТО
              setOpenedDetailsCardId={setOpenedDetailsCardId}   // <-- И ЭТО
              setIsDetailsOpen={setIsDetailsOpen}  
            />
            ))
          ) : (
            <p className="text-muted">{t("no_vehicles_yet")}</p>
          )
        )}
      </div>
    </div>
  );
}

export default MyOrdersCombined;
