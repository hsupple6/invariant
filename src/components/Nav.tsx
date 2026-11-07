import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { preorderUrl } from '../config'
import { ease } from '../motion'
import { useLenis } from './SmoothScroll'

const links = [
  { href: '#product', label: 'Product' },
  { href: '#signal', label: 'Signal' },
  { href: '#specs', label: 'Specs' },
  { href: '#gallery', label: 'Gallery' },
]

export function Nav() {
  const lenis = useLenis()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
  }, [open, lenis])

  function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (preorderUrl && href === '#preorder') return
    event.preventDefault()
    setOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) {
      lenis.start()
      lenis.scrollTo(el, { offset: -84 })
    } else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  const preorderHref = preorderUrl || '#preorder'
  const external = Boolean(preorderUrl)

  return (
    <>
      <header className={scrolled || open ? 'nav scrolled' : 'nav'}>
        <a className="wordmark" href="#top" onClick={(event) => go(event, '#top')}>
          <span className="mark" aria-hidden="true" />
          Flux
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => go(event, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="btn btn-primary btn-small"
            href={preorderHref}
            onClick={(event) => go(event, '#preorder')}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            Pre-order
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(event) => go(event, link.href)}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.05 + index * 0.05, ease }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              className="btn btn-primary"
              href={preorderHref}
              onClick={(event) => go(event, '#preorder')}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.28, ease }}
            >
              Pre-order Flux One
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
