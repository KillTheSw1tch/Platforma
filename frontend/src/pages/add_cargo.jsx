<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/add_cargo.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { search } from 'swiss-zipcodes';


function AddCargoRequest() {

  const { t } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [])

  

  const [formData, setFormData] = useState({
    loading_city_primary: '',
    loading_postal_primary: '',
    unloading_city_primary: '',
    unloading_postal_primary: '',
    cargo_type: '',
    weight: '',
    volume: '',
    date_from: '',
    date_to: '',
    transport_type: '',
    truck_count: '',
    price: '',
    extra_info: '',
    loading_canton: '',
    unloading_canton: '',
    phone_number: '',
    viber_whatsapp_number: '',
    email: localStorage.getItem('userEmail') || '',
    cargo_loading_street: '',
    cargo_unloading_street: '',
    zipErrors: {
      loading: '',
      unloading: ''
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!formData.transport_type) {
        setFormData((prevFormData) => ({ ...prevFormData, transport_type: '0' }));
    }
  }, [formData]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cargo/', formattedData);
        if (response.status === 201) {
            navigate('/'); // Виклик перенаправлення після успішного збереження
        }
    } catch (error) {
        console.error(t('error'), error);
        alert(t('data_save_error'));
    }
  };

  const formattedData = {
    loading_city_primary: formData.loading_city_primary || '',
    loading_postal_primary: formData.loading_postal_primary || '',
    unloading_city_primary: formData.unloading_city_primary || '',
    unloading_postal_primary: formData.unloading_postal_primary || '',
    date_from: formData.date_from || '',
    date_to: formData.date_to || '',
    cargo_type: formData.cargo_type || '',
    weight: parseFloat(formData.weight) || 0,
    volume: parseFloat(formData.volume) || 0,
    transport_type: formData.transport_type || '',
    truck_count: parseInt(formData.truck_count) || 0,
    price: parseFloat(formData.price) || 0,
    loading_canton: formData.loading_canton || '',  // Добавлено
    unloading_canton: formData.unloading_canton || '',  // Добавлено
    phone_number: formData.phone_number || '',
    viber_whatsapp_number: formData.viber_whatsapp_number || '',
    extra_info: formData.extra_info || '',
    email: formData.email || '',
    cargo_loading_street: formData.cargo_loading_street || '',
    cargo_unloading_street: formData.cargo_unloading_street || '',
    unloadingZipCode: formData.unloadingZipCode || '',
    loadingZipCode: formData.loadingZipCode || '',
};

