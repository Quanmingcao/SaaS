import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register', { username, email, password, role })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng ký thất bại')
    }
  }

  return (
    <div className="centered">
      <div className="card">
        <h2>Đăng ký</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <input placeholder="Tên người dùng" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="admin">Tenant Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <button type="submit">Đăng ký</button>
        </form>
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  )
}
