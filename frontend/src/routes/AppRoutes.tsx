
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar telas
import DashboardEmployer from '../screens/employer/Dashboard';
import DashboardEmployee from '../screens/employee/Dashboard';
import DashboardFamily from '../screens/family/Dashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employer" replace />} />
        <Route path="/employer" element={<DashboardEmployer />} />
        <Route path="/employee" element={<DashboardEmployee />} />
        <Route path="/family" element={<DashboardFamily />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
    