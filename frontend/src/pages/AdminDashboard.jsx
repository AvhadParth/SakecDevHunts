import React, {useEffect, useState} from 'react'
import API from '../api'

export default function AdminDashboard(){
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUnapproved = () => {
    setLoading(true)
    API.get('/projects?approved=false')
      .then(res => setProjects(res.data))
      .catch(()=>{})
      .finally(()=>setLoading(false))
  }

  useEffect(()=> { fetchUnapproved() },[])

  const approve = async (id) => {
    await API.put('/projects/' + id + '/approve')
    fetchUnapproved()
  }

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return
    await API.delete('/projects/' + id)
    fetchUnapproved()
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-2xl card-shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard — Approve Projects</h2>
      {loading && <div>Loading...</div>}
      {!loading && projects.length === 0 && <div className="text-gray-600">No projects pending approval.</div>}
      <div className="mt-4 space-y-3">
        {projects.map(p => (
          <div key={p._id} className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.branch} • {p.year} • {p.authors}</div>
              <div className="text-xs text-gray-400 mt-1">Uploader: {p.uploader?.name || p.uploader?.email}</div>
            </div>
            <div className="mt-3 md:mt-0 flex gap-2">
              <button onClick={()=>approve(p._id)} className="px-3 py-1 rounded bg-green-600 text-white">Approve</button>
              <button onClick={()=>remove(p._id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
