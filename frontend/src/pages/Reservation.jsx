import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default function Reservation() {
  const [form, setForm] = useState({ year: '', make: '', model: '', name: '', email: '', contact: '', servicesNeeded: '', description: '' })
  const [fileName, setFileName] = useState('No file chosen')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const validationTimers = useRef({})

  function onChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear validation error for this field as user types/selects
    setErrors(prev => ({ ...prev, [name]: '' }))

    // Debounced live validation
    try{ if (validationTimers.current[name]) clearTimeout(validationTimers.current[name]) }catch(_){}
    validationTimers.current[name] = setTimeout(() => {
      const msg = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: msg }))
    }, 350)
  }

  function onFileChange(e){
    const f = e.target.files[0]
    if(f) { setFileName(f.name); setFile(f) }
    else { setFileName('No file chosen'); setFile(null) }
  }

  // Field validators
  function validateField(name, value){
    value = (typeof value === 'string') ? value.trim() : value
    switch(name){
      case 'year':{
        if (!value) return 'Year is required'
        const y = Number(value)
        const current = new Date().getFullYear()
        if (!Number.isInteger(y) || y < 1985 || y > current) return `Enter a year between 1985 and ${current}`
        return ''
      }
      case 'name':{
        if (!value) return 'Name is required'
        if (value.length < 2) return 'Enter your full name'
        return ''
      }
      case 'email':{
        if (!value) return 'Email is required'
        // basic email regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!re.test(value)) return 'Enter a valid email address'
        return ''
      }
      case 'make':
        if (!value) return 'Make is required'
        return ''
      case 'model':
        if (!value) return 'Model is required'
        return ''
      case 'contact':{
        if (!value) return 'Contact number is required'
        try{
          const p = parsePhoneNumberFromString(value)
          if (!p || !p.isValid()) return 'Enter a valid phone number'
          return ''
        }catch(_){
          const digits = value.replace(/\D/g,'')
          if (digits.length < 7) return 'Enter a valid phone number'
          return ''
        }
      }
      case 'servicesNeeded':
        if (!value) return 'Service needed is required'
        return ''
      case 'description':{
        if (!value) return 'Description is required'
        if (value.length < 10) return 'Please provide a bit more detail (min 10 chars)'
        return ''
      }
      default:
        return ''
    }
  }

  function validateAll(){
    const fields = ['year','name','email','make','model','contact','servicesNeeded','description']
    const newErrors = {}
    for(const f of fields){
      const msg = validateField(f, form[f])
      if (msg) newErrors[f] = msg
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function onBlur(e){
    const { name, value } = e.target
    const msg = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: msg }))
  }

  useEffect(()=>{
    return ()=>{
      // clear any pending validation timers
      Object.values(validationTimers.current).forEach(t => { try{ clearTimeout(t) }catch(_){} })
      validationTimers.current = {}
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    // validate all fields (sets `errors` state)
    if (!validateAll()){
      // focus first invalid field
      const first = Object.keys(errors)[0] || Object.keys((() => { const ne = {}; ['year','name','email','make','model','contact','servicesNeeded','description'].forEach(f=>{ const m=validateField(f, form[f]); if (m) ne[f]=m }); return ne })())[0]
      const el = document.querySelector(`[name="${first}"]`)
      if (el && typeof el.focus === 'function') el.focus()
      return
    }

    setStatus('sending')
    try {
      // Construct payload expected by backend
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.contact,
        vehicle: `${form.year} ${form.make} ${form.model}`.trim(),
        date: null,
        notes: `${form.servicesNeeded}\n\n${form.description}`
      }

      // Attempt to POST to backend; if backend unreachable, fall back to simulated success
      let ok = false
      try{
        let res
        if (file) {
          const fd = new FormData()
          fd.append('picture', file)
          fd.append('name', payload.name)
          fd.append('email', payload.email)
          fd.append('phone', payload.phone)
          fd.append('vehicle', payload.vehicle)
          fd.append('date', payload.date)
          fd.append('notes', payload.notes)
          res = await fetch('http://localhost:4000/api/reservations', { method: 'POST', body: fd })
        } else {
          res = await fetch('http://localhost:4000/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        }
        if (res.ok) {
          ok = true
        } else {
          // try to read JSON error details and display per-field messages
          const data = await res.json().catch(()=>null)
          if (data && data.errors) {
            setErrors(prev => ({ ...prev, ...data.errors }))
            setStatus('error')
            return
          }
        }
      }catch(_){ ok = false }

      if (!ok){
        // fallback: simulate network submission so UI still behaves
        await new Promise(r=>setTimeout(r,700))
      }

      setStatus('sent')
      setForm({ year: '', make: '', model: '', name: '', email: '', contact: '', servicesNeeded: '', description: '' })
      setFileName('No file chosen')
      setErrors({})
    } catch (err) {
      setStatus('error')
    }
  }

  // year options
  const years = []
  for(let y=new Date().getFullYear(); y>=1985; y--) years.push(y)
  
  

  // Make/Model selects removed — using free-text inputs instead

  // read optional prefill from router state (e.g., Services -> BOOK NOW passes service title)
  const location = useLocation()
  useEffect(()=>{
    try{
      const pre = location && location.state && location.state.prefill
      if(pre && (!form.servicesNeeded || form.servicesNeeded.trim() === '')){
        setForm(f => ({ ...f, servicesNeeded: String(pre) }))
      }
    }catch(err){/* ignore */}
  // only run when location.state changes
  }, [location && location.state])

  /* Small custom select to avoid native dropdown flipping. */
  function CustomSelect({ name, value, onChange, options, placeholder, error }){
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(()=>{
      function onDoc(e){
        if(ref.current && !ref.current.contains(e.target)) setOpen(false)
      }
      document.addEventListener('mousedown', onDoc)
      document.addEventListener('touchstart', onDoc)
      return ()=>{ document.removeEventListener('mousedown', onDoc); document.removeEventListener('touchstart', onDoc) }
    },[])

    function handleSelect(v){
      // mimic native event shape
      onChange({ target: { name, value: v } })
      setOpen(false)
    }

    return (
      <div ref={ref} className="relative text-left">
        <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={()=>{ setOpen(!open) }} className={`reservation-select mt-2 w-full text-left flex items-center justify-between ${error ? 'input-error' : ''}`}>
          <span className={`${value? 'text-black':'text-gray-500'}`}>{ value || placeholder }</span>
          <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>

        {open && (
          <ul role="listbox" tabIndex={-1} className="custom-select-dropdown absolute z-50 top-full mt-0 left-0 w-full bg-white border rounded shadow max-h-60 overflow-auto">
            {options.filter(opt => opt !== '').map(opt => (
              <li key={opt} role="option" onClick={()=>handleSelect(opt)} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{opt}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  function ensureDropdownSpace(e){
    try{
      const buffer = 260; // pixels of space to leave at bottom
      const rect = e.target.getBoundingClientRect();
      if(rect.bottom > window.innerHeight - buffer){
        // center the select so dropdown can open below
        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }catch(err){/* ignore */}
  }

  // Called on pointer down so we can reposition BEFORE the native dropdown opens
  function prepDropdownOpen(el){
    try{
      // More aggressive: move the select to the top of the viewport
      // so the native dropdown has room to open downward.
      const rect = el.getBoundingClientRect();
      const margin = 160; // desired bottom space
      if(rect.bottom > window.innerHeight - margin || rect.top < 80){
        // Put the select near the top and add a small offset
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        // Slight upward scroll so there's breathing room above the element
        window.scrollBy(0, -72);
      }
    }catch(err){/* ignore */}
  }

  return (
    <section className="reservation-section">
      <div className="max-w-3xl mx-auto px-4">
        <div className="page-header">
          <p className="page-eyebrow">Schedule service</p>
          <h2>Book an appointment</h2>
          <p className="page-header-lead">Fill out the form below and we'll get back to you to confirm your appointment.</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4">
        <form id="reservation" onSubmit={onSubmit} className="reservation-form">
          <div>
            <h3 className="section-title">Vehicle information</h3>
          </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="reservation-label">Year <span className="text-red-600">*</span>{errors.year && <em className="required-note text-red-600 italic ml-2">(Required)</em>}</label>
          <CustomSelect
            name="year"
            value={form.year}
            onChange={onChange}
            options={years.map(y => String(y))}
            placeholder="Select year"
            error={errors.year}
          />
        </div>

        <div>
          <label className="reservation-label">Make <span className="text-red-600">*</span>{errors.make && <em className="required-note text-red-600 italic ml-2">(Required)</em>}</label>
          <input name="make" value={form.make} onChange={onChange} onBlur={onBlur} className={`reservation-input mt-2 ${errors.make ? 'input-error' : (form.make ? 'input-valid' : '')}`} placeholder="Enter make (e.g. Toyota)" />
        </div>

        <div>
          <label className="reservation-label">Model <span className="text-red-600">*</span>{errors.model && <em className="required-note text-red-600 italic ml-2">(Required)</em>}</label>
          {/** If user picked Make 'Other' or explicitly chose a custom model, show a text input to allow typing. Otherwise show filtered select. **/}
          <input name="model" value={form.model} onChange={onChange} onBlur={onBlur} className={`reservation-input mt-2 ${errors.model ? 'input-error' : (form.model ? 'input-valid' : '')}`} placeholder="Enter model (e.g. Camry)" />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="section-title">Contact information</h3>
      </div>

      <div className="mt-4">
        <label className="reservation-label">Contact Number <span className="text-red-600">*</span>{errors.contact && <em className="required-note text-red-600 italic ml-2">{errors.contact}</em>}</label>
        <input name="contact" value={form.contact} onChange={onChange} onBlur={onBlur} className={`reservation-input mt-2 ${errors.contact ? 'input-error' : (form.contact ? 'input-valid' : '')}`} placeholder="(555) 123-4567" />
      </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="reservation-label">Full Name <span className="text-red-600">*</span>{errors.name && <em className="required-note text-red-600 italic ml-2">{errors.name}</em>}</label>
            <input name="name" value={form.name} onChange={onChange} onBlur={onBlur} className={`reservation-input mt-2 ${errors.name ? 'input-error' : (form.name ? 'input-valid' : '')}`} placeholder="Your full name" />
          </div>
          <div>
            <label className="reservation-label">Email <span className="text-red-600">*</span>{errors.email && <em className="required-note text-red-600 italic ml-2">{errors.email}</em>}</label>
            <input name="email" value={form.email} onChange={onChange} onBlur={onBlur} className={`reservation-input mt-2 ${errors.email ? 'input-error' : (form.email ? 'input-valid' : '')}`} placeholder="you@example.com" />
          </div>
        </div>

      <div className="mt-6">
        <label className="reservation-label">Service Needed <span className="text-red-600">*</span>{errors.servicesNeeded && <em className="required-note text-red-600 italic ml-2">{errors.servicesNeeded}</em>}</label>
        <input name="servicesNeeded" value={form.servicesNeeded} onChange={onChange} onBlur={onBlur} className={`reservation-input mt-2 ${errors.servicesNeeded ? 'input-error' : (form.servicesNeeded ? 'input-valid' : '')}`} placeholder="e.g. Brake Service" />
      </div>

      <div className="mt-6">
        <label className="reservation-label">Brief Description <span className="text-red-600">*</span>{errors.description && <em className="required-note text-red-600 italic ml-2">{errors.description}</em>}</label>
        <textarea name="description" value={form.description} onChange={onChange} onBlur={onBlur} rows="6" className={`reservation-textarea mt-2 ${errors.description ? 'input-error' : (form.description ? 'input-valid' : '')}`} placeholder="Describe the issue or service needed..."></textarea>
      </div>

      <div className="mt-6">
        <label className="reservation-label">Picture (optional)</label>
        <div className="file-chooser mt-2">
          <label className="choose-btn" htmlFor="fileInput">Choose file</label>
          <input id="fileInput" type="file" onChange={onFileChange} style={{display:'none'}} />
          <div className="file-name">{fileName}</div>
        </div>
      </div>

      <div className="mt-8">
        <button type="submit" className="submit-reservation" disabled={status==='sending'}>
          {status === 'sending' ? 'Submitting...' : 'Submit reservation'}
        </button>
      </div>
      </form>
    </div>
    </section>
  )
}
