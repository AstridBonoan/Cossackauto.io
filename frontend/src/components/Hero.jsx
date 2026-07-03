import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import logoFallback from '../assets/logo-fallback.svg'

export default function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="hero-grid">
            <div className="hero-content">
              <p className="hero-eyebrow">Auto repair &amp; service</p>
              <h1 className="hero-title">Cossack Auto</h1>
              <p className="hero-lead">
                Honest work, fair prices, and dependable neighborhood service you can trust.
              </p>
              <div className="hero-actions">
                <Link to="/reservation" className="btn-primary">Book an appointment</Link>
                <Link to="/services" className="btn-ghost">Our services</Link>
              </div>
            </div>

            <div className="hero-panel" aria-hidden="true">
              <div className="hero-panel-inner">
                <img
                  src={logo}
                  alt=""
                  className="hero-panel-logo"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = logoFallback }}
                />
                <p className="hero-panel-caption">Your neighborhood shop since day one</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Why choose us">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ul className="trust-list">
            <li>
              <span className="trust-label">Honest diagnostics</span>
              <span className="trust-desc">Clear explanations before any work begins</span>
            </li>
            <li>
              <span className="trust-label">Fair pricing</span>
              <span className="trust-desc">Straightforward estimates with no surprises</span>
            </li>
            <li>
              <span className="trust-label">Quality work</span>
              <span className="trust-desc">Every vehicle treated with care and precision</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
