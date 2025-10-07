import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('sakec_token', res.data.token)
      localStorage.setItem('sakec_user', JSON.stringify(res.data.user))
      // if admin, go straight to dashboard
      if (res.data.user.role === 'admin') navigate('/admin')
      else navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  const fillAdminCreds = () => {
    setEmail('admin@sakec.edu')
    setPassword('Admin@123')
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl card-shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input type="email" className="w-full mt-1 border p-2 rounded-lg" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input type="password" className="w-full mt-1 border p-2 rounded-lg" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full py-2 rounded-lg bg-black text-white">Login</button>
      </form>

      <div className="text-center mt-4 text-sm text-gray-600">
        <p>Use your student credentials or</p>
        <button onClick={fillAdminCreds} className="text-blue-600 underline mt-1">Login as Admin</button>
      </div>
    </div>
  )
}
