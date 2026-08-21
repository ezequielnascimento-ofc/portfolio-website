import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Aplica um deslocamento vertical suave a um elemento conforme a página rola,
 * limitado a uma faixa curta para dar profundidade sem distrair.
 */
export function useParallax(speed = 0.12, max = 40) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    let ticking = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      const offset = window.innerHeight - rect.top
      const shift = Math.max(Math.min(offset * speed * 0.1, max), -max)
      el.style.transform = `translate3d(0, ${shift}px, 0)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed, max])

  return ref
}
