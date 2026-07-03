import React, { useState, useRef, useEffect } from 'react'
import logo from '../../images/logo.png'
import logoFallback from '../assets/logo-fallback.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  const openMenu = () => {
    clearTimeout(timeoutRef.current)
    setVisible(true)
    requestAnimationFrame(() => setOpen(true))
  }

  const closeMenu = () => {
    setOpen(false)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setVisible(false), 220)
  }

  const toggle = () => {
    if (!open) openMenu()
    else closeMenu()
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleNavLinkClick = () => {
    closeMenu()
  }

  return (
    <header className="site-header">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="logo flex-none flex items-center space-x-3">
          <img src={logo} alt="Cossack Auto" className="h-12 w-12 object-contain rounded-full" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src=logoFallback}} />
          <span>Cossack Auto</span>
        </Link>

        <button type="button" aria-label="toggle menu" aria-expanded={open} onClick={toggle} className="ml-auto lg:hidden p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {/* Desktop nav - always visible on md+ */}
        <nav className="desktop-nav hidden lg:flex lg:items-center lg:justify-center lg:static lg:bg-transparent lg:text-inherit">
          <ul className="flex flex-row space-x-6 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
          </ul>
        </nav>

        {/* Mobile nav - animated, only shown when `visible` */}
        {visible && (
          <nav className={`mobile-nav lg:hidden absolute left-0 right-0 top-full bg-[var(--color-charcoal)] text-[var(--color-offwhite)] transform transition-all duration-200 ${open ? 'translate-y-0 opacity-100 pointer-events-auto z-50' : '-translate-y-2 opacity-0 pointer-events-none'}`}>
            <ul className="flex flex-col space-y-2 text-sm p-4">
              <li className="py-2"><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
              <li className="py-2"><Link to="/about" onClick={handleNavLinkClick}>About</Link></li>
              <li className="py-2"><Link to="/services" onClick={handleNavLinkClick}>Services</Link></li>
              <li className="py-2"><Link to="/reviews" onClick={handleNavLinkClick}>Reviews</Link></li>
              <li className="py-2"><Link to="/reservation" onClick={handleNavLinkClick}>Reservation</Link></li>
            </ul>
              <div className="p-4 border-t border-white/5">
                <Link to="/reservation" onClick={handleNavLinkClick} className="btn-primary w-full block text-center py-3">Book now</Link>
              </div>
          </nav>
        )}

        <div className="hidden lg:flex items-center ml-4 header-cta">
          <Link to="/reservation" className="btn-primary">Book now</Link>
        </div>
      </div>
    </header>
  )
}
