import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!localStorage.getItem('token')) {
    navigate('/login')
    return null
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="centered">
      <div className="card">
        <h1>🎉 Chúc mừng!</h1>
        <p>Bạn đã đăng nhập thành công.</p>
        <div>
          <p><strong>Tên:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Vai trò:</strong> {user.role}</p>
          {user.tenantname && <p><strong>Tenant:</strong> {user.tenantname}</p>}
        </div>
        <button onClick={logout}>Đăng xuất</button>
      </div>
    </div>
  )
}
