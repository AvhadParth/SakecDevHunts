import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({project}) {
  const img = project.featuredImage || project.fileUrl
  const badgeColors = {
    'MERN':'bg-green-100 text-green-700',
    'AI/ML':'bg-purple-100 text-purple-700',
    'IoT':'bg-blue-100 text-blue-700',
    'CyberSec':'bg-red-100 text-red-700',
    'Blockchain':'bg-yellow-100 text-yellow-800',
    'VLSI':'bg-orange-100 text-orange-700'
  }

  return (
    <Link to={'/project/' + project._id} className="block bg-white rounded-2xl overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
      {img && (
        <div className="h-40 md:h-44 w-full bg-gray-100 overflow-hidden">
          <img src={img.startsWith('/uploads') ? img.replace('/uploads','http://localhost:5050/uploads') : img} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold">{project.title}</h3>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack?.map(tech => (
            <span key={tech} className={`px-2 py-1 text-xs rounded-full font-medium ${badgeColors[tech] || 'bg-gray-100 text-gray-700'}`}>
              {tech}
            </span>
          ))}
        </div>

        <p className="mt-2 text-sm text-gray-600" style={{maxHeight: '3.6rem', overflow: 'hidden'}}>{project.abstract}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div>{project.branch} • {project.year}</div>
          <div className="font-medium text-gray-800 truncate">{project.authors?.join(', ')}</div>
        </div>
      </div>
    </Link>
  )
}
