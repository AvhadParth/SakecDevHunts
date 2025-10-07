import React, { useEffect, useState } from 'react'
import API from '../api'
import ProjectCard from '../components/ProjectCard'

const branches = ['Information Technology','Computer Engineering','AI&DS','Cyber Security','VLSI','ACT','ECS']

export default function Browse(){
  const [projects, setProjects] = useState([])
  const [q, setQ] = useState('')
  const [branch, setBranch] = useState('')
  const [year, setYear] = useState('')

  const fetchProjects = () => {
    const params = new URLSearchParams()
    params.append('approved','true')
    if (q) params.append('q', q)
    if (branch) params.append('branch', branch)
    if (year) params.append('year', year)
    API.get('/projects?' + params.toString())
      .then(res => setProjects(res.data))
      .catch(()=>{})
  }

  useEffect(()=> { fetchProjects() },[])

  return (
    <div>
      <div className="mb-6 grid md:grid-cols-4 gap-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects, authors, keywords" className="md:col-span-2 p-3 rounded-xl border"/>
        <select value={branch} onChange={e=>setBranch(e.target.value)} className="p-3 rounded-xl border">
          <option value="">All branches</option>
          {branches.map(b=> <option key={b} value={b}>{b}</option>)}
        </select>
        <input value={year} onChange={e=>setYear(e.target.value)} placeholder="Year" className="p-3 rounded-xl border"/>
        <div className="md:col-span-4 flex gap-3 mt-2">
          <button onClick={fetchProjects} className="px-4 py-2 rounded-xl bg-black text-white">Search</button>
          <button onClick={()=>{ setQ(''); setBranch(''); setYear(''); fetchProjects(); }} className="px-4 py-2 rounded-xl border">Reset</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p._id} project={p} />)}
      </div>
    </div>
  )
}
