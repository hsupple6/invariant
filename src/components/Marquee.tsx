import { marquee } from '../config'

export function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <section className="marquee" aria-label="Who Flux One is for">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} aria-hidden={index >= marquee.length}>
            {item}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  )
}
