import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'

export default function ProjectDetail(){
  const { id } = useParams()
  const [project, setProject] = useState(null)

  useEffect(()=> {
    API.get('/projects/' + id).then(res => setProject(res.data)).catch(()=>{})
  },[id])

  if (!project) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl card-shadow">
      <h1 className="text-2xl font-semibold">{project.title}</h1>
      <div className="mt-3 text-sm text-gray-600">{project.branch} • {project.year} • {project.authors}</div>
      <p className="mt-6 text-gray-700">{project.abstract}</p>
      {project.githubLink && <a className="mt-4 block text-blue-600" href={project.githubLink} target="_blank">GitHub Repository</a>}
      {project.fileUrl && <a className="mt-2 block text-green-600" href={project.fileUrl.replace('/uploads','http://localhost:5050/uploads')} target="_blank">Download file</a>}
    </div>
  )
}
