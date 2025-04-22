/*import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CargoCard from '../components/CargoCard';
import VehicleCard from '../components/VehicleCard';

function SearchCombined() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
  
    const [searchType, setSearchType] = useState('cargo'); // груз или транспорт
    const [cargos, setCargos] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [showFilter, setShowFilter] = useState(false);



    const queryParams = new URLSearchParams(location.search);

    const fromCountryValue = queryParams.get('fromCountry');
    const toCountryValue = queryParams.get('toCountry');
    const fromDateValue = queryParams.get('fromDate');
    const toDateValue = queryParams.get('toDate');
    const massFromValue = queryParams.get('massFrom');
    const massToValue = queryParams.get('massTo');
    const volumeFromValue = queryParams.get('volumeFrom');
    const volumeToValue = queryParams.get('volumeTo');
    const transportTypeValue = queryParams.get('transportType');
    const fromZipValue = queryParams.get('fromZip');
    const toZipValue = queryParams.get('toZip'); 

    const [fromCountryState, setFromCountryState] = useState(fromCountryValue || '');
    const [toCountryState, setToCountryState] = useState(toCountryValue || '');
    const [fromDateState, setFromDateState] = useState(fromDateValue || '');
    const [toDateState, setToDateState] = useState(toDateValue || '');
    const [massFromState, setMassFromState] = useState(massFromValue || '');
    const [massToState, setMassToState] = useState(massToValue || '');
    const [volumeFromState, setVolumeFromState] = useState(volumeFromValue || '');
    const [volumeToState, setVolumeToState] = useState(volumeToValue || '');
    const [transportTypeState, setTransportTypeState] = useState(transportTypeValue || '');
    const [fromZip, setFromZip] = useState(fromZipValue || '');
    const [toZip, setToZip] = useState(toZipValue || '');

    const handleApplyFilter = () => {
        setShowFilter(false);
    
        const fromCountryStr = fromCountryState.toString();
        const toCountryStr = toCountryState.toString();
        const fromZipNum = fromZip ? parseInt(fromZip) : null;
        const toZipNum = toZip ? parseInt(toZip) : null;
    
        if (searchType === 'cargo') {
            axios.get('http://127.0.0.1:8000/api/cargo/')
                .then(response => {
                    const filtered = response.data.filter(cargo => {
                        const cargoFromZip = cargo.loading_postal_primary ? parseInt(cargo.loading_postal_primary) : null;
                        const cargoToZip = cargo.unloading_postal_primary ? parseInt(cargo.unloading_postal_primary) : null;
    
                        return (
                            (fromCountryStr === "" || cargo.loading_canton === fromCountryStr) &&
                            (toCountryStr === "" || cargo.unloading_canton === toCountryStr) &&
                            (fromDateState === "" || new Date(cargo.date_from) >= new Date(fromDateState)) &&
                            (toDateState === "" || new Date(cargo.date_to) <= new Date(toDateState)) &&
                            (massFromState === "" || parseFloat(cargo.weight) >= parseFloat(massFromState)) &&
                            (massToState === "" || parseFloat(cargo.weight) <= parseFloat(massToState)) &&
                            (volumeFromState === "" || parseFloat(cargo.volume) >= parseFloat(volumeFromState)) &&
                            (volumeToState === "" || parseFloat(cargo.volume) <= parseFloat(volumeToState)) &&
                            (transportTypeState === "" || transportTypeState === "any" || cargo.transport_type === transportTypeState) &&
                            (fromZip === "" || cargoFromZip === fromZipNum) &&
                            (toZip === "" || cargoToZip === toZipNum)
                        );
                    });
    
                    setCargos(filtered);
                })
                .catch(error => {
                    console.error("Ошибка при загрузке грузов:", error);
                });
        } else {
            axios.get('http://127.0.0.1:8000/api/trucks/')
                .then(response => {
                    const filtered = response.data.filter(vehicle => {
                        const vehicleFromZip = vehicle.loading_postal ? parseInt(vehicle.loading_postal) : null;
                        const vehicleToZip = vehicle.unloading_postal ? parseInt(vehicle.unloading_postal) : null;
    
                        return (
                            (fromCountryStr === "" || vehicle.loading_canton === fromCountryStr) &&
                            (toCountryStr === "" || vehicle.unloading_canton === toCountryStr) &&
                            (fromDateState === "" || new Date(vehicle.loading_date_from) >= new Date(fromDateState)) &&
                            (toDateState === "" || new Date(vehicle.loading_date_to) <= new Date(toDateState)) &&
                            (massFromState === "" || parseFloat(vehicle.carrying_capacity) >= parseFloat(massFromState)) &&
                            (massToState === "" || parseFloat(vehicle.carrying_capacity) <= parseFloat(massToState)) &&
                            (volumeFromState === "" || parseFloat(vehicle.useful_volume) >= parseFloat(volumeFromState)) &&
                            (volumeToState === "" || parseFloat(vehicle.useful_volume) <= parseFloat(volumeToState)) &&
                            (transportTypeState === "" || transportTypeState === "any" || vehicle.transport_type === transportTypeState) &&
                            (fromZip === "" || vehicleFromZip === fromZipNum) &&
                            (toZip === "" || vehicleToZip === toZipNum)
                        );
                    });
    
                    setVehicles(filtered);
                })
                .catch(error => {
                    console.error("Ошибка при загрузке транспорта:", error);
                });
        }
    };

    useEffect(() => {
        handleApplyFilter();
      }, []);
      
    */