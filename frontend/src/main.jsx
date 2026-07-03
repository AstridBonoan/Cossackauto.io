import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import initTouchHover from './utils/touchHover'
import initStickyFooter from './utils/stickyFooter'

// initialize touch hover support for touch devices
initTouchHover()
// position sticky contact below footer image when reaching page bottom (initialize after mount)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// initialize stickyFooter after the app mounts so elements exist in the DOM
setTimeout(() => {
  try { initStickyFooter() } catch (e) { /* ignore */ }
}, 50)
