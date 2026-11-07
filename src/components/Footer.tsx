import { contactEmail, copy, preorderUrl, socials } from '../config'
import { useLenis } from './SmoothScroll'

export function Footer() {
  const lenis = useLenis()
  const year = new Date().getFullYear()

  function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('mailto:') || href.startsWith('http')) return
    event.preventDefault()
    const el = document.getElementById(href.slice(1))
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -12 })
    else el.scrollIntoView()
  }

  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <p>
          © {year} Invariant. {copy.footerNote}
        </p>
        <nav aria-label="Footer">
          <a href={preorderUrl || '#preorder'} onClick={(event) => go(event, '#preorder')}>
            Pre-order
          </a>
          <a href="#specs" onClick={(event) => go(event, '#specs')}>
            Specs
          </a>
          {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : null}
          {socials.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="ender-wrap" aria-hidden="true">
        <p className="ender">Invariant</p>
      </div>
    </footer>
  )
}
