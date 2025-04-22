import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';


function SearchTransportResult() {
    const { t } = useTranslation();
    const [vehicles, setVehicles] = useState([]);
    const location = useLocation();
    const [showFilter, setShowFilter] = useState(false);




    // Получение параметров из URL
    const queryParams = new URLSearchParams(location.search);

    const fromCountry = queryParams.get('fromCountry');
    const toCountry = queryParams.get('toCountry');
    const fromDate = queryParams.get('fromDate');
    const toDate = queryParams.get('toDate');
    const massFrom = queryParams.get('massFrom');
    const massTo = queryParams.get('massTo');
    const volumeFrom = queryParams.get('volumeFrom');
    const volumeTo = queryParams.get('volumeTo');
    const transportType = queryParams.get('transportType');
    const fromZipCode = queryParams.get('fromZip');
    const toZipCode = queryParams.get('toZip');


    // Состояния
    const [fromCountryState, setFromCountryState] = useState(fromCountry ?? '');
    const [toCountryState, setToCountryState] = useState(toCountry ?? '');
    const [fromDateState, setFromDateState] = useState(fromDate ?? '');
    const [toDateState, setToDateState] = useState(toDate ?? '');
    const [massFromState, setMassFromState] = useState(massFrom ?? '');
    const [massToState, setMassToState] = useState(massTo ?? '');
    const [volumeFromState, setVolumeFromState] = useState(volumeFrom ?? '');
    const [volumeToState, setVolumeToState] = useState(volumeTo ?? '');
    const [transportTypeState, setTransportTypeState] = useState(transportType ?? '');
    const [fromZip, setFromZip] = useState(fromZipCode ?? '');
    const [toZip, setToZip] = useState(toZipCode ?? '');

    const handleApplyFilter = () => {
        setShowFilter(false);
        console.log("Фильтр применен");

        axios.get('http://127.0.0.1:8000/api/trucks/')
            .then(response => {
                const allVehicles = response.data;

                const fromCountryStr = fromCountryState ? fromCountryState.toString() : "";
                const toCountryStr = toCountryState ? toCountryState.toString() : "";

                // const fromZipNum = fromZip ? parseInt(fromZip) : null;
                // const toZipNum = toZip ? parseInt(toZip) : null;

                const filteredVehicles = allVehicles.filter(vehicle => {
                    // const cargoFromZip = vehicle.loading_postal ? parseInt(vehicle.loading_postal) : null;
                    // const cargoToZip = vehicle.unloading_postal ? parseInt(vehicle.unloading_postal) : null;

                    return (
                        (fromCountryStr === "" || vehicle.loading_canton?.toString() === fromCountryStr) &&
                        (toCountryStr === "" || vehicle.unloading_canton?.toString() === toCountryStr) &&
                        (fromDateState === "" || new Date(vehicle.loading_date_from) >= new Date(fromDateState)) &&
                        (toDateState === "" || new Date(vehicle.loading_date_to) <= new Date(toDateState)) &&
                        (massFromState === "" || parseFloat(vehicle.carrying_capacity) >= parseFloat(massFromState)) &&
                        (massToState === "" || parseFloat(vehicle.carrying_capacity) <= parseFloat(massToState)) &&
                        (volumeFromState === "" || parseFloat(vehicle.useful_volume) >= parseFloat(volumeFromState)) &&
                        (volumeToState === "" || parseFloat(vehicle.useful_volume) <= parseFloat(volumeToState)) &&
                        (transportTypeState === "" || transportTypeState === "any" || vehicle.transport_type === transportTypeState) &&
                        (fromZip === "" || vehicle.loading_postal?.toString() === fromZip) &&
                        (toZip === "" || vehicle.unloading_postal?.toString() === toZip)
                    );
                });

                console.log("Отфильтрованные машины:", filteredVehicles);
                setVehicles(filteredVehicles);
            })
            .catch(error => {
                console.error("Ошибка при получении машин:", error);
            });
    };

    useEffect(() => {
        handleApplyFilter();
    }, []);

    return (
        <div>
            <div className="container my-5">
                <h2>{t("available_vehicles")}</h2>
                <button 
                    onClick={() => setShowFilter(true)} 
                    style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {t("filter")}
                </button>
                <div className="row">
                    {vehicles.length > 0 ? vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    )) : (
                        <p>{t("no_vehicles_found")}</p>
                    )}
                </div>

                {showFilter && (
                    <div style={{
                        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000'
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '450px', textAlign: 'center' }}>
                            <h3>{t("filter_options")}</h3>
                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('loading_canton')}</label>
                                <select value={fromCountryState || ''} onChange={(e) => setFromCountryState(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                                    <option value="">{t('select_canton')}</option>
                                    <option value="11">{t('zurich')}</option>
                                    <option value="21">{t('bern')}</option>
                                    <option value="4">{t('lucerne')}</option>
                                    <option value="19">{t('uri')}</option>
                                    <option value="10">{t('schwyz')}</option>
                                    <option value="1">{t('obwalden')}</option>
                                    <option value="29">{t('nidwalden')}</option>
                                    <option value="30">{t('glarus')}</option>
                                    <option value="17">{t('zug')}</option>
                                    <option value="23">{t('fribourg')}</option>
                                    <option value="39">{t('solothurn')}</option>
                                    <option value="50">{t('basel_stadt')}</option>
                                    <option value="42">{t('basel_landschaft')}</option>
                                    <option value="44">{t('schaffhausen')}</option>
                                    <option value="7">{t('appenzell_ausserrhoden')}</option>
                                    <option value="8">{t('appenzell_innerrhoden')}</option>
                                    <option value="41">{t('st_gallen')}</option>
                                    <option value="43">{t('grisons')}</option>
                                    <option value="3">{t('aargau')}</option>
                                    <option value="58">{t('thurgau')}</option>
                                    <option value="4">{t('ticino')}</option>
                                    <option value="54">{t('vaud')}</option>
                                    <option value="24">{t('valais')}</option>
                                    <option value="53">{t('neuchatel')}</option>
                                    <option value="21">{t('geneva')}</option>
                                    <option value="5">{t('jura')}</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('unloading_canton')}</label>
                                <select value={toCountryState || ''} onChange={(e) => setToCountryState(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                                    <option value="">{t('select_canton')}</option>
                                    <option value="11">{t('zurich')}</option>
                                    <option value="21">{t('bern')}</option>
                                    <option value="4">{t('lucerne')}</option>
                                    <option value="19">{t('uri')}</option>
                                    <option value="10">{t('schwyz')}</option>
                                    <option value="1">{t('obwalden')}</option>
                                    <option value="29">{t('nidwalden')}</option>
                                    <option value="30">{t('glarus')}</option>
                                    <option value="17">{t('zug')}</option>
                                    <option value="23">{t('fribourg')}</option>
                                    <option value="39">{t('solothurn')}</option>
                                    <option value="50">{t('basel_stadt')}</option>
                                    <option value="42">{t('basel_landschaft')}</option>
                                    <option value="44">{t('schaffhausen')}</option>
                                    <option value="7">{t('appenzell_ausserrhoden')}</option>
                                    <option value="8">{t('appenzell_innerrhoden')}</option>
                                    <option value="41">{t('st_gallen')}</option>
                                    <option value="43">{t('grisons')}</option>
                                    <option value="3">{t('aargau')}</option>
                                    <option value="58">{t('thurgau')}</option>
                                    <option value="4">{t('ticino')}</option>
                                    <option value="54">{t('vaud')}</option>
                                    <option value="24">{t('valais')}</option>
                                    <option value="53">{t('neuchatel')}</option>
                                    <option value="21">{t('geneva')}</option>
                                    <option value="5">{t('jura')}</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('loading_zip_code')}</label>
                                <input type="text" value={fromZip || ''} onChange={(e) => setFromZip(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('unloading_zip_code')}</label>
                                <input type="text" value={toZip || ''} onChange={(e) => setToZip(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('weight')}</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="number" value={massFromState || ''} onChange={(e) => setMassFromState(e.target.value)} placeholder={t('min_weight')} style={{ flex: 1, padding: '8px' }} />
                                    <input type="number" value={massToState || ''} onChange={(e) => setMassToState(e.target.value)} placeholder={t('max_weight')} style={{ flex: 1, padding: '8px' }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('volume')}</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="number" value={volumeFromState || ''} onChange={(e) => setVolumeFromState(e.target.value)} placeholder={t('min_volume')} style={{ flex: 1, padding: '8px' }} />
                                    <input type="number" value={volumeToState || ''} onChange={(e) => setVolumeToState(e.target.value)} placeholder={t('max_volume')} style={{ flex: 1, padding: '8px' }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('date_range')}</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="date" value={fromDateState || ''} onChange={(e) => setFromDateState(e.target.value)} style={{ flex: 1, padding: '8px' }} />
                                    <input type="date" value={toDateState || ''} onChange={(e) => setToDateState(e.target.value)} style={{ flex: 1, padding: '8px' }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label>{t('transport_type')}</label>
                                <select value={transportTypeState || ''} onChange={(e) => setTransportTypeState(e.target.value)} style={{ width: '100%', padding: '8px' }}>
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

                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                                <button 
                                    onClick={() => handleApplyFilter()} 
                                    style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
                                    {t("apply")}
                                </button>
                                <button 
                                    onClick={() => setShowFilter(false)} 
                                    style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
                                    {t("close")}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
           </div>
        </div>

        
             
         
         
        
        

    
    );
}

export default SearchTransportResult;
