import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './pages/MainPage';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/registrationPage';
import AddCargoPage from './pages/add_cargo';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import UserProfile from './pages/UserProfile';
import VerifyCode from './pages/VerifyCode';
import Services from './pages/Services';
import Support from './pages/Support';
import Contacts from './pages/Contacts';
import TruckPostingForm from './pages/add_vehicle';
import Layout from './components/Layout';
// import FindTransCargo from './pages/FindTransCargo';
import SearchCargoResult from './pages/SearchCargoResult';
import SearchTransportResult from './pages/SearchTransportResult';
import MyOrdersCombined from './pages/MyOrdersCombined'; 
import MyCompany from './pages/MyCompany.jsx'; 
import CompanyOverview from './pages/CompanyOverview';
import PendingReview from "./pages/PendingReview";



=======
=======
>>>>>>> Stashed changes
import VerifyCode from './pages/VerifyCode'; // 👈 добавили!
import Services from './pages/Services';
import Support from './pages/Support';
import Contacts from './pages/Contacts'; // 👈 Добавили новый импорт
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="add-cargo" element={<AddCargoPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="verify-code" element={<VerifyCode />} />
          <Route path="services" element={<Services />} />
          <Route path="support" element={<Support />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="add-vehicle" element={<TruckPostingForm />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="find-trans-cargo" element={<FindTransCargo />} /> */}
          <Route path="search-cargo" element={<SearchCargoResult />} />
          <Route path="search-transport" element={<SearchTransportResult />} />
          <Route path="/my-orders" element={<MyOrdersCombined />} />
          <Route path="/my-company" element={<MyCompany />} />
          <Route path="/my-company/overview" element={<CompanyOverview />} />
          <Route path="/my-company/pending-review" element={<PendingReview />} />



        </Route>
=======
=======
>>>>>>> Stashed changes
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/add-cargo" element={<AddCargoPage />} />
        <Route path="/verify-code" element={<VerifyCode />} /> {/* 👈 новая страница */}
        <Route path="/services" element={<Services />} /> {/* Новый маршрут */}
        <Route path="/support" element={<Support />} /> {/* 👈 Новый маршрут 2 */}
        <Route path="/contacts" element={<Contacts />} /> {/* 👈 Новый маршрут 3 */}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
