import { motion, useReducedMotion } from 'framer-motion'
import { copy, people } from '../config'
import { ease } from '../motion'
import { Reveal } from './Reveal'

export function Audience() {
  const reduce = useReducedMotion()

  return (
    <section className="section audience">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{copy.audienceEyebrow}</p>
            <h2>{copy.audienceTitle}</h2>
            <p className="lede">{copy.audienceBody}</p>
          </div>
        </Reveal>
        <div className="people">
          {people.map((person, index) => (
            <motion.article
              key={person.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: index * 0.08, ease }}
            >
              <h3>{person.title}</h3>
              <p>{person.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
