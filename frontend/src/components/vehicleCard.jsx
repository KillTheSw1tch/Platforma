import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CargoModal.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import '../styles/EditCargoModal.css';
import axios from 'axios';

function VehicleCard({ vehicle, onDelete, setIsEditing, setIsDetailsOpen, openedDetailsCardId, setOpenedDetailsCardId }) {

  const { t } = useTranslation();

    // Устанавливаем сохраненный язык при загрузке
    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    const cantons = [
  { value: '', label: 'select_canton' },
  { value: 'ZH', label: 'zurich' },
  { value: 'BE', label: 'bern' },
  { value: 'LU', label: 'lucerne' },
  { value: 'UR', label: 'uri' },
  { value: 'SZ', label: 'schwyz' },
  { value: 'OW', label: 'obwalden' },
  { value: 'NW', label: 'nidwalden' },
  { value: 'GL', label: 'glarus' },
  { value: 'ZG', label: 'zug' },
  { value: 'FR', label: 'fribourg' },
  { value: 'SO', label: 'solothurn' },
  { value: 'BS', label: 'basel_stadt' },
  { value: 'BL', label: 'basel_landschaft' },
  { value: 'SH', label: 'schaffhausen' },
  { value: 'AR', label: 'appenzell_ausserrhoden' },
  { value: 'AI', label: 'appenzell_innerrhoden' },
  { value: 'SG', label: 'st_gallen' },
  { value: 'GR', label: 'grisons' },
  { value: 'AG', label: 'aargau' },
  { value: 'TG', label: 'thurgau' },
  { value: 'TI', label: 'ticino' },
  { value: 'VD', label: 'vaud' },
  { value: 'VS', label: 'valais' },
  { value: 'NE', label: 'neuchatel' },
  { value: 'GE', label: 'geneva' },
  { value: 'JU', label: 'jura' },
];

const transportTypesList = [
  { value: '0', label: 'any_vehicle' },
  { value: '1', label: 'bus' },
  { value: '29', label: 'passenger_bus' },
  { value: '30', label: 'luxury_bus' },
  { value: '17', label: 'car_carrier' },
  { value: '23', label: 'crane_truck' },
  { value: '39', label: 'fuel_tanker' },
  { value: '50', label: 'concrete_mixer' },
  { value: '42', label: 'bitumen_tanker' },
  { value: '44', label: 'flour_tanker' },
  { value: '7', label: 'flatbed' },
  { value: '8', label: 'open_truck' },
  { value: '41', label: 'tow_truck' },
  { value: '43', label: 'excavator' },
  { value: '3', label: 'grain_truck' },
  { value: '58', label: 'grain_dump' },
  { value: '4', label: 'isothermal' },
  { value: '54', label: 'empty_container' },
  { value: '24', label: 'container_truck' },
  { value: '53', label: 'feed_truck' },
  { value: '21', label: 'closed' },
  { value: '5', label: 'forest_truck' },
  { value: '57', label: 'manipulator' },
  { value: '40', label: 'oil_tanker' },
  { value: '36', label: 'furniture_truck' },
  { value: '56', label: 'metal_scrap_truck' },
  { value: '34', label: 'minibus' },
  { value: '33', label: 'oversized' },
  { value: '47', label: 'panel_truck' },
  { value: '9', label: 'platform' },
  { value: '52', label: 'poultry_truck' },
  { value: '10', label: 'refrigerator' },
  { value: '59', label: 'roll_carrier' },
  { value: '22', label: 'dump_truck' },
  { value: '48', label: 'glass_truck' },
  { value: '38', label: 'cattle_truck' },
  { value: '37', label: 'special_vehicle' },
  { value: '11', label: 'tent' },
  { value: '31', label: 'trawl' },
  { value: '35', label: 'pipe_carrier' },
  { value: '28', label: 'tractor' },
  { value: '32', label: 'cement_truck' },
  { value: '49', label: 'gas_tanker' },
  { value: '51', label: 'isothermal_tanker' },
  { value: '2', label: 'food_tanker' },
  { value: '14', label: 'chemical_tanker' },
  { value: '19', label: 'all_metal' },
  { value: '20', label: 'plastic_tank' },
  { value: '55', label: 'chip_truck' },
];

  const showDetails = openedDetailsCardId === vehicle.id;   

  const [showConfirm, setShowConfirm] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editConfirm, setEditConfirm] = useState(false);

  const [editFormData, setEditFormData] = useState({ ...vehicle });
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  const openDetails = () => {
    setShowConfirm(false);
    setShowEdit(false);
    setEditConfirm(false);
    setShowCompleteConfirm(false);
    setIsEditing?.(false);           // 🆕 чтобы не сдвигалось от редактирования
    setOpenedDetailsCardId(vehicle.id);
    setIsDetailsOpen?.(true);        // 🆗 показать details
  };
  
  const closeDetails = () => {
    setOpenedDetailsCardId(null);
    setIsDetailsOpen?.(false);
  };
  
  const transportTypes = {
    "": t("any_vehicle"),
    "not_specified": t("not_specified"),
    "tent": t("tent"),
    "isotherm": t("isothermal"),
    "all_metal": t("all_metal"),
    "refrigerator": t("refrigerator"),
    "cargo_bus": t("passenger_bus"),
    "luxury_bus": t("luxury_bus"),
    "car_carrier": t("car_carrier"),
    "crane_truck": t("crane_truck"),
    "fuel_truck": t("fuel_tanker"),
    "concrete_mixer": t("concrete_mixer"),
    "bitumen_truck": t("bitumen_tanker"),
    "flour_truck": t("flour_tanker"),
    "flatbed": t("flatbed"),
    "open_platform": t("open_truck"),
    "tow_truck": t("tow_truck"),
    "excavator": t("excavator"),
    "grain_truck": t("grain_truck"),
    "grain_dump_truck": t("grain_dump"),
    "empty_container": t("empty_container"),
    "container_carrier": t("container_carrier"),
    "feed_carrier": t("feed_truck"),
    "timber_truck": t("forest_truck"),
    "manipulator": t("manipulator"),
    "oil_truck": t("oil_tanker"),
    "furniture_truck": t("furniture_truck"),
    "metal_scrap_truck": t("metal_scrap_truck"),
    "minibus": t("minibus"),
    "oversized": t("oversized"),
    "panel_carrier": t("panel_truck"),
    "platform": t("platform"),
    "poultry_truck": t("poultry_truck"),
    "roll_carrier": t("roll_carrier"),
    "dump_truck": t("dump_truck"),
    "glass_carrier": t("glass_truck"),
    "cattle_truck": t("cattle_truck"),
    "special_vehicle": t("special_vehicle"),
    "lowboy_trailer": t("trawl"),
    "pipe_carrier": t("pipe_carrier"),
    "tractor": t("tractor"),
    "cement_truck": t("cement_truck"),
    "gas_tanker": t("gas_tanker"),
    "food_tanker": t("food_tanker"),
    "chemical_tanker": t("chemical_tanker"),
    "all_plastic": t("plastic_tank"),
    "wood_chip_truck": t("chip_truck"),
};

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} style={{ color: i <= rating ? '#ffd700' : '#ccc', fontSize: '24px' }}>
                ★
            </span>
        );
    }
    return stars;
};

  

  return (
    <div className="col-12 mb-3">
      <div className="card">
        <div className="card-body">
          {vehicle.hidden && (
                <div className="cargo-hidden-badge">
                  {t("hidden")}
                </div>
              )}


          <h5 className="card-title">
              {vehicle.loading_canton}, {vehicle.loading_city} {vehicle.loading_postal} → {vehicle.unloading_canton}, {vehicle.unloading_city} {vehicle.unloading_postal}
          </h5>
        <p className="card-text cargo-inline-row">
        <span className="cargo-info-block">
          <strong>{t("date")}</strong> {new Date(vehicle.loading_date_from).toLocaleDateString()} – {new Date(vehicle.loading_date_to).toLocaleDateString()}
        </span>


          <span className="cargo-info-block"><strong>{t("transport_type")}</strong> {transportTypes[vehicle.vehicle_type] || t("unknown")}</span>
          <span className="cargo-info-block"><strong>{t("weight")}</strong> {vehicle.carrying_capacity} t</span>
          <span className="cargo-info-block"><strong>{t("volume")}</strong> {vehicle.useful_volume ? vehicle.useful_volume + ' m³' : 'N/A'}</span>
          <span className="cargo-info-block"> <strong>{t("price")}</strong> {vehicle.price} </span>
        </p>

        <div className="cargo-bottom-row">
            <button onClick={openDetails} className="btn_view_details">
              {t("view_details")}
            </button>

            {onDelete && (
                <div className="card-button-container">

                {vehicle.is_completed !== true && (
                  <button className="btn-card-action-comp" onClick={() => {
                    setShowCompleteConfirm(true);
                    setShowConfirm(false);
                    setShowEdit(false);
                    setEditConfirm(false);
                    setIsEditing?.(false);
                    closeDetails(); // 🔥 закрываем "View Details"
                    }}>
                      {t("complete_order")}
                    </button>
                                                
                )}

                <button className="btn-card-action-edit" onClick={() => {
                  setShowEdit(true);
                  setShowConfirm(false);
                  setShowCompleteConfirm(false);
                  setEditConfirm(false);
                  setIsEditing?.(true); // включаем сдвиг
                  closeDetails(); // 🔥 закрываем "View Details"
                }}>
                  {t("edit_order")}
                </button>

                <button className="btn-card-action-delete" onClick={() => {
                    setShowConfirm(true);
                    setShowEdit(false);
                    setShowCompleteConfirm(false);
                    setEditConfirm(false);
                    setIsEditing?.(false); // 🟢 вот этого не хватало
                    closeDetails(); // 🔥 закрываем "View Details"
                  }}>
                     {t("delete_order")}
                  </button>


                  

                  <button className="btn-card-action-hide" onClick={() => {
                    setShowConfirm(false);
                    setShowEdit(false);
                    setShowCompleteConfirm(false);
                    setEditConfirm(false);
                    setIsEditing?.(false); // 🟢 вот этого не хватало
                    closeDetails(); // 🔥 закрываем "View Details"

                    axios
                      .put(`http://127.0.0.1:8000/api/cargo/${vehicle.id}/`, {
                        ...vehicle,
                        hidden: !vehicle.hidden,
                      }, {
                        headers: { Authorization: `Token ${localStorage.getItem("authToken")}` },
                      })
                      .then(() => {
                        window.location.reload();
                      })
                      .catch((err) => {
                        console.error("Ошибка при изменении видимости:", err);
                        alert("⚠️ Не удалось изменить видимость заказа");
                      });
                  }}>
                    {vehicle.hidden ? `${t("show")}` : `${t("hide")}`}
                  </button>



                </div>
              )}


            </div>


          {showConfirm && (
          <div className="card-confirm-box">
             <p>{t("confirm_delete_question") || "Вы действительно хотите удалить заказ?"}</p>
            <div className="card-confirm-buttons">
              <button
                className="btn btn-danger"
                onClick={() => {
                  const token = localStorage.getItem("authToken");
                  axios.delete(`http://127.0.0.1:8000/api/trucks/${vehicle.id}/`, {
                    headers: { Authorization: `Token ${token}` }
                  }).then(() => {
                    onDelete(vehicle.id);
                
                    const saved = localStorage.getItem('companyData');
                    if (saved) {
                      const parsed = JSON.parse(saved);
                      parsed.activeOrders = Math.max((parsed.activeOrders || 1) - 1, 0);
                      localStorage.setItem('companyData', JSON.stringify(parsed));
                    }
                
                    setShowConfirm(false);
                  }).catch((err) => {
                    console.error("Ошибка при удалении транспорта:", err);
                    alert("⚠️ Не удалось удалить транспорт");
                    setShowConfirm(false);
                  });
                }}
                
              >
                {t("yes") || "Да"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                {t("no") || "Нет"}
              </button>
            </div>
          </div>
        )}

          {showCompleteConfirm && (
            <div className="card-confirm-box card-confirm-complete">
              <p>{t("confirm_complete_question") || "Вы действительно хотите завершить заказ?"}</p>
              <div className="card-confirm-buttons">
                <button
                  className="btn btn-ZaharPidor"
                  onClick={() => {
                    axios.put(`http://127.0.0.1:8000/api/trucks/${vehicle.id}/`, {
                      ...vehicle,
                      is_completed: true
                    }, {
                      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                    })
                    .then(() => {
                      const saved = localStorage.getItem('companyData');
                      if (saved) {
                        const parsed = JSON.parse(saved);
                        parsed.totalOrders = (parsed.totalOrders || 0) + 1;
                        parsed.activeOrders = Math.max((parsed.activeOrders || 1) - 1, 0);
                        localStorage.setItem('companyData', JSON.stringify(parsed));
                      }
                  
                      onDelete(vehicle.id); // удалить карточку визуально
                      setShowCompleteConfirm(false);
                    })
                    .catch(err => {
                      console.error("Ошибка при завершении заказа:", err);
                      alert("⚠️ Не удалось завершить заказ");
                      setShowCompleteConfirm(false);
                    });
                  }}
                  
                >
                  {t("yes") || "Да"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCompleteConfirm(false)}
                >
                  {t("no") || "Нет"}
                </button>
              </div>
            </div>
          )}



        {showDetails && vehicle && (
  <div className="mt-4 p-3 border-top rounded bg-light">
    <h5 className="mb-3">
      {t("details_of")} {vehicle.loading_canton}, {vehicle.loading_city} → {vehicle.unloading_canton}, {vehicle.unloading_city}
    </h5>

    <p>
      📅 <strong>{t("from")}:</strong> {new Date(vehicle.loading_date_from).toLocaleDateString()}<br />
      📅 <strong>{t("to")}:</strong> {new Date(vehicle.loading_date_to).toLocaleDateString()}<br />
      🏠 <strong>{t("loading_street")}:</strong> {vehicle.truck_loading_street || 'N/A'}<br />
      🏁 <strong>{t("unloading_street")}:</strong> {vehicle.truck_unloading_street || 'N/A'}<br />
      🚚 <strong>{t("transport_type")}:</strong> {transportTypes[vehicle.vehicle_type] || t("unknown")}<br />
      ⚖️ <strong>{t("weight")}:</strong> {vehicle.carrying_capacity} t<br />
      📐 <strong>{t("volume")}:</strong> {vehicle.useful_volume ? `${vehicle.useful_volume} m³` : 'N/A'}<br />
      📝 <strong>{t("notes")}:</strong> {vehicle.additional_info || 'No extra info'}
    </p>

    <h6>{t("contact_information")}</h6>
    <p>
      🏢 <strong>{t("company")}:</strong> {vehicle.company_name || 'N/A'}<br />
      👤 <strong>{t("name")}:</strong> {vehicle.contact_name || 'N/A'}<br />
      🌟 <strong>{t("rating")}:</strong> {renderStars(vehicle.rating || 4)}<br />
      📞 <strong>{t("phone_1")}:</strong> {vehicle.phone || 'N/A'}<br />
      ✉️ <strong>{t("email")}:</strong> {vehicle.email || 'N/A'}<br />
      💬 <strong>{t("viber_whatsapp_1")}:</strong> {vehicle.whatsapp || 'N/A'}
    </p>

    <h6>{t("reviews")}</h6>
    <div style={{
      maxHeight: '250px',
      overflowY: 'auto',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f8f9fa',
      marginTop: '10px',
      width: '100%'
    }}>
      {Array.from({ length: 2 }, (_, index) => ({
        author: `User ${index + 1}`,
        text: `This is review number ${index + 1}. The review text is intentionally made longer to test how it fits within the wider review box.`
      })).map((review, index) => (
        <div key={index} style={{
          marginBottom: '8px',
          padding: '10px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.1rem',
          wordWrap: 'break-word'
        }}>
          <span style={{ marginRight: '8px', fontSize: '20px' }}>👤</span>
          <strong style={{ marginRight: '8px' }}>{review.author}:</strong>
          {review.text}
        </div>
      ))}
    </div>
  </div>
)}




          {showEdit && (
            <>
                


            <div className={`edit-panel-left open`}>
            <button className="edit-close-btn" onClick={() => {
              setShowEdit(false);
              setIsEditing?.(false); // ✅ выключить сдвиг
            }}>
              &times;
            </button>

                {!editConfirm ? (
                  <>
                   <h4 className="edit-title">{t("edit_order")}</h4>

                    <form className="row g-3">
                      <div className="col-12">
                        <label className="form-label">{t("loading_canton")}</label>
                        <select
                          className="form-select"
                          name="loading_canton"
                          value={editFormData.loading_canton}
                          onChange={handleEditChange}
                        >
                          {cantons.map((option) => (
                            <option key={option.value} value={option.value}>
                              {t(option.label)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t("loading_city")}</label>
                        <input
                          className="form-control"
                          name="loading_city"
                          value={editFormData.loading_city}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="col-12">
                              <label className="form-label">{t('loading_postal_code')}</label>
                              <input
                                className="form-control"
                                name="loading_postal"
                                value={editFormData.loading_postal}
                                onChange={handleEditChange}
                              />
                            </div>

                      <div className="col-12">
                        <label className="form-label">{t("unloading_canton")}</label>
                        <select
                          className="form-select"
                          name="unloading_canton"
                          value={editFormData.unloading_canton}
                          onChange={handleEditChange}
                        >
                          {cantons.map((option) => (
                            <option key={option.value} value={option.value}>
                              {t(option.label)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t("unloading_city")}</label>
                        <input
                          className="form-control"
                          name="unloading_city"
                          value={editFormData.unloading_city}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t('unloading_postal_code')}</label>
                        <input
                          className="form-control"
                          name="unloading_postal"
                          value={editFormData.unloading_postal}
                          onChange={handleEditChange}
                          />
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t("date_from")}</label>
                        <input
                          className="form-control"
                          type="date"
                          name="loading_date_from"
                          value={editFormData.loading_date_from}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">{t("date_to")}</label>
                        <input
                          className="form-control"
                          type="date"
                          name="loading_date_to"
                          value={editFormData.loading_date_to}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t("weight_tons")}</label>
                        <input
                          className="form-control"
                          name="carrying_capacity"
                          value={editFormData.carrying_capacity}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">{t("volume_m3")}</label>
                        <input
                          className="form-control"
                          name="useful_volume"
                          value={editFormData.useful_volume}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t("transport_type")}</label>
                        <select
                          className="form-select"
                          name="vehicle_type"
                          value={editFormData.vehicle_type}
                          onChange={handleEditChange}
                        >
                          {transportTypesList.map((option) => (
                            <option key={option.value} value={option.value}>
                              {t(option.label)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t('truck_count')}</label>
                        <input
                          className="form-control"
                          type="number"
                          name="number_of_vehicles"
                          value={editFormData.number_of_vehicles}
                          onChange={handleEditChange}
                          />
                      </div>

                      <div className="col-12">
                        <label className="form-label">{t("price")}</label>
                        <input
                          className="form-control"
                          name="price"
                          value={editFormData.price}
                          onChange={handleEditChange}
                        />
                      </div>


                      <div className="col-12">
                        <label className="form-label">{t("extra_information")}</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          name="additional_info"
                          value={editFormData.additional_info}
                          onChange={handleEditChange}
                        ></textarea>
                      </div>
                    </form>

                    <div className="edit-center">
                      <button className="btn btn-primary" onClick={() => setEditConfirm(true)}>
                        ✅ {t("save_changes")}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="edit-center">
                    <p className="edit-confirm-text">{t("confirm_edit_question")}</p>
                    <button
                      className="btn btn-success me-3"
                      onClick={async () => {
                        try {
                          const response = await axios.put(
                            `http://127.0.0.1:8000/api/trucks/${vehicle.id}/`,
                            editFormData
                          );
                          if (response.status === 200 || response.status === 204) {
                            alert(t("order_updated") || "Транспорт успешно обновлён");
                            setShowEdit(false);
                          }
                        } catch (error) {
                          console.error("Ошибка при обновлении:", error);
                          alert(t("update_error") || "Не удалось обновить транспорт");
                        }
                      }}
                    >
                      {t("yes")}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditConfirm(false)}>
                    {t("no")}"
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
