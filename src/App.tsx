import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { productFromPath } from './config'
import { ease } from './motion'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Preorder } from './components/Preorder'
import { ProductProvider } from './product'
import { SmoothScroll } from './components/SmoothScroll'

function setMeta(selector: string, value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute('content', value)
}

export default function App() {
  const reduce = useReducedMotion()
  const product = productFromPath(window.location.pathname)

  useEffect(() => {
    document.title = product.metaTitle
    setMeta('meta[name="description"]', product.metaDescription)
    setMeta('meta[property="og:title"]', product.metaTitle)
    setMeta('meta[property="og:description"]', product.metaDescription)
    setMeta('meta[property="og:image"]', product.ogImage)
  }, [product])

  return (
    <ProductProvider value={product}>
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
    </ProductProvider>
  )
}
