import React from 'react'
import { Link } from 'react-router-dom'

const TRUST_POINTS = [
  {
    title: 'Honest diagnostics',
    desc: 'We explain what your vehicle needs before any work starts.',
  },
  {
    title: 'Fair pricing',
    desc: 'Straightforward estimates with no pressure and no surprises.',
  },
  {
    title: 'Quality work',
    desc: 'Every car is serviced with the same care we would want for our own.',
  },
]

export default function Hero() {
  return (
    <section id="home" className="home-landing">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="hero-block">
          <div className="hero-accent" aria-hidden="true" />
          <p className="hero-eyebrow">Neighborhood auto repair</p>
          <h1 className="hero-title">Cossack Auto</h1>
          <p className="hero-lead">
            Honest work and fair prices from a shop you can trust down the street.
          </p>
          <div className="hero-actions">
            <Link to="/reservation" className="btn-primary btn-lg">Book an appointment</Link>
            <Link to="/services" className="hero-link">Browse services</Link>
          </div>
        </div>

        <div className="trust-grid" aria-label="Why choose us">
          {TRUST_POINTS.map((item) => (
            <article key={item.title} className="trust-card">
              <h2 className="trust-card-title">{item.title}</h2>
              <p className="trust-card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
