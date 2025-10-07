import React, {useEffect, useState} from 'react'
import API from '../api'
import ProjectCard from '../components/ProjectCard'

export default function MyUploads(){
  const [projects, setProjects] = useState([])

  const fetchMine = () => {
    API.get('/projects/mine')
      .then(res => setProjects(res.data))
      .catch(()=>{})
  }

  useEffect(()=> { fetchMine() },[])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Uploads</h2>
      {projects.length === 0 && <div className="text-gray-500">You haven't uploaded any projects yet.</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {projects.map(p => <ProjectCard key={p._id} project={p} />)}
      </div>
    </div>
  )
}
