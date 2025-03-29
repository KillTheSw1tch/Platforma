import React, { useState } from 'react';

function VerifyCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/verify/', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'), // берём email из localStorage
          code: code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Код подтвержден. Перенаправление...');
        setTimeout(() => {
          window.location.href = '/'; // редирект на главную
        }, 2000);
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
      <h2>Подтверждение Email</h2>
      <form onSubmit={handleSubmit}>
        <label>Введите код из письма:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-primary">Подтвердить</button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}

export default VerifyCode;
