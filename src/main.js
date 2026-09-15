import 'lenis/dist/lenis.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/motion.css'

import Lenis from 'lenis'
import { mountIcons } from './js/icons'
import { initNav } from './js/nav'
import { initCursor } from './js/cursor'
import { initLightbox } from './js/lightbox'
import { initMotion } from './js/motion'

mountIcons()

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lenis = reduced
  ? null
  : new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

initNav(lenis)
initCursor()
initLightbox()
initMotion(lenis)
