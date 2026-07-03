// Lightweight touch-to-hover helper
// Adds `touch-hover` class to `.service-book` elements while pressed on touch devices
export default function initTouchHover(){
  if(typeof window === 'undefined' || !('ontouchstart' in window)) return
  let active = null
  function onTouchStart(e){
    const el = e.target.closest && e.target.closest('.service-book')
    if(el){
      active = el
      el.classList.add('touch-hover')
    }
  }
  function clear(){
    if(active){
      active.classList.remove('touch-hover')
      active = null
    }
  }
  document.addEventListener('touchstart', onTouchStart, {passive:true})
  document.addEventListener('touchend', clear, {passive:true})
  document.addEventListener('touchcancel', clear, {passive:true})
}
