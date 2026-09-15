const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

export function initCursor() {
  const ring = document.querySelector('[data-cursor]')
  const dot = document.querySelector('[data-cursor-dot]')
  if (!ring || !dot) return

  const enable = () => {
    if (!finePointer.matches) {
      document.body.classList.remove('has-custom-cursor')
      ring.hidden = true
      dot.hidden = true
      return
    }

    document.body.classList.add('has-custom-cursor')
    ring.hidden = false
    dot.hidden = false
  }

  enable()
  finePointer.addEventListener('change', enable)

  let x = 0
  let y = 0
  let rx = 0
  let ry = 0

  window.addEventListener(
    'pointermove',
    (event) => {
      x = event.clientX
      y = event.clientY
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      const target = event.target
      const hoverable = target.closest('[data-cursor-hover], a, button')
      const image = target.closest('[data-cursor-image], img')
      ring.classList.toggle('is-hover', Boolean(hoverable))
      ring.classList.toggle('is-image', Boolean(image) && !hoverable)
    },
    { passive: true },
  )

  const tick = () => {
    rx += (x - rx) * 0.18
    ry += (y - ry) * 0.18
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
