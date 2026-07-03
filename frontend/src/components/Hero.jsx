import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="home">
      <div className="w-full">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="hero-tagline">Auto repair &amp; service</p>
          <h1 className="mt-3 company-font company-hero text-charcoal">Cossack Auto</h1>
          <p className="hero-subtitle">Honest work. Fair prices. Neighborhood service since day one.</p>

          <div className="hero-actions">
            <Link to="/reservation" className="btn-primary hero-equal w-full sm:w-auto">Book now</Link>
            <Link to="/services" className="btn-secondary hero-equal w-full sm:w-auto">View services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
