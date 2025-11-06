import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingLayout({ children }) {
  return (
    <div className="landing-layout">
      <header className="landing-header">
        <nav>
          <div className="logo">
            <Link to="/">EduSaaS</Link>
          </div>
          <div className="nav-links">
            <Link to="/features">Tính năng</Link>
            <Link to="/pricing">Bảng giá</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/login" className="btn-login">Đăng nhập</Link>
            <Link to="/register" className="btn-signup">Dùng thử miễn phí</Link>
          </div>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EduSaaS</h3>
            <p>Giải pháp website toàn diện cho các cơ sở giáo dục</p>
          </div>
          <div className="footer-section">
            <h4>Sản phẩm</h4>
            <Link to="/features">Tính năng</Link>
            <Link to="/pricing">Bảng giá</Link>
            <Link to="/roadmap">Lộ trình</Link>
          </div>
          <div className="footer-section">
            <h4>Hỗ trợ</h4>
            <Link to="/docs">Tài liệu</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EduSaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}