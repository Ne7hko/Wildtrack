export function initNav(lenis) {
  const nav = document.querySelector('[data-nav]')
  const toggle = document.querySelector('[data-nav-toggle]')
  const menu = document.querySelector('[data-mobile-menu]')
  const openIcon = toggle?.querySelector('[data-icon-open]')
  const closeIcon = toggle?.querySelector('[data-icon-close]')

  const setScrolled = () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 24)
  }

  setScrolled()
  window.addEventListener('scroll', setScrolled, { passive: true })
  lenis?.on('scroll', setScrolled)

  const closeMenu = () => {
    if (!menu || !toggle) return
    menu.hidden = true
    document.body.style.overflow = ''
    toggle.setAttribute('aria-expanded', 'false')
    if (openIcon) openIcon.hidden = false
    if (closeIcon) closeIcon.hidden = true
  }

  const openMenu = () => {
    if (!menu || !toggle) return
    menu.hidden = false
    document.body.style.overflow = 'hidden'
    toggle.setAttribute('aria-expanded', 'true')
    if (openIcon) openIcon.hidden = true
    if (closeIcon) closeIcon.hidden = false
  }

  toggle?.addEventListener('click', () => {
    if (menu?.hidden) openMenu()
    else closeMenu()
  })

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      closeMenu()
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.35 })
      else target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}
