import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user || user.role !== 'superadmin') {
    navigate('/login');
    return null;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <div className="sidebar-header">
          <h2>EduSaaS Admin</h2>
          <p>{user.username}</p>
        </div>
        
        <div className="sidebar-menu">
          <Link to="/admin/dashboard" className={`menu-item ${isActive('/admin/dashboard')}`}>
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/admin/plans" className={`menu-item ${isActive('/admin/plans')}`}>
            <i className="fas fa-tags"></i> Gói Dịch Vụ
          </Link>
          <Link to="/admin/tenants" className={`menu-item ${isActive('/admin/tenants')}`}>
            <i className="fas fa-building"></i> Khách Hàng
          </Link>
          <Link to="/admin/subscriptions" className={`menu-item ${isActive('/admin/subscriptions')}`}>
            <i className="fas fa-receipt"></i> Đăng Ký Dịch Vụ
          </Link>
          <Link to="/admin/tenant-admins" className={`menu-item ${isActive('/admin/tenant-admins')}`}>
            <i className="fas fa-users"></i> Quản Trị Viên
          </Link>
        </div>

        <div className="sidebar-footer">
          <button onClick={logout} className="btn-logout">
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
          </button>
        </div>
      </nav>

      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}