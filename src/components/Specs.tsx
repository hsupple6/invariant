import { motion, useReducedMotion } from 'framer-motion'
import { specs, specsNote } from '../config'
import { ease } from '../motion'

export function Specs() {
  const reduce = useReducedMotion()

  return (
    <section className="section specs" id="specs">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Specifications</p>
          <h2>The numbers that matter.</h2>
        </div>
        <div className="spec-list">
          {specs.map((row, index) => (
            <motion.div
              className="spec-row"
              key={row.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.05, ease }}
            >
              <span className="spec-label">{row.label}</span>
              <span className="spec-value">{row.value}</span>
            </motion.div>
          ))}
        </div>
        {specsNote ? <p className="specs-note">{specsNote}</p> : null}
      </div>
    </section>
  )
}
