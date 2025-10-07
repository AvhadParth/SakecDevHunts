import React, { useEffect, useRef } from 'react'

export default function ParallaxHero({children}) {
  const ref = useRef()
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const y = window.scrollY
      ref.current.style.transform = `translateY(${y * 0.12}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <div ref={ref} className="rounded-2xl p-6 md:p-12 bg-gradient-to-b from-white to-gray-50 card-shadow">
      {children}
    </div>
  )
}
