import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import api from '../../api/axios';

export default function PlansManagement() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    planname: '',
    description: '',
    price: '',
    durationmonths: ''
  });

  // Fetch plans
  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await api.get('/plans');
      setPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải danh sách gói dịch vụ');
      setLoading(false);
    }
  };

  // Create new plan
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/plans', formData);
      loadPlans();
      setIsModalOpen(false);
      setFormData({ planname: '', description: '', price: '', durationmonths: '' });
    } catch (err) {
      setError('Không thể tạo gói dịch vụ mới');
    }
  };

  // Update plan
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/plans/${editingPlan.planid}`, formData);
      loadPlans();
      setIsModalOpen(false);
      setEditingPlan(null);
    } catch (err) {
      setError('Không thể cập nhật gói dịch vụ');
    }
  };

  // Delete plan
  const handleDelete = async (planId) => {
    if (window.confirm('Bạn có chắc muốn xóa gói dịch vụ này?')) {
      try {
        await api.delete(`/plans/${planId}`);
        loadPlans();
      } catch (err) {
        setError('Không thể xóa gói dịch vụ');
      }
    }
  };

  // Open modal for editing
  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setFormData({
      planname: plan.planname,
      description: plan.description || '',
      price: plan.price.toString(),
      durationmonths: plan.durationmonths.toString()
    });
    setIsModalOpen(true);
  };

  // Open modal for creating
  const openCreateModal = () => {
    setEditingPlan(null);
    setFormData({
      planname: '',
      description: '',
      price: '',
      durationmonths: ''
    });
    setIsModalOpen(true);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <AdminLayout>
      <div className="plans-management">
        <div className="page-header">
          <h1>Quản Lý Gói Dịch Vụ</h1>
          <button className="btn-primary" onClick={openCreateModal}>
            <i className="fas fa-plus"></i> Thêm Gói Mới
          </button>
        </div>

        <div className="plans-grid">
          {plans.map(plan => (
            <div key={plan.planid} className="plan-card">
              <h3>{plan.planname}</h3>
              <div className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(plan.price)}</div>
              <div className="duration">{plan.durationmonths} tháng</div>
              <p>{plan.description}</p>
              <div className="card-actions">
                <button onClick={() => openEditModal(plan)} className="btn-edit">
                  <i className="fas fa-edit"></i> Sửa
                </button>
                <button onClick={() => handleDelete(plan.planid)} className="btn-delete">
                  <i className="fas fa-trash"></i> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editingPlan ? 'Sửa Gói Dịch Vụ' : 'Thêm Gói Dịch Vụ Mới'}</h2>
              <form onSubmit={editingPlan ? handleUpdate : handleCreate}>
                <div className="form-group">
                  <label>Tên gói:</label>
                  <input
                    type="text"
                    value={formData.planname}
                    onChange={(e) => setFormData({...formData, planname: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả:</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Giá (VNĐ):</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Thời hạn (tháng):</label>
                  <input
                    type="number"
                    value={formData.durationmonths}
                    onChange={(e) => setFormData({...formData, durationmonths: e.target.value})}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    {editingPlan ? 'Cập nhật' : 'Tạo mới'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}