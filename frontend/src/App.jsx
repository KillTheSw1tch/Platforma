// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Імпортуємо ваші компоненти (сторінки)
import MainPage from './pages/MainPage';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/registrationPage';
import AddCargoPage from './pages/add_cargo';
import UserProfile from './pages/UserProfile';
import VerifyCode from './pages/VerifyCode'; // 👈 добавили!
import Services from './pages/Services';
import Support from './pages/Support';
import Contacts from './pages/Contacts'; // 👈 Добавили новый импорт

function App() {
  return (
    <Router>

      <Routes>
        {/* Якщо "/" відсутній, при переході на http://localhost:3000 сторінка буде порожня */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/add-cargo" element={<AddCargoPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/verify-code" element={<VerifyCode />} /> {/* 👈 новая страница */}
        <Route path="/services" element={<Services />} /> {/* Новый маршрут */}
        <Route path="/support" element={<Support />} /> {/* 👈 Новый маршрут 2 */}
        <Route path="/contacts" element={<Contacts />} /> {/* 👈 Новый маршрут 3 */}
      </Routes>
    </Router>
  );
}

export default App;
