import React, { useState, useEffect } from 'react';
import '../styles/MyCompany.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


function MyCompany() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [companyCode, setCompanyCode] = useState('');

  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [userFullName, setUserFullName] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');


  const navigate = useNavigate();





  useEffect(() => {
    const hasCompany = false;
    if (!hasCompany) {
      setShowModal(true);
      const token = localStorage.getItem('authToken');
  
      if (token) {
        fetch('http://127.0.0.1:8000/api/user/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("👤 Данные профиля:", data);
  
            setUserFullName(data.username || "");
            setEmail(data.email || "");
            setPhone(data.profile?.phone || "");
            setCompanyName(data.profile?.company || "");
            setCompanyAddress(data.profile?.address || "");
          })
          .catch((error) => console.error("❌ Ошибка загрузки профиля:", error));
      }
    }
  }, []);
  
  

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowCompanyForm(true);

    console.log("🌍 Страна выбрана:", selectedCountry);

  
    alert('✅ Ви ввели код: ' + companyCode + '\nТепер можна показати форму компанії!');
  };
  
  

  return (
    <div className="my-company-page">
      <h1>My Company</h1>

        {showModal && (
        <div className="overlay">
            <div className="modal-container">
                <h2>Ваша Компанія</h2>
                <form onSubmit={handleCodeSubmit}>

                <label>Країна</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="switzerland">🇨🇭 {t("switzerland")}</option>
                  <option value="ukraine">🇺🇦 {t("ukraine")}</option>
                  <option value="austria">🇦🇹 {t("austria")}</option>
                  <option value="germany">🇩🇪 {t("germany")}</option>
                  <option value="france">🇫🇷 {t("france")}</option>
                  <option value="italy">🇮🇹 {t("italy")}</option>
                  <option value="poland">🇵🇱 {t("poland")}</option>
                  <option value="netherlands">🇳🇱 {t("netherlands")}</option>
                  <option value="belgium">🇧🇪 {t("belgium")}</option>
                  <option value="spain">🇪🇸 {t("spain")}</option>
                  <option value="albania">🇦🇱 {t("albania")}</option>
                  <option value="algeria">🇩🇿 {t("algeria")}</option>
                  <option value="andorra">🇦🇩 {t("andorra")}</option>
                  <option value="afghanistan">🇦🇫 {t("afghanistan")}</option>
                  <option value="bangladesh">🇧🇩 {t("bangladesh")}</option>
                  <option value="bulgaria">🇧🇬 {t("bulgaria")}</option>
                  <option value="bosnia">🇧🇦 {t("bosnia")}</option>
                  <option value="united_kingdom">🇬🇧 {t("united_kingdom")}</option>
                  <option value="vietnam">🇻🇳 {t("vietnam")}</option>
                  <option value="vatican">🇻🇦 {t("vatican")}</option>
                  <option value="armenia">🇦🇲 {t("armenia")}</option>
                  <option value="hong_kong">🇭🇰 {t("hong_kong")}</option>
                  <option value="greece">🇬🇷 {t("greece")}</option>
                  <option value="georgia">🇬🇪 {t("georgia")}</option>
                  <option value="denmark">🇩🇰 {t("denmark")}</option>
                  <option value="estonia">🇪🇪 {t("estonia")}</option>
                  <option value="egypt">🇪🇬 {t("egypt")}</option>
                  <option value="israel">🇮🇱 {t("israel")}</option>
                  <option value="india">🇮🇳 {t("india")}</option>
                  <option value="indonesia">🇮🇩 {t("indonesia")}</option>
                  <option value="iraq">🇮🇶 {t("iraq")}</option>
                  <option value="iran">🇮🇷 {t("iran")}</option>
                  <option value="ireland">🇮🇪 {t("ireland")}</option>
                  <option value="jordan">🇯🇴 {t("jordan")}</option>
                  <option value="kazakhstan">🇰🇿 {t("kazakhstan")}</option>
                  <option value="cambodia">🇰🇭 {t("cambodia")}</option>
                  <option value="qatar">🇶🇦 {t("qatar")}</option>
                  <option value="kenya">🇰🇪 {t("kenya")}</option>
                  <option value="kyrgyzstan">🇰🇬 {t("kyrgyzstan")}</option>
                  <option value="china">🇨🇳 {t("china")}</option>
                  <option value="cyprus">🇨🇾 {t("cyprus")}</option>
                  <option value="north_korea">🇰🇵 {t("north_korea")}</option>
                  <option value="kosovo">🇽🇰 {t("kosovo")}</option>
                  <option value="kuwait">🇰🇼 {t("kuwait")}</option>
                  <option value="laos">🇱🇦 {t("laos")}</option>
                  <option value="latvia">🇱🇻 {t("latvia")}</option>
                  <option value="lebanon">🇱🇧 {t("lebanon")}</option>
                  <option value="lithuania">🇱🇹 {t("lithuania")}</option>
                  <option value="libya">🇱🇾 {t("libya")}</option>
                  <option value="liechtenstein">🇱🇮 {t("liechtenstein")}</option>
                  <option value="luxembourg">🇱🇺 {t("luxembourg")}</option>
                  <option value="macedonia">🇲🇰 {t("macedonia")}</option>
                  <option value="malta">🇲🇹 {t("malta")}</option>
                  <option value="morocco">🇲🇦 {t("morocco")}</option>
                  <option value="moldova">🇲🇩 {t("moldova")}</option>
                  <option value="monaco">🇲🇨 {t("monaco")}</option>
                  <option value="mongolia">🇲🇳 {t("mongolia")}</option>
                  <option value="norway">🇳🇴 {t("norway")}</option>
                  <option value="united_arab_emirates">🇦🇪 {t("united_arab_emirates")}</option>
                  <option value="pakistan">🇵🇰 {t("pakistan")}</option>
                  <option value="south_africa">🇿🇦 {t("south_africa")}</option>
                  <option value="south_korea">🇰🇷 {t("south_korea")}</option>
                  <option value="portugal">🇵🇹 {t("portugal")}</option>
                  <option value="romania">🇷🇴 {t("romania")}</option>
                  <option value="saudi_arabia">🇸🇦 {t("saudi_arabia")}</option>
                  <option value="serbia">🇷🇸 {t("serbia")}</option>
                  <option value="syria">🇸🇾 {t("syria")}</option>
                  <option value="singapore">🇸🇬 {t("singapore")}</option>
                  <option value="slovakia">🇸🇰 {t("slovakia")}</option>
                  <option value="slovenia">🇸🇮 {t("slovenia")}</option>
                  <option value="sudan">🇸🇩 {t("sudan")}</option>
                  <option value="tajikistan">🇹🇯 {t("tajikistan")}</option>
                  <option value="thailand">🇹🇭 {t("thailand")}</option>
                  <option value="taiwan">🇹🇼 {t("taiwan")}</option>
                  <option value="turkey">🇹🇷 {t("turkey")}</option>
                  <option value="turkmenistan">🇹🇲 {t("turkmenistan")}</option>
                  <option value="hungary">🇭🇺 {t("hungary")}</option>
                  <option value="uzbekistan">🇺🇿 {t("uzbekistan")}</option>
                  <option value="finland">🇫🇮 {t("finland")}</option>
                  <option value="croatia">🇭🇷 {t("croatia")}</option>
                  <option value="czech_republic">🇨🇿 {t("czech_republic")}</option>
                  <option value="montenegro">🇲🇪 {t("montenegro")}</option>
                  <option value="sweden">🇸🇪 {t("sweden")}</option>
                  <option value="sri_lanka">🇱🇰 {t("sri_lanka")}</option>
                  <option value="japan">🇯🇵 {t("japan")}</option>


              </select>

              <label>ЄДРПОУ або ІПН вашої компанії</label>
              <input
                type="text"
                placeholder="Введіть ЄДРПОУ або ІПН"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn">Далі</button>
            </form>
          </div>
        </div>
      )}

      {showCompanyForm && (
        <div className="company-form">
          <h2>{t("company_details")}</h2>

          <form onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const companyData = {
              name: formData.get("company_name"),
              address: formData.get("company_address"),
              email: formData.get("contact_email"),
              phone: formData.get("phone_number"),
              fullName: userFullName,
              country: formData.get("company_country"), // 🔧 теперь это точно попадёт
              code: formData.get("company_code"),       // 🔧 тоже через form, чтобы точно не сломалось

              registrationDate: "2023-11-10", // захардкодим пока
              isVerified: false, // можно позже менять
              totalOrders: 38,
              activeOrders: 16,
              totalCargo: 23,
              totalVehicles: 0,
              interest: "Міжнародний транспорт",
              activity: "Замовник перевезення"
            };


            console.log("✅ Company Data перед сохранением:", companyData);
            localStorage.setItem('companyData', JSON.stringify(companyData));
            navigate("/my-company/overview");
          }}>


            <label>{t("company_name")}</label>
            <input name="company_name" type="text" placeholder={t("enter_company_name")} defaultValue={companyName} required />

            <label>{t("company_address")}</label>
            <input name="company_address" type="text" placeholder={t("enter_company_address")} defaultValue={companyAddress} required />

            <label>{t("contact_email")}</label>
            <input name="contact_email" type="email" placeholder="company@email.com" defaultValue={email} required />

            <label>{t("phone_number")}</label>
            <input name="phone_number" type="tel" placeholder="+41..." defaultValue={phone} required />

            <label>{t("full_name")}</label>
            <input type="text" value={userFullName} readOnly />

            <label>{t("country")}</label>
            <input
              name="company_country" // 👈 важно!
              type="hidden"
              value={selectedCountry}
            />


            <label>{t("company_code")}</label>
            <input type="text" name="company_code" value={companyCode} readOnly hidden />


            <button type="submit" className="submit-btn">
              {t("save")}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

export default MyCompany;
