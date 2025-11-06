import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      
      // Chuyển hướng dựa vào role
      if (res.data.user.role === 'superadmin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/welcome')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại')
    }
  }

  return (
    <div className="centered">
      <div className="card">
        <h2>Đăng nhập</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Đăng nhập</button>
        </form>
        <p>
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  )
}
