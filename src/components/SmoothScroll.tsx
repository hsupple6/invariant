import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
    })

    setLenis(instance)

    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = limit > 0 ? scroll / limit : 0
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`
    }

    instance.on('scroll', onScroll)

    let frame = 0
    const raf = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      instance.destroy()
      cancelAnimationFrame(frame)
      setLenis(null)
    }
  }, [reduce])

  return (
    <LenisContext.Provider value={lenis}>
      <div className="progress" ref={bar} aria-hidden="true" />
      {children}
    </LenisContext.Provider>
  )
}
