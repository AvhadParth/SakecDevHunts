import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav(){
  const navigate = useNavigate();
  const token = localStorage.getItem('sakec_token');
  const userRaw = localStorage.getItem('sakec_user');
  let user;
  try { user = userRaw ? JSON.parse(userRaw) : null } catch (e) { user = null }
  const isAdmin = user && user.role === 'admin';

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('sakec_token');
    localStorage.removeItem('sakec_user');
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  },[])

  return (
    <header className="header-hero sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-semibold">S</div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold leading-none">SakecDevHunts</div>
            <div className="text-xs text-gray-500 leading-none">Shah & Anchor Kutcchi Engineering College</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/browse" className="text-sm hover:underline">Browse</Link>
          <Link to="/upload" className="text-sm hover:underline">Upload</Link>
          {token && <Link to="/my-uploads" className="text-sm hover:underline">My Uploads</Link>}
          {isAdmin && <Link to="/admin" className="text-sm hover:underline text-red-600">Admin</Link>}
          {!token && <Link to="/login" className="text-sm">Login</Link>}
          {!token && <Link to="/register" className="ml-2 text-sm">Register</Link>}
          {token && <button onClick={logout} className="text-sm text-red-600">Logout</button>}
        </nav>

        <div className="md:hidden">
          <button onClick={()=>setOpen(s=>!s)} className="p-2 rounded-md focus:outline-none" aria-label="Menu">
            {open ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-100">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link to="/browse" onClick={()=>setOpen(false)} className="text-sm">Browse</Link>
            <Link to="/upload" onClick={()=>setOpen(false)} className="text-sm">Upload</Link>
            {token && <Link to="/my-uploads" onClick={()=>setOpen(false)} className="text-sm">My Uploads</Link>}
            {isAdmin && <Link to="/admin" onClick={()=>setOpen(false)} className="text-sm text-red-600">Admin</Link>}
            {!token && <Link to="/login" onClick={()=>setOpen(false)} className="text-sm">Login</Link>}
            {!token && <Link to="/register" onClick={()=>setOpen(false)} className="text-sm">Register</Link>}
            {token && <button onClick={()=>{logout(); setOpen(false)}} className="text-left text-sm text-red-600">Logout</button>}
          </div>
        </div>
      )}
    </header>
  )
}
