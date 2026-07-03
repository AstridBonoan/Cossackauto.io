import React from 'react'
import { Link } from 'react-router-dom'
import CONTACT from '../config/contact'

const IconSms = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.97.38 1.91.76 2.79a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.29-1.29a2 2 0 0 1 2.11-.45c.88.38 1.82.64 2.79.76A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const StickyContact = () => {
  const { phone, sms, email, stickyColor } = CONTACT

  // allow overriding the sticky button color via CSS custom property
  const style = stickyColor ? { ['--sticky-contact-bg']: stickyColor } : undefined
  const phoneHref = phone ? `tel:${phone}` : '/reservation'
  const smsHref = sms ? `sms:${sms}` : '/reservation'
  const emailHref = email ? `mailto:${email}` : '/reservation'

  const isProtocol = (href) => typeof href === 'string' && href.includes(':')

  return (
    <div className="sticky-contact" aria-hidden={false} style={style}>
      {isProtocol(smsHref)
        ? (<a href={smsHref} className="sticky-btn" aria-label="Text us"><IconSms /></a>)
        : (<Link to="/reservation" className="sticky-btn" aria-label="Text us"><IconSms /></Link>)}

      {isProtocol(phoneHref)
        ? (<a href={phoneHref} className="sticky-btn" aria-label="Call us"><IconPhone /></a>)
        : (<Link to="/reservation" className="sticky-btn" aria-label="Call us"><IconPhone /></Link>)}

      {isProtocol(emailHref)
        ? (<a href={emailHref} className="sticky-btn" aria-label="Email us"><IconEmail /></a>)
        : (<Link to="/reservation" className="sticky-btn" aria-label="Email us"><IconEmail /></Link>)}
    </div>
  )
}

export default StickyContact
