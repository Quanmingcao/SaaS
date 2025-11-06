import React from 'react';
import { Link } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';

export default function Landing() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Website Chuyên Nghiệp Cho Cơ Sở Giáo Dục</h1>
          <p>Giải pháp toàn diện giúp trường học, khoa và bộ môn xây dựng sự hiện diện trực tuyến mạnh mẽ</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Dùng thử miễn phí</Link>
            <Link to="/demo" className="btn-secondary">Xem demo</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Tính Năng Nổi Bật</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="icon-department"></i>
            <h3>Quản Lý Khoa/Bộ Môn</h3>
            <p>Dễ dàng quản lý thông tin và hoạt động của từng đơn vị</p>
          </div>
          <div className="feature-card">
            <i className="icon-research"></i>
            <h3>Nghiên Cứu Khoa Học</h3>
            <p>Theo dõi và chia sẻ các dự án nghiên cứu</p>
          </div>
          <div className="feature-card">
            <i className="icon-news"></i>
            <h3>Tin Tức & Sự Kiện</h3>
            <p>Cập nhật thông tin mới nhất đến cộng đồng</p>
          </div>
          <div className="feature-card">
            <i className="icon-custom"></i>
            <h3>Tùy Biến Giao Diện</h3>
            <p>Thể hiện bản sắc riêng của đơn vị</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="testimonials">
        <h2>Khách Hàng Nói Gì?</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"EduSaaS đã giúp khoa chúng tôi số hóa mọi hoạt động một cách hiệu quả"</p>
            <div className="testimonial-author">
              <strong>TS. Nguyễn Văn A</strong>
              <span>Trưởng khoa CNTT - Đại học X</span>
            </div>
          </div>
          {/* Thêm testimonials khác */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Sẵn Sàng Để Bắt Đầu?</h2>
        <p>Dùng thử miễn phí 14 ngày, không cần thẻ tín dụng</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-primary">Bắt đầu ngay</Link>
          <Link to="/contact" className="btn-secondary">Tư vấn thêm</Link>
        </div>
      </section>
    </LandingLayout>
  );
}