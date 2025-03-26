// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Імпортуємо ваші компоненти (сторінки)
import MainPage from './pages/MainPage';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/registrationPage';
import AddCargoPage from './pages/add_cargo';

function App() {
  return (
    <Router>

      <Routes>
        {/* Якщо "/" відсутній, при переході на http://localhost:3000 сторінка буде порожня */}
        <Route path="/" element={<MainPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/add-cargo" element={<AddCargoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
