import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5)

/**
 * Anima um número de 0 até `target` quando `start` se torna true.
 */
export function useCountUp(target, decimals = 0, start = false, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    let raf
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(target * easeOutQuint(progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
