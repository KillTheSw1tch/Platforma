     import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CargoCard from '../components/CargoCard';
import styles from '../styles/SearchCargoResult.module.css';
import VehicleCard from '../components/VehicleCard';
import { search } from 'swiss-zipcodes';


function SearchCargoResult() {
    const { t } = useTranslation();
    const [cargos, setCargos] = useState([]);
    const location = useLocation();

    const [openedDetailsCardId, setOpenedDetailsCardId] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false); // если нужен сдвиг (shifted)

    const [searchMode, setSearchMode] = useState('cargo'); // 'cargo' или 'transport'
    const [vehicles, setVehicles] = useState([]); // для транспорта




    

    // Получение параметров из URL
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
    const fromCity = queryParams.get('fromCity');
    const toCity = queryParams.get('toCity');
    


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
    const [cityFrom, setcityFrom] = useState(fromCity ?? '');
    const [cityTo, setcityTo] = useState(toCity ?? '');
    
    
    useEffect(() => {
        if (fromZip && fromZip.length >= 4) {
          const result = search({ zip: parseInt(fromZip) });
          if (result.length > 0) {
            const { commune, canton } = result[0];
            setcityFrom(commune || '');
            setFromCountryState(canton || '');
          }
        }
      }, [fromZip]);
      
      useEffect(() => {
        if (toZip && toZip.length >= 4) {
          const result = search({ zip: parseInt(toZip) });
          if (result.length > 0) {
            const { commune, canton } = result[0];
            setcityTo(commune || '');
            setToCountryState(canton || '');
          }
        }
      }, [toZip]);
     

    const handleApplyFilter = () => {
        console.log("Фильтр применен");

        const fromCountryStr = fromCountryState ? fromCountryState.toString() : "";
        const toCountryStr = toCountryState ? toCountryState.toString() : "";
        // const fromZipNum = fromZip ? parseInt(fromZip) : null;
        // const toZipNum = toZip ? parseInt(toZip) : 
        // null;
        
        if (searchMode === 'cargo') {
          axios.get('http://127.0.0.1:8000/api/cargo/')
            .then(response => {
              const allCargos = response.data;
        
              const filteredCargos = allCargos.filter(cargo => {
                const cargoFromZip = cargo.loading_postal_primary ? parseInt(cargo.loading_postal_primary) : null;
                const cargoToZip = cargo.unloading_postal_primary ? parseInt(cargo.unloading_postal_primary) : null;
                const cargoCityFrom = cargo.loading_city_primary?.toLowerCase();
                const cargoCityTo = cargo.unloading_city_primary?.toLowerCase();

        
                return (
                    cargo.hidden !== true &&
                    (fromCountryStr === "" || cargo.loading_canton === fromCountryStr) &&
                    (toCountryStr === "" || cargo.unloading_canton === toCountryStr) &&
                    (fromDateState === "" || new Date(cargo.date_from) >= new Date(fromDateState)) &&
                    (toDateState === "" || new Date(cargo.date_to) <= new Date(toDateState)) &&
                    (massFromState === "" || parseFloat(cargo.weight) >= parseFloat(massFromState)) &&
                    (massToState === "" || parseFloat(cargo.weight) <= parseFloat(massToState)) &&
                    (volumeFromState === "" || parseFloat(cargo.volume) >= parseFloat(volumeFromState)) &&
                    (volumeToState === "" || parseFloat(cargo.volume) <= parseFloat(volumeToState)) &&
                    (transportTypeState === "" || transportTypeState === "any" || cargo.transport_type === transportTypeState) &&
                    (fromZip === "" || cargoFromZip === parseInt(fromZip)) &&
                    (toZip === "" || cargoToZip === parseInt(toZip)) &&
                    (cityFrom === "" || cargoCityFrom?.trim().toLowerCase() === cityFrom.trim().toLowerCase()) &&
                    (cityTo === "" || cargoCityTo?.trim().toLowerCase() === cityTo.trim().toLowerCase())


                );
              });
        
              console.log("Отфильтрованные грузы:", filteredCargos);
              setCargos(filteredCargos);
            })
            .catch(error => {
              console.error("Ошибка при получении данных (cargo):", error);
            });
        } else {
          axios.get('http://127.0.0.1:8000/api/trucks/')
            .then(response => {
              const allTrucks = response.data;
        
              const filteredTrucks = allTrucks.filter(vehicle => {
                const vehicleFromZip = vehicle.loading_postal ? parseInt(vehicle.loading_postal) : null;
                const vehicleToZip = vehicle.unloading_postal ? parseInt(vehicle.unloading_postal) : null;
                const vehicleCityFrom = vehicle.loading_city?.toLowerCase();
                const vehicleCityTo = vehicle.unloading_city?.toLowerCase();

        
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
                    (fromZip === "" || vehicleFromZip === parseInt(fromZip)) &&
                    (toZip === "" || vehicleToZip === parseInt(toZip)) &&
                    (cityFrom === "" || vehicleCityFrom?.trim().toLowerCase() === cityFrom.trim().toLowerCase()) &&
                    (cityTo === "" || vehicleCityTo?.trim().toLowerCase() === cityTo.trim().toLowerCase())





                );
              });
        
              console.log("Отфильтрованные машины:", filteredTrucks);
              setVehicles(filteredTrucks);
            })
            .catch(error => {
              console.error("Ошибка при получении данных (transport):", error);
            });

            
        }
        
    
          
          
        }  
        
        // ✅ ВЫНЕСЕННЫЙ useEffect (вставь его сразу после handleApplyFilter):
        useEffect(() => {
            handleApplyFilter();
          }, [searchMode]); // можно просто [] если не хочешь обновление при смене режима
    
    
    return (
        <div>
            <div className={`container my-5 ${styles['content-with-filter']} ${isDetailsOpen ? styles['shifted'] : ''}`}>


            {/* <h2>
                {searchMode === 'cargo' ? t("available_cargo") : t("available_vehicle")}
            </h2> */}

                

                <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={{ width: '250px', marginRight: '20px', marginLeft: 'px' }}> 
                {/* Весь фильтр — от label/select до кнопки apply */}
                
                {/* <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>{t("filter_options")}</h3> */}

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <button
                        onClick={() => {
                        setSearchMode('cargo');
                        handleApplyFilter(); // мгновенный фильтр при переключении
                        }}
                        style={{
                        padding: '8px 12px',
                        backgroundColor: searchMode === 'cargo' ? '#007bff' : '#e0e0e0',
                        color: searchMode === 'cargo' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        flex: 1
                        }}
                    >
                        {t("cargo")}
                    </button>
                    <button
                        onClick={() => {
                        setSearchMode('transport');
                        handleApplyFilter(); // мгновенный фильтр при переключении
                        }}
                        style={{
                        padding: '8px 12px',
                        backgroundColor: searchMode === 'transport' ? '#28a745' : '#e0e0e0',
                        color: searchMode === 'transport' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        flex: 1
                        }}
                    >
                        {t("transport")}
                    </button>
                </div>

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('loading_zip_code')}</label>
                        <input type="text" value={fromZip || ''} onChange={(e) => setFromZip(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('unloading_zip_code')}</label>
                        <input type="text" value={toZip || ''} onChange={(e) => setToZip(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('loading_city')}</label>
                        <input type="text" value={cityFrom || ''} onChange={(e) => setcityFrom(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('unloading_city')}</label>
                        <input type="text" value={cityTo || ''} onChange={(e) => setcityTo(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    </div>



                

                <div style={{ marginBottom: '8px' }}>
                    <label>{t('loading_canton')}</label>
                    <select
                        value={fromCountryState || ''}
                        onChange={(e) => setFromCountryState(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    >
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

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('unloading_canton')}</label>
                        <select value={toCountryState || ''} onChange={(e) => setToCountryState(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                            
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

                    

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('date')}</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                        type="date"
                        value={fromDateState || ''}
                        onChange={(e) => setFromDateState(e.target.value)}
                        style={{ flex: 1, padding: '4px', fontSize: '0.85rem' }}
                        placeholder="ДД.ММ.ГГГГ"
                        />
                        <input
                        type="date"
                        value={toDateState || ''}
                        onChange={(e) => setToDateState(e.target.value)}
                        style={{ flex: 1, padding: '4px', fontSize: '0.85rem' }}
                        placeholder="ДД.ММ.ГГГГ"
                        />

                        </div>
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('weight')}</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="number" value={massFromState || ''} onChange={(e) => setMassFromState(e.target.value)} placeholder={t('min_weight')} style={{ flex: 1, padding: '8px' }} />
                            <input type="number" value={massToState || ''} onChange={(e) => setMassToState(e.target.value)} placeholder={t('max_weight')} style={{ flex: 1, padding: '8px' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                        <label>{t('volume')}</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="number" value={volumeFromState || ''} onChange={(e) => setVolumeFromState(e.target.value)} placeholder={t('min_volume')} style={{ flex: 1, padding: '8px' }} />
                            <input type="number" value={volumeToState || ''} onChange={(e) => setVolumeToState(e.target.value)} placeholder={t('max_volume')} style={{ flex: 1, padding: '8px' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '8px' }}>
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
                        
                    </div>
                </div>

                      {/* 👉 Правый блок — КАРТОЧКИ */}
                      <div style={{ flex: 1 }}>
                        {searchMode === 'cargo' ? (
                            cargos.length > 0 ? cargos.map(cargo => (
                            <CargoCard
                                key={cargo.id}
                                cargo={cargo}
                                openedDetailsCardId={openedDetailsCardId}
                                setOpenedDetailsCardId={setOpenedDetailsCardId}
                                setIsDetailsOpen={setIsDetailsOpen}
                            />
                            )) : <p>{t("no_cargos_found")}</p>
                        ) : (
                            vehicles.length > 0 ? vehicles.map(vehicle => (
                                <VehicleCard
                                  key={vehicle.id}
                                  vehicle={vehicle}
                                  openedDetailsCardId={openedDetailsCardId}
                                  setOpenedDetailsCardId={setOpenedDetailsCardId}
                                  setIsDetailsOpen={setIsDetailsOpen}
                                />
                              )) : <p>{t("no_vehicles_found")}</p>
                              
                        )}
                        </div>


                    

                        
                
                





                </div>
            </div>
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

export default SearchCargoResult;
