import React, { useState, useEffect } from 'react';
import '../styles/MyCompany.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../components/getToken';



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
    const status = localStorage.getItem("documentsStatus");
    const companyData = localStorage.getItem("companyData");
  
    // 🔁 Условие: если уже отправлены и на проверке — редирект на ожидание
    if (status === "pending" && companyData) {
      navigate("/my-company/pending-review");
      return;
    }
  
    // ✅ Если всё подтверждено — сразу на обзор
    if (companyData && status !== "pending") {
      navigate("/my-company/overview");
      return;
    }
  
    // Если ничего не найдено — продолжаем регистрацию
    const token = getToken();
    if (token) {
      setShowModal(true);
      fetch('http://127.0.0.1:8000/api/user/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserFullName(data.username || "");
          setEmail(data.email || "");
          setPhone(data.profile?.phone || "");
          setCompanyName(data.profile?.company || "");
          setCompanyAddress(data.profile?.address || "");
        })
        .catch((error) => console.error("❌ Ошибка загрузки профиля:", error));
    }
  }, [navigate]);
  
  
  
  
  

  const handleCodeSubmit = (e) => {
    e.preventDefault();
  
    // Здесь не нужно setShowModal(false) и setShowCompanyForm(true) — пока не проверим код
  
    console.log("🧪 Проверка отправки:", selectedCountry, companyCode);

    fetch("http://127.0.0.1:8000/api/validate-company-code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country: selectedCountry,
        code: companyCode
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("🔍 Ответ от сервера:", data);
  
        if (data.valid) {
          alert("✅ Код підтверджено. Можна продовжити.");
          setShowModal(false);
          setShowCompanyForm(true);
        } else {
          alert("❌ Код не знайдено або недійсний.");
          setShowModal(true); // модалка останется
          setShowCompanyForm(false); // не показываем форму
        }
      })
      .catch(error => {
        console.error("❌ Помилка при перевірці коду:", error);
        alert("⚠️ Сталася помилка при перевірці. Спробуйте пізніше.");
      });
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
                  <option value="" disabled selected hidden>🌍 {t("select_country") || "Виберіть країну"}</option>
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

          <form onSubmit={async (e) => {
              e.preventDefault();

              const token = localStorage.getItem("authToken");
              const formData = new FormData(e.target);

              const companyData = {
                name: formData.get("company_name"),
                address: formData.get("company_address"),
                email: formData.get("contact_email"),
                phone: formData.get("phone_number"),
                fullName: userFullName,
                country: formData.get("company_country"),
                code: formData.get("company_code"),
                registrationDate: "2023-11-10",
                isVerified: false,
                totalOrders: 38,
                activeOrders: 16,
                totalCargo: 23,
                totalVehicles: 0,
                interest: "Міжнародний транспорт",
                activity: "Замовник перевезення"
              };

              localStorage.setItem("companyData", JSON.stringify(companyData));

              try {
                const filesForm = new FormData();
                if (formData.get("verification_file_1")) {
                  filesForm.append("files", formData.get("verification_file_1"));
                }
                if (formData.get("verification_file_2")) {
                  filesForm.append("files", formData.get("verification_file_2"));
                }
              
                const uploadRes = await fetch("http://127.0.0.1:8000/api/company/upload-documents/", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: filesForm,
                });
              
                if (!uploadRes.ok) {
                  const err = await uploadRes.json();
                  alert("❌ Помилка при завантаженні документів: " + (err?.detail || "невідома"));
                  return;
                }
              
                console.log("✅ Документы успешно загружены");
              
                // ⬇️ Проверка статуса (одобрен / отклонён / в ожидании)
                const checkRes = await fetch("http://127.0.0.1:8000/api/company/check-approval/", {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
              
                if (checkRes.ok) {
                  const checkData = await checkRes.json();
              
                  if (checkData.rejected) {
                    alert("❌ Ваші документи були відхилені адміністратором. Зверніться до підтримки.");
                    return;
                  }
              
                  if (checkData.approved) {
                    console.log("✅ Документы одобрены");
                    localStorage.removeItem("documentsStatus"); // 🧼 Очищаем статус
                    navigate("/my-company/overview");
                  } else {
                    localStorage.setItem("documentsStatus", "pending"); // 👈 гарантируем установку, если не было
                    navigate("/my-company/pending-review");
                  }
                                   
              
                } else {
                  alert("⚠️ Не вдалося перевірити статус документів. Спробуйте пізніше.");
                }
              
              } catch (error) {
                console.error("Ошибка загрузки файлов или проверки:", error);
                alert("⚠️ Щось пішло не так. Перевірте з'єднання або спробуйте пізніше.");
              }
              
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

            <div className="file-upload-section">
              <label className="file-box">
                <span>📄 Документ 1 (PDF/JPG)</span>
                <input
                  type="file"
                  name="verification_file_1"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const label = e.target.closest("label");
                    if (label && e.target.files[0]) {
                      const fileName = e.target.files[0].name;
                      const span = label.querySelector("span");
                      if (span) span.textContent = "✅ " + fileName;
                    }
                    
                  }}
                  required
                />
              </label>

              <label className="file-box">
                <span>📄 Документ 2 (PDF/JPG)</span>
                <input
                  type="file"
                  name="verification_file_2"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const fileName = e.target.files[0]?.name;
                    if (fileName) {
                      e.target.previousSibling.textContent = "✅ " + fileName;
                    }
                  }}
                />
              </label>
            </div>

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
