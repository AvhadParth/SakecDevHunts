import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ProjectDetail from './pages/ProjectDetail'
import Upload from './pages/Upload'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import MyUploads from './pages/MyUploads'

export default function App(){
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/browse" element={<Browse/>} />
          <Route path="/project/:id" element={<ProjectDetail/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/my-uploads" element={<MyUploads/>} />
        </Routes>
      </main>
    </div>
  )
}
