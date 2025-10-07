import React, { useEffect, useState } from 'react'
import API from '../api'
import ProjectCard from '../components/ProjectCard'
import ParallaxHero from '../components/ParallaxHero'
import { Link } from 'react-router-dom'

export default function Home(){
  const [projects, setProjects] = useState([])

  useEffect(()=> {
    API.get('/projects?approved=true')
      .then(res => setProjects(res.data.slice(0,6)))
      .catch(()=>{})
  },[])

  return (
    <div>
      <section className="grid gap-8 md:grid-cols-2 items-center mb-12">
        <div>
          <ParallaxHero>
            <h1 className="text-3xl md:text-5xl font-semibold">SakecDevHunts</h1>
            <p className="mt-4 text-gray-600 max-w-xl">Explore final-year projects built by Shah & Anchor Kutcchi Engineering College students. Browse ideas, download reports, and get inspired.</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link to="/browse" className="px-5 py-3 rounded-xl border card-shadow bg-white">Browse Projects</Link>
              <Link to="/upload" className="px-5 py-3 rounded-xl bg-black text-white">Upload Project</Link>
            </div>
          </ParallaxHero>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 card-shadow">
            <h4 className="text-sm text-gray-500">Featured</h4>
            <h3 className="mt-2 text-lg font-semibold">Student Projects Spotlight</h3>
            <p className="mt-2 text-sm text-gray-600">Handpicked projects from various branches — try searching for AI, VLSI, Cyber Security and more.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {projects.map(p => (<ProjectCard key={p._id} project={p} />))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Latest Projects</h2>
          <Link to="/browse" className="text-sm text-gray-500">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map(p=> <ProjectCard key={p._id} project={p} />)}
        </div>
      </section>
    </div>
  )
}
