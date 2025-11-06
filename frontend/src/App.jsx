import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Pricing from './pages/Pricing'
import PlansManagement from './pages/admin/PlansManagement'
import Dashboard from './pages/admin/Dashboard'

export default function App() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Redirect after login based on role
  const handleWelcome = () => {
    if (!user.role) return <Navigate to="/login" />;
    if (user.role === 'superadmin') return <Navigate to="/admin/dashboard" />;
    return <Welcome />;
  };

  // Protected route component
  const ProtectedAdminRoute = ({ children }) => {
    if (!user.role || user.role !== 'superadmin') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={handleWelcome} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedAdminRoute>
          <Dashboard />
        </ProtectedAdminRoute>
      } />
      <Route path="/admin/plans" element={
        <ProtectedAdminRoute>
          <PlansManagement />
        </ProtectedAdminRoute>
      } />
    </Routes>
  )
}
