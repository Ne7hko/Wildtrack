export function initLightbox() {
  const root = document.querySelector('[data-lightbox]')
  const image = document.querySelector('[data-lightbox-image]')
  const caption = document.querySelector('[data-lightbox-caption]')
  const items = [...document.querySelectorAll('[data-gallery-item]')]
  if (!root || !image || items.length === 0) return

  let index = 0
  let startX = 0

  const show = (nextIndex) => {
    index = (nextIndex + items.length) % items.length
    const item = items[index]
    image.src = item.dataset.src
    image.alt = item.dataset.alt || ''
    caption.textContent = item.dataset.alt || ''
  }

  const open = (nextIndex) => {
    show(nextIndex)
    root.hidden = false
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    root.hidden = true
    document.body.style.overflow = ''
  }

  items.forEach((item, itemIndex) => {
    item.addEventListener('click', () => open(itemIndex))
  })

  root.querySelector('[data-lightbox-close]')?.addEventListener('click', close)
  root.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1))
  root.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1))

  window.addEventListener('keydown', (event) => {
    if (root.hidden) return
    if (event.key === 'Escape') close()
    if (event.key === 'ArrowLeft') show(index - 1)
    if (event.key === 'ArrowRight') show(index + 1)
  })

  root.addEventListener(
    'touchstart',
    (event) => {
      startX = event.changedTouches[0].clientX
    },
    { passive: true },
  )

  root.addEventListener(
    'touchend',
    (event) => {
      const delta = event.changedTouches[0].clientX - startX
      if (Math.abs(delta) < 40) return
      if (delta > 0) show(index - 1)
      else show(index + 1)
    },
    { passive: true },
  )

  root.addEventListener('click', (event) => {
    if (event.target === root) close()
  })
}
