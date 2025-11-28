import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import MainLayout from '../components/layout/MainLayout';

// Pages
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import TripManagement from '../pages/Trips/TripManagement';
import VoucherGenerator from '../pages/Vouchers/VoucherGenerator';
import TravelPackages from '../pages/Packages/TravelPackages';
import CustomerVoucherHistory from '../pages/Customers/CustomerVoucherHistory';

import ProtectedRoute from '../components/common/ProtectedRoute';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripManagement />} />
          <Route path="/vouchers" element={<VoucherGenerator />} />
          <Route path="/packages" element={<TravelPackages />} />
          <Route path="/customers" element={<CustomerVoucherHistory />} />
          <Route path="/profile" element={<Dashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
