import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  to: number
  decimals?: number
  duration?: number
}

export function Count({ to, decimals = 0, duration = 1.35 }: Props) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? to : 0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (reduce) {
      setValue(to)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / (duration * 1000))
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(to * eased)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration, reduce])

  return <span ref={ref}>{value.toFixed(decimals)}</span>
}
