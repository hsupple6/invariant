import { motion, useReducedMotion } from 'framer-motion'
import { ease } from './motion'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Preorder } from './components/Preorder'
import { SmoothScroll } from './components/SmoothScroll'

export default function App() {
  const reduce = useReducedMotion()

  return (
    <SmoothScroll>
      <a className="skip" href="#product">
        Skip to content
      </a>
      {!reduce && (
        <motion.div
          className="curtain"
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.28 }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.18, ease }}
          >
            Invariant
          </motion.span>
        </motion.div>
      )}
      <Nav />
      <main>
        <Hero />
        <Preorder />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
