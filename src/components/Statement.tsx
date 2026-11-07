import { copy, wideShot } from '../config'
import { Frame } from './Frame'
import { Reveal } from './Reveal'

export function Statement() {
  return (
    <section className="section statement" id="product">
      <div className="wrap statement-grid">
        <Reveal>
          <p className="eyebrow">The mat</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2>{copy.statementTitle}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="lede">{copy.statementBody}</p>
        </Reveal>
      </div>
      <div className="wrap">
        <Frame file={wideShot.file} title={wideShot.title} className="shot-wide" />
      </div>
    </section>
  )
}
