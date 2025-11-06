import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import api from '../../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeTenants: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data.stats);
      setRecentActivities(response.data.recentActivities.map(activity => ({
        ...activity,
        time: formatTimeAgo(new Date(activity.time))
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Vừa xong';
    }
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    }
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ngày trước`;
  };

  if (loading) return <AdminLayout><div>Đang tải...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="page-header">
          <h1>Dashboard</h1>
          <button onClick={loadDashboardData} className="btn-refresh">
            <i className="fas fa-sync"></i> Làm mới
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon tenant-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-content">
              <h3>Tổng số khách hàng</h3>
              <div className="stat-main">{stats.totalTenants}</div>
              <div className="stat-sub">{stats.activeTenants} đang hoạt động</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon subscription-icon">
              <i className="fas fa-receipt"></i>
            </div>
            <div className="stat-content">
              <h3>Đăng ký dịch vụ</h3>
              <div className="stat-main">{stats.totalSubscriptions}</div>
              <div className="stat-sub">{stats.activeSubscriptions} đang hoạt động</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content">
              <h3>Doanh thu</h3>
              <div className="stat-main">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(stats.totalRevenue)}
              </div>
              <div className="stat-sub">Tháng hiện tại</div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="activities-section">
          <h2>Hoạt động gần đây</h2>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  <i className={`fas fa-${
                    activity.type === 'new_tenant' ? 'plus' :
                    activity.type === 'subscription' ? 'sync' : 'edit'
                  }`}></i>
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}