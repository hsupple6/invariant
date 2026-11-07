import { motion, useReducedMotion } from 'framer-motion'
import { copy, features } from '../config'
import { ease } from '../motion'
import { Reveal } from './Reveal'

export function Features() {
  const reduce = useReducedMotion()

  return (
    <section className="section features">
      <div className="wrap features-grid">
        <div className="features-sticky">
          <Reveal>
            <p className="eyebrow">What it carries</p>
            <h2>{copy.featuresTitle}</h2>
          </Reveal>
        </div>
        <div className="feature-list">
          {features.map((feature, index) => (
            <motion.article
              key={feature.index}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, delay: index * 0.05, ease }}
            >
              <span className="idx">{feature.index}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
