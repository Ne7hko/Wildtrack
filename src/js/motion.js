import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initMotion(lenis) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const veil = document.querySelector('[data-page-veil]')

  requestAnimationFrame(() => veil?.classList.add('is-gone'))

  if (reduced) {
    document.querySelectorAll('.reveal, .reveal-text').forEach((el) => {
      el.style.opacity = '1'
    })
    return
  }

  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  const heroImage = document.querySelector('.hero__image')
  if (heroImage) {
    gsap.fromTo(
      heroImage,
      { scale: 1.08, yPercent: 0 },
      {
        scale: 1.18,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        },
      },
    )
  }

  gsap.from('.hero__content > *', {
    y: 28,
    opacity: 0,
    duration: 1.15,
    stagger: 0.14,
    ease: 'power2.out',
    delay: 0.25,
  })

  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
        },
      },
    )
  })

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 0.1
    gsap.to(el, {
      yPercent: amount * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section, figure, .hero') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  document.querySelectorAll('.media-frame img, .full-bleed img, .masonry__item img, .horizon__slot img, .video-card img').forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.16, opacity: 0.35 },
      {
        scale: 1.04,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
        },
      },
    )
  })

  gsap.utils.toArray('.section').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.72 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 55%',
          scrub: true,
        },
      },
    )
  })
}