import React, { useState } from 'react'
import API from '../api'

export default function Upload(){
  const [form, setForm] = useState({
    title: '', abstract: '', branch: '', course: '',
    year: '', authors: '', techStack: '', githubLink: '', file: null
  })
  const [msg, setMsg] = useState('')

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm({ ...form, [name]: files ? files[0] : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('sakec_token')
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))

    try {
      await API.post('/projects', fd, { headers: { Authorization: `Bearer ${token}` } })
      setMsg('✅ Project uploaded successfully!')
      setForm({ title: '', abstract: '', branch: '', course: '', year: '', authors: '', techStack: '', githubLink: '', file: null })
    } catch (err) {
      setMsg('❌ Upload failed. Try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl card-shadow">
      <h2 className="text-2xl font-semibold mb-4">Upload Project</h2>
      {msg && <div className="mb-4 text-sm">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
        <textarea name="abstract" placeholder="Abstract" value={form.abstract} onChange={handleChange} className="w-full border p-2 rounded-lg h-28" required />
        <input type="text" name="branch" placeholder="Branch (e.g., IT, CSE)" value={form.branch} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
        <input type="text" name="course" placeholder="Course (optional)" value={form.course} onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <input type="number" name="year" placeholder="Year (e.g., 2024)" value={form.year} onChange={handleChange} className="w-full border p-2 rounded-lg" required />

        <input type="text" name="authors" placeholder="Authors (comma-separated)" value={form.authors} onChange={handleChange} className="w-full border p-2 rounded-lg" required />

        <label className="block text-sm text-gray-500 mt-2">Select Tech Stacks:</label>
        <div className="flex flex-wrap gap-2">
          {['MERN','AI/ML','IoT','CyberSec','Blockchain','VLSI'].map(stack => (
            <label key={stack} className="flex items-center gap-1 text-sm">
              <input type="checkbox" value={stack}
                checked={form.techStack.split(',').includes(stack)}
                onChange={e=>{
                  const val = e.target.value
                  const current = form.techStack.split(',').filter(Boolean)
                  const updated = current.includes(val) ? current.filter(s=>s!==val) : [...current,val]
                  setForm({...form, techStack: updated.join(',')})
                }}
              />
              {stack}
            </label>
          ))}
        </div>

        <input type="text" name="githubLink" placeholder="GitHub Link" value={form.githubLink} onChange={handleChange} className="w-full border p-2 rounded-lg" />
        <input type="file" name="file" onChange={handleChange} className="w-full border p-2 rounded-lg" />

        <button type="submit" className="w-full py-2 bg-black text-white rounded-lg">Upload</button>
      </form>
    </div>
  )
}
