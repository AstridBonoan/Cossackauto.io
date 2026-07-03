// Toggle sticky-contact between fixed (viewport) and absolute (below footer image)
export default function initStickyFooter() {
  if (typeof window === 'undefined') return

  const BAR_SELECTOR = '.sticky-contact'
  const FOOTER_IMG_SELECTOR = '.site-footer img[alt="footer logo"]'

  const bar = document.querySelector(BAR_SELECTOR)
  const footerImg = document.querySelector(FOOTER_IMG_SELECTOR)
  if (!bar || !footerImg) return

  function update() {
    const scrollY = window.scrollY || window.pageYOffset
    const viewportBottom = scrollY + window.innerHeight

    const imgRect = footerImg.getBoundingClientRect()
    const imgTopDoc = scrollY + imgRect.top
    const imgBottomDoc = imgTopDoc + footerImg.offsetHeight

    // if viewport bottom has reached the footer image bottom, place the bar below it
    if (viewportBottom >= imgBottomDoc - 4) {
      // position the bar just below the footer image in document flow
      bar.style.position = 'absolute'
      bar.style.top = (imgBottomDoc + 8) + 'px'
      bar.style.bottom = 'auto'
      bar.style.left = '50%'
      bar.style.transform = 'translateX(-50%)'
      // add class to trigger CSS transition: first mark below-footer, then visibly show
      bar.classList.add('below-footer')
      // ensure visible class is added in next tick to allow transition
      setTimeout(() => bar.classList.add('below-footer-visible'), 20)
    } else {
      // remove visible class so it can fade out, then remove below-footer after transition
      bar.classList.remove('below-footer-visible')
      // wait for the CSS transition to finish before removing absolute positioning
      setTimeout(() => {
        bar.classList.remove('below-footer')
        bar.style.position = ''
        bar.style.top = ''
        bar.style.bottom = ''
        bar.style.left = ''
        bar.style.transform = ''
      }, 220)
    }
  }

  // run on scroll/resize and on load
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  window.addEventListener('load', update)
  // initial run
  setTimeout(update, 50)
}
