import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="home" className="hero-band">
      <div className="w-full">
        <div className="hero-inner max-w-4xl mx-auto px-4">
          <p className="hero-tagline">Auto repair &amp; service</p>
          <h1 className="mt-4 company-font company-hero">Cossack Auto</h1>
          <p className="hero-subtitle">Honest work. Fair prices. Neighborhood service since day one.</p>

          <div className="hero-actions">
            <Link to="/reservation" className="btn-primary hero-equal w-full sm:w-auto">Book now</Link>
            <Link to="/services" className="btn-outline hero-equal w-full sm:w-auto">View services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
