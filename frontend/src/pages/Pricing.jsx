import React from 'react';
import { Link } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '499,000đ',
      period: '/tháng',
      features: [
        'Website khoa/bộ môn cơ bản',
        'Quản lý tin tức & sự kiện',
        'Hosting & tên miền phụ',
        'Hỗ trợ email',
      ],
      cta: 'Dùng thử miễn phí',
      recommended: false
    },
    {
      name: 'Professional',
      price: '999,000đ',
      period: '/tháng',
      features: [
        'Tất cả tính năng Starter',
        'Tùy biến giao diện',
        'Quản lý nghiên cứu khoa học',
        'Tích hợp mạng xã hội',
        'Hỗ trợ 24/7',
      ],
      cta: 'Gói phổ biến nhất',
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Liên hệ',
      period: '',
      features: [
        'Tất cả tính năng Professional',
        'Tùy biến theo yêu cầu',
        'API tích hợp',
        'Đào tạo & triển khai',
        'Hỗ trợ ưu tiên',
      ],
      cta: 'Liên hệ tư vấn',
      recommended: false
    }
  ];

  return (
    <LandingLayout>
      <div className="pricing">
        <div className="pricing-header">
          <h1>Bảng Giá Dịch Vụ</h1>
          <p>Lựa chọn gói phù hợp với nhu cầu của đơn vị</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <Link 
                to={plan.name === 'Enterprise' ? '/contact' : '/register'} 
                className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="pricing-faq">
          <h2>Câu Hỏi Thường Gặp</h2>
          {/* FAQ items */}
        </div>
      </div>
    </LandingLayout>
  );
}