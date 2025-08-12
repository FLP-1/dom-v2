
/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar telas existentes
import DashboardScreen from '../screens/DashboardScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import FinanceScreen from '../screens/FinanceScreen.tsx';
import TasksScreen from '../screens/TasksScreen.tsx';
import HRScreen from '../screens/HRScreen.tsx';
import ReportsScreen from '../screens/ReportsScreen.tsx';
import ProfileScreen from '../screens/ProfileScreen.tsx';
import NotificationsScreen from '../screens/NotificationsScreen.tsx';
import PaymentIntegrationsScreen from '../screens/PaymentIntegrationsScreen.tsx';
import UsersScreen from '../screens/UsersScreen.tsx';
import ThemeSettingsScreen from '../screens/ThemeSettingsScreen.tsx';
import GamificationScreen from '../screens/GamificationScreen.tsx';
import CommunicationScreen from '../screens/CommunicationScreen.tsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/finance" element={<FinanceScreen />} />
        <Route path="/tasks" element={<TasksScreen />} />
        <Route path="/hr" element={<HRScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/payments" element={<PaymentIntegrationsScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/theme" element={<ThemeSettingsScreen />} />
        <Route path="/gamification" element={<GamificationScreen />} />
        <Route path="/communication" element={<CommunicationScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
