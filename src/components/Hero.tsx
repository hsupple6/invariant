import { motion, useReducedMotion } from 'framer-motion'
import { copy, preorderUrl } from '../config'
import { useAsset } from '../hooks/useAsset'
import { ease } from '../motion'
import { useLenis } from './SmoothScroll'

export function Hero() {
  const reduce = useReducedMotion()
  const lenis = useLenis()
  const { src, settled } = useAsset('/images/hero')
  const wide = useAsset('/images/wide')
  const external = Boolean(preorderUrl)

  function preorder(event: React.MouseEvent<HTMLAnchorElement>) {
    if (external) return
    event.preventDefault()
    const el = document.getElementById('preorder')
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -84 })
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className="hero" id="top">
      {src ? (
        <img className="hero-photo" src={src} alt="invariant.one with a MacBook" />
      ) : (
        <div className="hero-photo hero-photo-empty">{settled ? <span>hero.webp</span> : null}</div>
      )}
      <div className="hero-mobile-frame">
        {wide.src ? (
          <img className="hero-photo-mobile" src={wide.src} alt="invariant.one on the table" />
        ) : (
          <div className="hero-photo-mobile hero-photo-empty">
            {wide.settled ? <span>wide.jpg</span> : null}
          </div>
        )}
      </div>
      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          {copy.heroEyebrow}
        </motion.p>
        <h1>
          {copy.heroTitle.map((line, index) => (
            <span className="line" key={line}>
              <motion.span
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay: 0.18 + index * 0.08, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="lede"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.48, ease }}
        >
          {copy.heroBody}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.58, ease }}
        >
          <a
            className="btn btn-primary"
            href={preorderUrl || '#preorder'}
            onClick={preorder}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            Pre-order invariant.one <span className="arrow" aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
