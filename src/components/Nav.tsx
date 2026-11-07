import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { preorderUrl } from '../config'
import { useLenis } from './SmoothScroll'

export function Nav() {
  const lenis = useLenis()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (preorderUrl && href === '#preorder') return
    event.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -84 })
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  const preorderHref = preorderUrl || '#preorder'
  const external = Boolean(preorderUrl)

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <a className="wordmark" href="#top" onClick={(event) => go(event, '#top')}>
        <span className="mark" aria-hidden="true" />
        Invariant
      </a>
      <a
        className="btn btn-primary btn-small"
        href={preorderHref}
        onClick={(event) => go(event, '#preorder')}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        Pre-order
      </a>
    </header>
  )
}
