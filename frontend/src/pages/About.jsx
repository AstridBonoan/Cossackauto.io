import React from 'react'
import { Link } from 'react-router-dom'

export default function About(){
  return (
    <section id="about">
      <div className="max-w-6xl mx-auto px-4">
        <div className="page-header">
          <h2>About</h2>
          <p className="page-header-lead">Your trusted neighborhood auto repair shop. Honest work, fair prices, quality service.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="about-photo">Photo</div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-charcoal">Your Name</h3>
            <div className="about-role">Owner / Founder</div>

            <div className="mt-6 about-body">
              <p>Hi, I'm Your Name — owner of Cossack Auto. I started this shop because I believe in honest, high-quality auto repair.</p>
              <p>I treat every vehicle like my own and stand behind my work. If you'd like to schedule service, please use the button below to book an appointment.</p>
            </div>

            <div className="mt-8">
              <Link to="/reservation" className="btn-primary">Book now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
