import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import OrganAnalysis from './pages/organ-analysis';
import LoginPage from './pages/login';
import SimulationDashboard from './pages/simulation-dashboard';
import DrugDatabase from './pages/drug-database';
import SessionManagement from './pages/session-management';
import RegisterPage from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DrugDatabase />} />
        <Route path="/organ-analysis" element={<OrganAnalysis />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/simulation-dashboard" element={<SimulationDashboard />} />
        <Route path="/drug-database" element={<DrugDatabase />} />
        <Route path="/session-management" element={<SessionManagement />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
