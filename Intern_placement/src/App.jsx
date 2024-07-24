import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegister from './Components/AdminRegister/AdminRegister';
import SuperAdmin from './Components/SuperAdminLogin/SuperAdmin';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import Reset from './Components/Reset/Reset';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SuperAdmin />} />
          <Route path="/adminreg" element={<AdminRegister />} />
          <Route path="aforgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resetpassword" element={<Reset />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
