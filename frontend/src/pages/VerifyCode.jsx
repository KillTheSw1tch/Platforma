<<<<<<< Updated upstream
// VerifyCode.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function VerifyCode() {

  const { t } = useTranslation();

    // Устанавливаем сохраненный язык при загрузке
    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { updateAuthStatus } = useOutletContext();
=======
import React, { useState } from 'react';

function VerifyCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
>>>>>>> Stashed changes

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< Updated upstream
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setMessage('❌ Не удалось получить email. Попробуйте снова.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/verify/', {
=======
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/verify/', {

>>>>>>> Stashed changes
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
<<<<<<< Updated upstream
          email: email,
=======
          email: localStorage.getItem('userEmail'), // берём email из localStorage
>>>>>>> Stashed changes
          code: code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
<<<<<<< Updated upstream
        // Сохранение токена после успешного подтверждения
        localStorage.setItem('authToken', data.token);
        setMessage('✅ Код подтвержден. Перенаправление...');
        
        // Вызываем обновление аутентификации
        updateAuthStatus();

        setTimeout(() => {
          navigate('/'); // Перенаправляем на главную (будет логгированная страница)
        }, 1000);
=======
        setMessage('✅ Код подтвержден. Перенаправление...');
        setTimeout(() => {
          window.location.href = '/'; // редирект на главную
        }, 2000);
>>>>>>> Stashed changes
      } else {
        setMessage('❌ Неверный код. Попробуйте снова.');
      }
    } catch (error) {
      setMessage('Произошла ошибка.');
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
<<<<<<< Updated upstream
      <h2>{t("verify_email")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("enter_the_code_from_the_email")}:</label>
=======
      <h2>Подтверждение Email</h2>
      <form onSubmit={handleSubmit}>
        <label>Введите код из письма:</label>
>>>>>>> Stashed changes
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="form-control my-2"
        />
<<<<<<< Updated upstream
        <button type="submit" className="btn btn-primary">{t("confirm")}</button>
=======
        <button type="submit" className="btn btn-primary">Подтвердить</button>
>>>>>>> Stashed changes
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}

export default VerifyCode;
