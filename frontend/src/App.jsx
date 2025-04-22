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




function App() {
  return (
    <Router>
      <Routes>
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



        </Route>
      </Routes>
    </Router>
  );
}

export default App;
