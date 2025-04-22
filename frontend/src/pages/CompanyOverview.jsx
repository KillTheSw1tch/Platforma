import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/CompanyOverview.css';

const CompanyOverview = () => {
  const { t } = useTranslation();
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('companyData');
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('authToken');

    if (!saved || !email || !token) return;

    const parsed = JSON.parse(saved);

    const fetchStats = async () => {
      try {
        const [cargoRes, vehicleRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/cargo/', {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get('http://127.0.0.1:8000/api/trucks/', {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);
    
        const cargos = cargoRes.data.filter(c => c.email === email);
        const vehicles = vehicleRes.data.filter(v => v.email === email);
    
        const updatedStats = {
          ...parsed,
          totalOrders:
            cargos.filter(c => c.is_completed).length +
            vehicles.filter(v => v.is_completed).length,
          activeOrders:
            cargos.filter(c => !c.is_completed).length +
            vehicles.filter(v => !v.vehicle && !v.is_completed).length,
          totalCargo: cargos.length,
          totalVehicles: vehicles.length,
        };
        
    
        setCompanyData(updatedStats);
        localStorage.setItem('companyData', JSON.stringify(updatedStats));
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
      }
    };
    
    

    fetchStats();
  }, []);

  if (!companyData) return <p className="loading">{t("loading")}...</p>;

  return (
    <div className="company-overview">
      <h2>{t("company_information")}</h2>
      <div className="company-card">
        <div className="section">
          <p className="section-title">{t("general_info")}</p>
          <p><strong>{t("company_name")}:</strong> {companyData.name}</p>
          <p><strong>{t("address")}:</strong> {companyData.address}</p>
          <p><strong>{t("registration_date")}:</strong> {companyData.registrationDate}</p>
          <p><strong>{t("verified")}:</strong> {companyData.isVerified ? t("yes") : t("no")}</p>
        </div>

        <div className="section">
          <p className="section-title">{t("contact_info")}</p>
          <p><strong>{t("email")}:</strong> {companyData.email}</p>
          <p><strong>{t("phone_number")}:</strong> {companyData.phone}</p>
          <p><strong>{t("full_name")}:</strong> {companyData.fullName}</p>
        </div>

        <div className="section">
          <p className="section-title">{t("activity_data")}</p>
          <p><strong>{t("total_orders")}:</strong> {companyData.totalOrders}</p>
          <p><strong>{t("active_orders")}:</strong> {companyData.activeOrders}</p>
          <p><strong>{t("total_cargo")}:</strong> {companyData.totalCargo}</p>
          <p><strong>{t("total_vehicles")}:</strong> {companyData.totalVehicles}</p>
        </div>

        <div className="section">
          <p className="section-title">{t("additional")}</p>
          <p><strong>{t("company_code")}:</strong> {companyData.code}</p>
          <p><strong>{t("country")}:</strong> {t(companyData.country)}</p>

          <div className="tags">
            <span className="tag">{t("interest")}: {companyData.interest}</span>
            <span className="tag">{t("activity")}: {companyData.activity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
