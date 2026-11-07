import { copy } from '../config'
import { Reveal } from './Reveal'

export function Signal() {
  return (
    <section className="section signal" id="signal">
      <div className="wrap signal-grid">
        <Reveal>
          <p className="eyebrow">{copy.signalEyebrow}</p>
          <h2>{copy.signalTitle}</h2>
          <p className="lede">{copy.signalBody}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="signal-art" aria-hidden="true">
            <svg viewBox="0 0 420 420">
              <circle className="ring" cx="210" cy="214" r="28" />
              <circle className="ring ring-2" cx="210" cy="214" r="28" />
              <circle className="ring ring-3" cx="210" cy="214" r="28" />
              <rect x="78" y="168" width="264" height="148" rx="28" />
              <circle cx="292" cy="274" r="4" className="led" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
