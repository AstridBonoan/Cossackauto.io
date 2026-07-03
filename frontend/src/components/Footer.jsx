import React from 'react'
import footerLogo from '../assets/logo.png'
import logoFallback from '../assets/logo-fallback.svg'

export default function Footer() {
  return (
    <footer className="site-footer w-full">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-center text-center">
        <div className="footer-copy mb-3">© 2026 Cossack Auto. All rights reserved.</div>
        <div>
          <img src={footerLogo} alt="footer logo" className="h-14 w-14 opacity-90" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src=logoFallback}} />
        </div>
      </div>
    </footer>
  )
}