const handleZipChange = (e, fieldPrefix) => {
  const zip = e.target.value;
  const results = search({ zip: parseInt(zip) });

  if (results.length > 0) {
    const location = results[0];      

    setFormData(prev => ({
      ...prev,
      [`${fieldPrefix}_postal_primary`]: zip,
      [`${fieldPrefix}_city_primary`]: location.commune || '',
      [`${fieldPrefix}_canton`]: location.canton || '',
      zipErrors: {
        ...prev.zipErrors,
        [fieldPrefix]: ''
      }
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [`${fieldPrefix}_postal_primary`]: zip,
      [`${fieldPrefix}_city_primary`]: '',
      [`${fieldPrefix}_canton`]: '',
      zipErrors: {
        ...prev.zipErrors,
        [fieldPrefix]: t('zip_not_found') || 'ZIP не знайдено'
      }
    }));
  }
};

  return (
    <div className="container_addC py-5">
      <h1 className="fw-bold mb-4">{t('add_cargo_request')}</h1>
      <form onSubmit={handleSubmit} className="row g-3">

      <div className="row">
          <div className="col-md-6">
            <label className="form-label">{t('date_from')}</label>
            <input className="form-control" value={formData.date_from} name="date_from" type="date" onChange={handleChange} required/>
          </div>

          <div className="col-md-6">
            <label className="form-label">{t('date_to')}</label>
            <input className="form-control" value={formData.date_to} name="date_to" type="date" onChange={handleChange} required/>
          </div>
        </div>

        
=======
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AddCargoRequest() {
=======
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AddCargoRequest() {
>>>>>>> Stashed changes
  const { t } = useTranslation();
  const [showSecondLoading, setShowSecondLoading] = useState(false);
  const [showSecondUnloading, setShowSecondUnloading] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showExtraModal, setShowExtraModal] = useState(false);

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">{t('add_cargo_request')}</h1>
        <p>{t('specify_details')}</p>
        <div
          className="heading-line"
          style={{ borderBottom: '3px solid #57cc99', width: '60px', margin: '0.5rem auto 1.5rem' }}
        ></div>
      </div>

      <form method="POST">
        {/* Section 1: Dates */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">1. {t('dates')}</h5>
          </div>
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label htmlFor="dateFrom" className="form-label">{t('loading_from')}</label>
                <input type="date" className="form-control" id="dateFrom" defaultValue="2025-03-22" />
              </div>
              <div className="col-md-3">
                <label htmlFor="dateTo" className="form-label">{t('loading_until')}</label>
                <input type="date" className="form-control" id="dateTo" defaultValue="2025-03-22" />
              </div>
              <div className="col-md-6">
                <label className="form-label d-block">{t('unloading_approx')}</label>
                <small className="text-muted">
                  {t('single_date_range')}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Loading / Unloading Cities */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">2. {t('loading_unloading')}</h5>
          </div>
          <div className="card-body">
            {/* Primary Loading City */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="loadingCityPrimary" className="form-label">{t('primary_loading_city')}</label>
                <input type="text" className="form-control" id="loadingCityPrimary" placeholder="e.g. Zurich" />
              </div>
              <div className="col-md-6">
                <label htmlFor="loadingPostalPrimary" className="form-label">{t('postal_code')}</label>
                <input type="text" className="form-control" id="loadingPostalPrimary" placeholder="e.g. 8000" />
              </div>
            </div>
>>>>>>> Stashed changes

        <div className="form-row">
        <div className="form-group">
        <label className="form-label">{t('loading_zip_code')}</label>
        <input
            className="form-control"
            value={formData.loading_postal_primary}
            name="loading_postal_primary"
            onChange={(e) => handleZipChange(e, 'loading')}
            required
          />
          </div>
          <div className="form-group">
            <label className="form-label">{t('loading_city')}</label>
            <input className="form-control" value={formData.loading_city_primary} name="loading_city_primary" onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label className="form-label">{t('loading_street')}</label>
            <input className="form-control" value={formData.cargo_loading_street} name="cargo_loading_street" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label className="form-label">{t('loading_canton')}</label>
            
            <select className="form-select" value={formData.loading_canton} name="loading_canton" onChange={handleChange} required>
              
            <option value="">{t('select_canton')}</option>
            <option value="ZH">{t('zurich')}</option>
            <option value="BE">{t('bern')}</option>
            <option value="LU">{t('lucerne')}</option>
            <option value="UR">{t('uri')}</option>
            <option value="SZ">{t('schwyz')}</option>
            <option value="OW">{t('obwalden')}</option>
            <option value="NW">{t('nidwalden')}</option>
            <option value="GL">{t('glarus')}</option>
            <option value="ZG">{t('zug')}</option>
            <option value="FR">{t('fribourg')}</option>
            <option value="SO">{t('solothurn')}</option>
            <option value="BS">{t('basel_stadt')}</option>
            <option value="BL">{t('basel_landschaft')}</option>
            <option value="SH">{t('schaffhausen')}</option>
            <option value="AR">{t('appenzell_ausserrhoden')}</option>
            <option value="AI">{t('appenzell_innerrhoden')}</option>
            <option value="SG">{t('st_gallen')}</option>
            <option value="GR">{t('grisons')}</option>
            <option value="AG">{t('aargau')}</option>
            <option value="TG">{t('thurgau')}</option>
            <option value="TI">{t('ticino')}</option>
            <option value="VD">{t('vaud')}</option>
            <option value="VS">{t('valais')}</option>
            <option value="NE">{t('neuchatel')}</option>
            <option value="GE">{t('geneva')}</option>
            <option value="JU">{t('jura')}</option>

            
            </select>
          
          </div>
          
        </div>


        <div className="form-row">

          <div className="form-group">
            <label className="form-label">{t('unloading_zip_code')}</label>
              <input
<<<<<<< Updated upstream
                className="form-control"
                value={formData.unloading_postal_primary}
                name="unloading_postal_primary"
                onChange={(e) => handleZipChange(e, 'unloading')}
                required
              />    
            </div>

          <div className="form-group">
            <label className="form-label">{t('unloading_city')}</label>
            <input className="form-control" value={formData.unloading_city_primary} name="unloading_city_primary" onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label className="form-label">{t('unloading_street')}</label>
            <input className="form-control" value={formData.cargo_unloading_street} name="cargo_unloading_street" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label className="form-label">{t('unloading_canton')}</label>
            
            <select className="form-select" value={formData.unloading_canton} name="unloading_canton" onChange={handleChange} required>

            <option value="">{t('select_canton')}</option>
            <option value="ZH">{t('zurich')}</option>
            <option value="BE">{t('bern')}</option>
            <option value="LU">{t('lucerne')}</option>
            <option value="UR">{t('uri')}</option>
            <option value="SZ">{t('schwyz')}</option>
            <option value="OW">{t('obwalden')}</option>
            <option value="NW">{t('nidwalden')}</option>
            <option value="GL">{t('glarus')}</option>
            <option value="ZG">{t('zug')}</option>
            <option value="FR">{t('fribourg')}</option>
            <option value="SO">{t('solothurn')}</option>
            <option value="BS">{t('basel_stadt')}</option>
            <option value="BL">{t('basel_landschaft')}</option>
            <option value="SH">{t('schaffhausen')}</option>
            <option value="AR">{t('appenzell_ausserrhoden')}</option>
            <option value="AI">{t('appenzell_innerrhoden')}</option>
            <option value="SG">{t('st_gallen')}</option>
            <option value="GR">{t('grisons')}</option>
            <option value="AG">{t('aargau')}</option>
            <option value="TG">{t('thurgau')}</option>
            <option value="TI">{t('ticino')}</option>
            <option value="VD">{t('vaud')}</option>
            <option value="VS">{t('valais')}</option>
            <option value="NE">{t('neuchatel')}</option>
            <option value="GE">{t('geneva')}</option>
            <option value="JU">{t('jura')}</option>

          </select>
          </div>
          
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t('transport_type')}</label>
            <select name="transport_type" value={formData.transport_type} onChange={handleChange} className="form-select">

            
              <option value="0">{t('any_vehicle')}</option>
              <option value="1">{t('bus')}</option>
              <option value="29">{t('passenger_bus')}</option>
              <option value="30">{t('luxury_bus')}</option>
              <option value="17">{t('car_carrier')}</option>
              <option value="23">{t('crane_truck')}</option>
              <option value="39">{t('fuel_tanker')}</option>
              <option value="50">{t('concrete_mixer')}</option>
              <option value="42">{t('bitumen_tanker')}</option>
              <option value="44">{t('flour_tanker')}</option>
              <option value="7">{t('flatbed')}</option>
              <option value="8">{t('open_truck')}</option>
              <option value="41">{t('tow_truck')}</option>
              <option value="43">{t('excavator')}</option>
              <option value="3">{t('grain_truck')}</option>
              <option value="58">{t('grain_dump')}</option>
              <option value="4">{t('isothermal')}</option>
              <option value="54">{t('empty_container')}</option>
              <option value="24">{t('container_truck')}</option>
              <option value="53">{t('feed_truck')}</option>
              <option value="21">{t('closed')}</option>
              <option value="5">{t('forest_truck')}</option>
              <option value="57">{t('manipulator')}</option>
              <option value="40">{t('oil_tanker')}</option>
              <option value="36">{t('furniture_truck')}</option>
              <option value="56">{t('metal_scrap_truck')}</option>
              <option value="34">{t('minibus')}</option>
              <option value="33">{t('oversized')}</option>
              <option value="47">{t('panel_truck')}</option>
              <option value="9">{t('platform')}</option>
              <option value="52">{t('poultry_truck')}</option>
              <option value="10">{t('refrigerator')}</option>
              <option value="59">{t('roll_carrier')}</option>
              <option value="22">{t('dump_truck')}</option>
              <option value="48">{t('glass_truck')}</option>
              <option value="38">{t('cattle_truck')}</option>
              <option value="37">{t('special_vehicle')}</option>
              <option value="11">{t('tent')}</option>
              <option value="31">{t('trawl')}</option>
              <option value="35">{t('pipe_carrier')}</option>
              <option value="28">{t('tractor')}</option>
              <option value="32">{t('cement_truck')}</option>
              <option value="49">{t('gas_tanker')}</option>
              <option value="51">{t('isothermal_tanker')}</option>
              <option value="2">{t('food_tanker')}</option>
              <option value="14">{t('chemical_tanker')}</option>
              <option value="19">{t('all_metal')}.</option>
              <option value="20">{t('plastic_tank')}</option>
              <option value="55">{t('chip_truck')}</option>
              </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('weight_tons')}</label>
            <input className="form-control" value={formData.weight} name="weight" type="number" onChange={handleChange} required/>
          </div>

          <div className="form-group">
            <label className="form-label">{t('volume_m3')}</label>
            <input className="form-control" value={formData.volume} name="volume" type="number" onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">{t('cargo_type')}</label>
            <input className="form-control" value={formData.cargo_type} name="cargo_type" onChange={handleChange} required/>
          </div>

          <div className="col-md-4">
            <label className="form-label">{t('truck_count')}</label>
            <input className="form-control" value={formData.truck_count} name="truck_count" type="number" onChange={handleChange}/>
          </div>

          <div className="col-md-4">
            <label className="form-label">{t('price')}</label>
            <input className="form-control" value={formData.price} name="price" type="number" onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">{t('telephone')}</label>
            <input className="form-control"  value={formData.phone} name="phone_number"  onChange={handleChange} required/>
          </div>

          <div className="col-md-4">
            <label className="form-label">{t('email')}</label>
            <input className="form-control" value={formData.email} name="email" onChange={handleChange} required/>
          </div>

          <div className="col-md-4">
            <label className="form-label">{t('whatsapp')}/Viber</label>
            <input className="form-control" value={formData.viber_whatsapp_number} name="viber_whatsapp_number" onChange={handleChange} required/>
=======
                type="checkbox"
                className="form-check-input"
                id="checkSecondLoadingCity"
                onChange={(e) => setShowSecondLoading(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="checkSecondLoadingCity">
                {t('add_second_loading_city')}
              </label>
            </div>
            {showSecondLoading && (
              <div id="secondLoadingCityContainer">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="loadingCitySecondary" className="form-label">{t('second_loading_city')}</label>
                    <input type="text" className="form-control" id="loadingCitySecondary" placeholder="e.g. Bern" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="loadingPostalSecondary" className="form-label">{t('postal_code')}</label>
                    <input type="text" className="form-control" id="loadingPostalSecondary" placeholder="e.g. 3000" />
                  </div>
                </div>
              </div>
            )}
            <hr />

            {/* Primary Unloading City */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="unloadingCityPrimary" className="form-label">{t('primary_unloading_city')}</label>
                <input type="text" className="form-control" id="unloadingCityPrimary" placeholder="e.g. Lugano" />
              </div>
              <div className="col-md-6">
                <label htmlFor="unloadingPostalPrimary" className="form-label">{t('postal_code')}</label>
                <input type="text" className="form-control" id="unloadingPostalPrimary" placeholder="e.g. 6900" />
              </div>
            </div>

            {/* Secondary Unloading City */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkSecondUnloadingCity"
                onChange={(e) => setShowSecondUnloading(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="checkSecondUnloadingCity">
                {t('add_second_unloading_city')}
              </label>
            </div>
            {showSecondUnloading && (
              <div id="secondUnloadingCityContainer">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="unloadingCitySecondary" className="form-label">{t('second_unloading_city')}</label>
                    <input type="text" className="form-control" id="unloadingCitySecondary" placeholder="e.g. Geneva" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="unloadingPostalSecondary" className="form-label">{t('postal_code')}</label>
                    <input type="text" className="form-control" id="unloadingPostalSecondary" placeholder="e.g. 1201" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Cargo Details */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">3. {t('cargo_details')}</h5>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="cargoType" className="form-label">{t('cargo_type1')}</label>
                <input type="text" className="form-control" id="cargoType" placeholder="e.g. Pallets, Equipment" />
              </div>
              <div className="col-md-3">
                <label htmlFor="cargoWeight" className="form-label">{t('weight_tons')}</label>
                <input type="text" className="form-control" id="cargoWeight" placeholder="e.g. 1.5" />
              </div>
              <div className="col-md-3">
                <label htmlFor="cargoVolume" className="form-label">{t('volume_m3')}</label>
                <input type="text" className="form-control" id="cargoVolume" placeholder="e.g. 5" />
              </div>
            </div>

            {/* Additional Loading Options */}
            <div className="mb-3">
              <div className="d-flex flex-wrap">
                <div className="form-check me-3">
                  <input type="checkbox" className="form-check-input" id="noAdditionalLoading" />
                  <label className="form-check-label" htmlFor="noAdditionalLoading">
                    {t('no_additional_loading')}
                  </label>
                </div>
                <div className="form-check me-3">
                  <input type="checkbox" className="form-check-input" id="additionalLoading" />
                  <label className="form-check-label" htmlFor="additionalLoading">
                    {t('additional_loading')}
                  </label>
                </div>
                <div className="form-check me-3">
                  <input type="checkbox" className="form-check-input" id="possibleExtraLoading" />
                  <label className="form-check-label" htmlFor="possibleExtraLoading">
                    {t('possible_extra_loading')}
                  </label>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" id="specifyDimensions"
                onChange={(e) => setShowDimensions(e.target.checked)} />
              <label className="form-check-label" htmlFor="specifyDimensions">
                {t('specify_dimensions')}
              </label>
            </div>
            {showDimensions && (
              <div id="dimensionsContainer">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="cargoLength" className="form-label">{t('length')}</label>
                    <input type="text" className="form-control" id="cargoLength" placeholder="e.g. 10" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="cargoWidth" className="form-label">{t('width')}</label>
                    <input type="text" className="form-control" id="cargoWidth" placeholder="e.g. 2.5" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="cargoHeight" className="form-label">{t('height')}</label>
                    <input type="text" className="form-control" id="cargoHeight" placeholder="e.g. 3" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Transport & Price */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">4. {t('transport_price')}</h5>
          </div>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="transportType" className="form-label">{t('transport_type')}</label>
                <select id="transportType" className="form-select">
                  <option value="0" selected>{t('not_specified')}</option>
                  <option value="11">{t('tarp')}</option>
                  <option value="21">{t('closed')}</option>
                  <option value="4">{t('isothermal')}</option>
                  <option value="19">{t('all_metal')}</option>
                  <option value="10">{t('refrigerator')}</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="truckCount" className="form-label">{t('number_of_trucks')}</label>
                <input type="text" className="form-control" id="truckCount" placeholder="e.g. 1" />
              </div>
            </div>

            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label htmlFor="price" className="form-label fw-bold">{t('price')}</label>
                <input type="text" className="form-control" id="price" placeholder="e.g. 1000" />
              </div>
              <div className="col-md-3">
                <label htmlFor="priceCurrency" className="form-label">{t('currency')}</label>
                <select id="priceCurrency" className="form-select">
                  <option value="0" selected>{t('not_specified')}</option>
                  <option value="1">UAH</option>
                  <option value="3">EUR</option>
                  <option value="2">USD</option>
                  <option value="93">CHF</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="pricePerUnit" className="form-label">{t('per_unit')}</label>
                <select id="pricePerUnit" className="form-select">
                  <option value="0" selected>{t('total')}</option>
                  <option value="-2">{t('per_kilometer')}</option>
                  <option value="-1">{t('per_ton')}</option>
                </select>
              </div>
              <div className="col-md-3">
                <a href="#" className="text-decoration-underline" onClick={() => alert('Show additional payment details form')}>
                {t('add_payment_details')}
                </a>
              </div>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
    

<<<<<<< Updated upstream
        <div className="col-12">
          <label className="form-label">{t('extra_information')}</label>
          <textarea className="form-control" value={formData.extra_info} name="extra_info" rows="3" onChange={handleChange}></textarea>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-primary me-3" type="submit">{t('submit')}</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>{t('home')}</button>
        </div>
      </form>
=======
        {/* Section 5: Contact Information */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">5. {t('contact_information')}</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">{t('email')}</label>
                <div className="d-flex">
                  <input type="email" className="form-control" placeholder="e.g. example@domain.com" />
                  <a href="#" className="ms-2 align-self-center text-decoration-underline" onClick={() => alert('Add new email modal')}>
                    {t('add')}
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">{t('skype')}</label>
                <div className="d-flex">
                  <input type="text" className="form-control" placeholder="e.g. skype_id" />
                  <a href="#" className="ms-2 align-self-center text-decoration-underline" onClick={() => alert('Add new Skype modal')}>
                    {t('add')}
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">{t('viber_whatsapp')}</label>
                <div className="d-flex">
                  <input type="tel" className="form-control" placeholder="e.g. +41 123 4567" />
                  <a href="#" className="ms-2 align-self-center text-decoration-underline" onClick={() => alert('Add phone modal')}>
                    {t('add')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Additional Info & Extra Modal Trigger */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">6. {t('extra_information')}</h5>
          </div>
          <div className="card-body">
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="humanitarianAid" />
              <label className="form-check-label" htmlFor="humanitarianAid">
                {t('humanitarian_aid')}
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">{t('extra_information')}</label>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => setShowExtraModal(true)}
                >
                  {t('add_extra_info')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit & Home Buttons */}
        <div className="text-center mb-5">
          <button type="submit" className="btn btn-main px-5 py-2">
            {t('submit_request')}
          </button>
          <button
            type="button"
            className="btn btn-secondary px-5 py-2 ms-3"
            onClick={() => window.location.href = '/'}
          >
            {t('home')}
          </button>
        </div>
      </form>

      {/* Extra Info Modal */}
      {showExtraModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('additional_info')}</h5>
                <button type="button" className="btn-close" onClick={() => setShowExtraModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Documents */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">{t('documents')}</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="tir" />
                      <label className="form-check-label" htmlFor="tir">{t('tir')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="cmr" />
                      <label className="form-check-label" htmlFor="cmr">{t('cmr')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="adr" />
                      <label className="form-check-label" htmlFor="adr">{t('adr')}</label>
                    </div>
                  </div>

                  {/* Loading */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">{t('loading')}</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="topLoading" />
                      <label className="form-check-label" htmlFor="topLoading">{t('top')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="sideLoading" />
                      <label className="form-check-label" htmlFor="sideLoading">{t('side')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="backLoading" />
                      <label className="form-check-label" htmlFor="backLoading">{t('back')}</label>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">{t('conditions')}</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="fragile" />
                      <label className="form-check-label" htmlFor="fragile">{t('fragile')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="temperature" />
                      <label className="form-check-label" htmlFor="temperature">{t('temperature_controlled')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="express" />
                      <label className="form-check-label" htmlFor="express">{t('express')}</label>
                    </div>
                  </div>

                  {/* Extra */}
                  <div className="col-md-3">
                    <h6 className="fw-bold">{t('extra')}</h6>
                    <hr />
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="insurance" />
                      <label className="form-check-label" htmlFor="insurance">{t('insurance')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="customClearance" />
                      <label className="form-check-label" htmlFor="customClearance">{t('custom_clearance')}</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="doorDelivery" />
                      <label className="form-check-label" htmlFor="doorDelivery">{t('door_delivery')}</label>
                    </div>
                  </div>
                </div>
                
                <hr className="my-4" />

                <div className="mb-3">
                  <label htmlFor="comment" className="form-label fw-bold">{t('comment')}</label>
                  <textarea className="form-control" id="comment" rows="2" placeholder={t('provide_additional_info')}></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="additionalInfo" className="form-label fw-bold">{t('additional_info')}</label>
                  <textarea className="form-control" id="additionalInfo" rows="3" placeholder={t('describe_special_conditions')}></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowExtraModal(false)}>
                  {t('close')}
                </button>
                <button type="button" className="btn btn-main" onClick={() => setShowExtraModal(false)}>
                  {t('save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
}

export default AddCargoRequest;
