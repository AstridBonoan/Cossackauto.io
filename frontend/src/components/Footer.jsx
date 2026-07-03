import React from 'react'
import { Link } from 'react-router-dom'
import { logo, logoFallback } from '../config/brand'
import CONTACT from '../config/contact'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/reservation', label: 'Reservation' },
]

function formatPhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return raw
}

export default function Footer() {
  const phoneDisplay = CONTACT.phone ? formatPhone(CONTACT.phone) : null
  const phoneHref = CONTACT.phone ? `tel:${CONTACT.phone}` : '/reservation'
  const emailHref = CONTACT.email ? `mailto:${CONTACT.email}` : '/reservation'

  return (
    <footer className="site-footer w-full">
      <div className="footer-inner max-w-6xl mx-auto px-5 sm:px-8">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src={logo}
                alt="Cossack Auto"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = logoFallback }}
              />
              <span>Cossack Auto</span>
            </Link>
            <p className="footer-tagline">
              Honest neighborhood auto repair — fair prices, quality work, and service you can trust.
            </p>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Quick links</h2>
            <ul className="footer-links">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-contact">
              {phoneDisplay && (
                <li>
                  <span className="footer-contact-label">Phone</span>
                  {phoneHref.startsWith('tel:')
                    ? <a href={phoneHref}>{phoneDisplay}</a>
                    : <Link to={phoneHref}>{phoneDisplay}</Link>}
                </li>
              )}
              {CONTACT.email ? (
                <li>
                  <span className="footer-contact-label">Email</span>
                  <a href={emailHref}>{CONTACT.email}</a>
                </li>
              ) : (
                <li>
                  <span className="footer-contact-label">Email</span>
                  <Link to="/reservation">Request via reservation form</Link>
                </li>
              )}
              <li>
                <span className="footer-contact-label">Appointments</span>
                <Link to="/reservation" className="footer-cta-link">Book online</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Hours</h2>
            <ul className="footer-hours">
              <li><span>Mon – Fri</span><span>8:00 AM – 6:00 PM</span></li>
              <li><span>Saturday</span><span>9:00 AM – 2:00 PM</span></li>
              <li><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Cossack Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
