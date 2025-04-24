import { useTranslation } from 'react-i18next';


const DetailsPanel = ({ cargo, vehicle, onClose }) => {
  const { t } = useTranslation();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#ffd700' : '#ccc', fontSize: '20px' }}>★</span>
      );
    }
    return stars;
  };

  const isCargo = !!cargo;
  const isVehicle = !!vehicle;

  if (!isCargo && !isVehicle) return null; // если нет данных

  return (
    <div className="edit-panel-left open">
      <button className="edit-close-btn" onClick={onClose}>&times;</button>
      <div className="edit-details-content">

        <h4 className="edit-title">
          {t("details_of")}{" "}
          {isCargo
            ? `${cargo.loading_canton}, ${cargo.loading_city_primary} (${cargo.loading_postal_primary}) → ${cargo.unloading_canton}, ${cargo.unloading_city_primary} (${cargo.unloading_postal_primary})`
            : `${vehicle.loading_canton}, ${vehicle.loading_city} (${vehicle.loading_postal}) → ${vehicle.unloading_canton}, ${vehicle.unloading_city} (${vehicle.unloading_postal})`}
        </h4>

        <p>
          📅 <strong>{t("from")}:</strong> {new Date(isCargo ? cargo.date_from : vehicle.loading_date_from).toLocaleDateString()}<br />
          📅 <strong>{t("to")}:</strong> {new Date(isCargo ? cargo.date_to : vehicle.loading_date_to).toLocaleDateString()}<br />
          🏠 <strong>{t("loading_street")}:</strong> {isCargo ? cargo.cargo_loading_street : vehicle.truck_loading_street || 'N/A'}<br />
          🏁 <strong>{t("unloading_street")}:</strong> {isCargo ? cargo.cargo_unloading_street : vehicle.truck_unloading_street || 'N/A'}<br />
          🚚 <strong>{t("transport_type")}:</strong> {isCargo ? cargo.transport_type : vehicle.vehicle_type}<br />
          ⚖️ <strong>{t("weight")}:</strong> {isCargo ? cargo.weight : vehicle.carrying_capacity} t<br />
          📐 <strong>{t("volume")}:</strong> {(isCargo ? cargo.volume : vehicle.useful_volume) || 'N/A'} m³<br />
          📝 <strong>{t("notes")}:</strong> {isCargo ? cargo.extra_info : vehicle.additional_info || 'No extra info'}
        </p>

        <h5>{t("contact_information")}</h5>
        <p>
          🏢 <strong>{t("company")}:</strong> {(isCargo ? cargo.company_name : vehicle.company_name) || 'N/A'}<br />
          👤 <strong>{t("name")}:</strong> {(isCargo ? cargo.contact_name : vehicle.contact_name) || 'N/A'}<br />
          🌟 <strong>{t("rating")}:</strong> {renderStars((isCargo ? cargo.rating : vehicle.rating) || 4)}<br />
          📞 <strong>{t("phone_1")}:</strong> {(isCargo ? cargo.phone_number : vehicle.phone) || 'N/A'}<br />
          ✉️ <strong>{t("email")}:</strong> {(isCargo ? cargo.email : vehicle.email) || 'N/A'}<br />
          💬 <strong>{t("viber_whatsapp_1")}:</strong> {(isCargo ? cargo.viber_whatsapp_number : vehicle.whatsapp) || 'N/A'}
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
  );
};

export default DetailsPanel;
