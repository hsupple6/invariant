import { motion, useReducedMotion } from 'framer-motion'
import { ease } from './motion'
import { Audience } from './components/Audience'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Preorder } from './components/Preorder'
import { Signal } from './components/Signal'
import { Specs } from './components/Specs'
import { Statement } from './components/Statement'
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
            Flux
          </motion.span>
        </motion.div>
      )}
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Features />
        <Specs />
        <Signal />
        <Gallery />
        <Audience />
        <Preorder />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
