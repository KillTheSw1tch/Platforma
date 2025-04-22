  import React, { useEffect } from 'react';
  import { useState } from 'react';
  import { Link } from 'react-router-dom';
  import '../styles/CargoModal.css';
  import { useTranslation } from 'react-i18next';
  import i18n from '../i18n';
  import '../styles/EditCargoModal.css';
  import axios from 'axios';

  function CargoCard({ cargo, onDelete, setIsEditing, setIsDetailsOpen, openedDetailsCardId, setOpenedDetailsCardId }) {



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
      

    const showDetails = openedDetailsCardId === cargo.id;

    const [showConfirm, setShowConfirm] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [editConfirm, setEditConfirm] = useState(false);

    const [editFormData, setEditFormData] = useState({ ...cargo });
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
      setOpenedDetailsCardId(cargo.id);
      setIsDetailsOpen?.(true);        // 🆗 показать details
    };
    
    
    
    const closeDetails = () => {
      setOpenedDetailsCardId(null);
      setIsDetailsOpen?.(false);
    };
    
    

    const transportTypes = {
      "0": t("any_vehicle"),
      "11": t("tent"),
      "21": t("closed"),
      "4": t("isothermal"),
      "19": t("all_metal"),
      "10": t("refrigerator"),
      "1": t("bus"),
      "29": t("passenger_bus"),
      "30": t("luxury_bus"),
      "17": t("car_carrier"),
      "23": t("crane_truck"),
      "39": t("fuel_tanker"),
      "50": t("concrete_mixer"),
      "42": t("bitumen_tanker"),
      "44": t("flour_tanker"),
      "7": t("flatbed"),
      "8": t("open_truck"),
      "41": t("tow_truck"),
      "43": t("excavator"),
      "3": t("grain_truck"),
      "58": t("grain_dump"),
      "54": t("empty_container"),
      "24": t("container_truck"),
      "53": t("feed_truck"),
      "5": t("forest_truck"),
      "57": t("manipulator"),
      "40": t("oil_tanker"),
      "36": t("furniture_truck"),
      "56": t("metal_scrap_truck"),
      "34": t("minibus"),
      "33": t("oversized"),
      "47": t("panel_truck"),
      "9": t("platform"),
      "52": t("poultry_truck"),
      "59": t("roll_carrier"),
      "22": t("dump_truck"),
      "48": t("glass_truck"),
      "38": t("cattle_truck"),
      "37": t("special_vehicle"),
      "31": t("trawl"),
      "35": t("pipe_carrier"),
      "28": t("tractor"),
      "32": t("cement_truck"),
      "49": t("gas_tanker"),
      "51": t("isothermal_tanker"),
      "2": t("food_tanker"),
      "14": t("chemical_tanker"),
      "20": t("plastic_tank"),
      "55": t("chip_truck")
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
            {cargo.hidden && (
              <div className="cargo-hidden-badge">
                {t("hidden")}
              </div>
            )}


            <h5 className="card-title">
              {cargo.loading_canton}, {cargo.loading_city_primary} {cargo.loading_postal_primary} → {cargo.unloading_canton}, {cargo.unloading_city_primary} {cargo.unloading_postal_primary}
            </h5>
            <p className="card-text cargo-inline-row">
            <span className="cargo-info-block" style={{ fontSize: '0.9rem' }}>
              <strong>{t("date")}</strong> {new Date(cargo.date_from).toLocaleDateString()} - {new Date(cargo.date_to).toLocaleDateString()}
            </span>
              <span className="cargo-info-block"> <strong>{t("type")}:</strong> {cargo.cargo_type}</span>
              <span className="cargo-info-block"> <strong>{t("transport_type")}</strong> {transportTypes[cargo.transport_type] || t("unknown")}</span>
              <span className="cargo-info-block"> <strong>{t("weight")}</strong> {cargo.weight} t</span>
              <span className="cargo-info-block"> <strong>{t("volume")}</strong> {cargo.volume ? cargo.volume + ' m³' : 'N/A'}</span>
              <span className="cargo-info-block"> <strong>{t("price")}</strong> {cargo.price} </span>    
            </p>
            <div className="cargo-bottom-row">
              <button onClick={openDetails} className="btn_view_details">
                {t("view_details")}
              </button>

              {onDelete && (
                <div className="card-button-container">

                {cargo.is_completed !== true && (
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
                      .put(`http://127.0.0.1:8000/api/cargo/${cargo.id}/`, {
                        ...cargo,
                        hidden: !cargo.hidden,
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
                    {cargo.hidden ? `${t("show")}` : `${t("hide")}`}
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
                    onDelete(cargo.id);
                    setShowConfirm(false);
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
                    axios.put(`http://127.0.0.1:8000/api/cargo/${cargo.id}/`, {
                      ...cargo,
                      is_completed: true
                    }, {
                      headers: { Authorization: `Token ${localStorage.getItem('authToken')}` }
                    }).then(() => {
                      const saved = localStorage.getItem('companyData');
                      if (saved) {
                        const parsed = JSON.parse(saved);
                        parsed.totalOrders = (parsed.totalOrders || 0) + 1;
                        parsed.activeOrders = Math.max((parsed.activeOrders || 1) - 1, 0);
                        localStorage.setItem('companyData', JSON.stringify(parsed));
                      }
                      onDelete(cargo.id);
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





          {showDetails && (
            <div className={`edit-panel-left open`}>
              <button className="edit-close-btn" onClick={closeDetails}>
                &times;
              </button>


              <div className="edit-details-content">
                <h4 className="edit-title">
                  {t("details_of")} {cargo.loading_canton}, {cargo.loading_city_primary} ({cargo.loading_postal_primary}) → {cargo.unloading_canton}, {cargo.unloading_city_primary} ({cargo.unloading_postal_primary})
                </h4>

                <p>
                  📅 <strong>{t("from")}</strong> {cargo.date_from}<br />
                  📅 <strong>{t("to")}</strong> {cargo.date_to}<br />
                  🏠 <strong>{t("loading_street")}</strong> {cargo.cargo_loading_street || 'N/A'}<br />
                  🏁 <strong>{t("unloading_street")}</strong> {cargo.cargo_unloading_street || 'N/A'}<br />
                  📦 <strong>{t("type")}</strong> {cargo.cargo_type}<br />
                  🚚 <strong>{t("transport_type")}</strong> {transportTypes[cargo.transport_type] || t("unknown")}<br />
                  ⚖️ <strong>{t("weight")}</strong> {cargo.weight} t<br />
                  📐 <strong>{t("volume")}</strong> {cargo.volume ? cargo.volume + ' m³' : 'N/A'}<br />
                  📝 <strong>{t("notes")}</strong> {cargo.extra_info || 'No extra info'}
                </p>

                <h5>{t("contact_information")}</h5>
                <p>
                  🏢 <strong>{t("company")}:</strong> {cargo.company_name || 'N/A'}<br />
                  👤 <strong>{t("name")}:</strong> {cargo.contact_name || 'N/A'}<br />
                  🌟 <strong>{t("rating")}:</strong> {renderStars(cargo.rating || 4)}<br />
                  📞 <strong>{t("phone_1")}:</strong> {cargo.phone_number || 'N/A'}<br />
                  ✉️ <strong>{t("email")}:</strong> {cargo.email || 'N/A'}<br />
                  💬 <strong>{t("viber_whatsapp_1")}:</strong> {cargo.viber_whatsapp_number || 'N/A'}
                </p>

                <h5>{t("reviews")}</h5>
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
                                <label className="form-label">{t('loading_canton')}</label>
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
                                <label className="form-label">{t('loading_city')}</label>
                                <input
                                  className="form-control"
                                  name="loading_city_primary"
                                  value={editFormData.loading_city_primary}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('loading_postal_code')}</label>
                                <input
                                  className="form-control"
                                  name="loading_postal_primary"
                                  value={editFormData.loading_postal_primary}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('unloading_canton')}</label>
                                <select
                                  className="form-select"
                                  name="loading_canton"
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
                                <label className="form-label">{t('unloading_city')}</label>
                                <input
                                  className="form-control"
                                  name="unloading_city_primary"
                                  value={editFormData.unloading_city_primary}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('unloading_postal_code')}</label>
                                <input
                                  className="form-control"
                                  name="unloading_postal_primary"
                                  value={editFormData.unloading_postal_primary}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('date_from')}</label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="date_from"
                                  value={editFormData.date_from}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('date_to')}</label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="date_to"
                                  value={editFormData.date_to}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('cargo_type')}</label>
                                <input
                                  className="form-control"
                                  name="cargo_type"
                                  value={editFormData.cargo_type}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('weight_tons')}</label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="weight"
                                  value={editFormData.weight}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('volume_m3')}</label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="volume"
                                  value={editFormData.volume}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('transport_type')}</label>
                                <select
                                  className="form-select"
                                  name="transport_type"
                                  value={editFormData.transport_type}
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
                                  name="truck_count"
                                  value={editFormData.truck_count}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('price')}</label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="price"
                                  value={editFormData.price}
                                  onChange={handleEditChange}
                                />
                              </div>

                              <div className="col-12">
                                <label className="form-label">{t('extra_information')}</label>
                                <textarea
                                  className="form-control"
                                  rows="2"
                                  name="extra_info"
                                  value={editFormData.extra_info}
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
                                  const response = await axios.put(`http://127.0.0.1:8000/api/cargo/${cargo.id}/`, editFormData);
                                  if (response.status === 200 || response.status === 204) {
                                    alert(t("order_updated"));
                                    setShowEdit(false);
                                    setIsEditing?.(false); // ✅ отключить сдвиг
                                  }
                                } catch (error) {
                                  console.error("Ошибка при обновлении:", error);
                                  alert(t("update_error"));
                                }
                              }}
                            >
                              {t("yes")}
                            </button>
                            <button className="btn btn-secondary" onClick={() => setEditConfirm(false)}>
                              {t("no")}
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

  export default CargoCard;
