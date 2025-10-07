import React, {useState} from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:'', branch:''})
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/register', form)
      localStorage.setItem('sakec_token', res.data.token)
      localStorage.setItem('sakec_user', JSON.stringify(res.data.user))
      navigate('/')
      window.location.reload()
    } catch (err) {
      alert('Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl card-shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-4">
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full p-3 rounded-xl border"/>
        <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-3 rounded-xl border"/>
        <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full p-3 rounded- xl border"/>
        <input value={form.branch} onChange={e=>setForm({...form,branch:e.target.value})} placeholder="Branch (e.g. Information Technology)" className="w-full p-3 rounded- xl border"/>
        <button className="px-5 py-3 rounded-xl bg-black text-white">Create account</button>
      </form>
    </div>
  )
}
