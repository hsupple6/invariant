import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { copy, price, slides, specs, specsNote, useCases } from '../config'
import { useAsset } from '../hooks/useAsset'
import { ease } from '../motion'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'done' | 'error'

const endpoint = import.meta.env.VITE_PREORDER_ENDPOINT?.trim() || ''

function Slide({
  file,
  alt,
  position,
  active,
}: {
  file: string
  alt: string
  position: string
  active: boolean
}) {
  const { src, settled } = useAsset(`/images/${file}`)
  if (src) {
    return (
      <img
        src={src}
        alt={active ? alt : ''}
        className={active ? 'is-active' : undefined}
        style={{ objectPosition: position }}
        aria-hidden={!active}
      />
    )
  }
  return (
    <div className={active ? 'slider-empty is-active' : 'slider-empty'} aria-hidden={!active}>
      {settled && active ? <span>{file}.jpg</span> : null}
    </div>
  )
}

function Slider() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 980px)').matches,
  )
  const items = narrow ? slides.filter((slide) => slide.file !== 'wide') : slides
  const [index, setIndex] = useState(0)
  const startX = useRef(0)
  const count = items.length
  const current = items[index] ?? items[0]

  useEffect(() => {
    const query = window.matchMedia('(max-width: 980px)')
    const onChange = () => setNarrow(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setIndex(0)
  }, [narrow])

  function step(direction: number) {
    setIndex((value) => (value + direction + count) % count)
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    startX.current = event.clientX
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const delta = event.clientX - startX.current
    if (delta > 48) step(-1)
    if (delta < -48) step(1)
  }

  function onKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') step(1)
    if (event.key === 'ArrowLeft') step(-1)
  }

  return (
    <div className="slider">
      <div
        className="slider-frame"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKey}
        role="group"
        aria-roledescription="carousel"
        aria-label="invariant.one"
      >
        {items.map((slide, slideIndex) => (
          <Slide
            key={slide.file}
            file={slide.file}
            alt={slide.alt}
            position={slide.position}
            active={slideIndex === index}
          />
        ))}
      </div>
      <div className="slider-bar">
        <p className="slider-caption" aria-live="polite">
          {current.title}
        </p>
        <div className="slider-controls">
          <div className="dots" role="tablist" aria-label="Photos">
            {items.map((slide, slideIndex) => (
              <button
                key={slide.file}
                type="button"
                role="tab"
                aria-label={slide.title}
                aria-selected={slideIndex === index}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)}>
            ←
          </button>
          <button type="button" aria-label="Next photo" onClick={() => step(1)}>
            →
          </button>
        </div>
      </div>
    </div>
  )
}
export function Preorder() {
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [useCase, setUseCase] = useState<(typeof useCases)[number]>('Founder')
  const [quantity, setQuantity] = useState(1)
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (status === 'sending') return

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName) {
      setError('Add your name.')
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('That email does not look complete.')
      setStatus('error')
      return
    }

    if (company.trim()) {
      setStatus('done')
      return
    }

    setStatus('sending')
    setError('')

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      use: useCase,
      quantity,
      product: 'invariant.one',
    }

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        const key = 'invariant-preorders'
        const previous = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
        previous.push({ ...payload, at: new Date().toISOString() })
        localStorage.setItem(key, JSON.stringify(previous))
      }
      setStatus('done')
    } catch {
      setError('Something went wrong. Try again in a moment.')
      setStatus('error')
    }
  }

  return (
    <section className="section offer" id="product">
      <div className="wrap offer-grid">
        <div className="offer-main">
          <Slider />
          <div className="offer-copy">
            <p className="lede">{copy.productBody}</p>
          </div>
          <div className="spec-list" id="specs">
            {specs.map((spec) => (
              <div className="spec-row" key={spec.label}>
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
            {specsNote ? <p className="specs-note">{specsNote}</p> : null}
          </div>
        </div>
        <div className="offer-form">
          <Reveal>
            <div className="form-card" id="preorder">
              {price ? <p className="price">{price}</p> : null}
              <AnimatePresence mode="wait">
                {status === 'done' ? (
                  <motion.div
                    key="done"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease }}
                  >
                    <p className="eyebrow">You're on the list</p>
                    <h2 className="form-title">We'll write to you.</h2>
                    <p className="lede">Nothing was charged. This is a request for the first run of invariant.one.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate>
                    <p className="eyebrow">{copy.preorderEyebrow}</p>
                    <h2 className="form-title">{copy.preorderTitle}</h2>
                    <p className="form-intro">{copy.preorderBody}</p>
                    <label className="hp" aria-hidden="true">
                      Company
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Name</span>
                      <input
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Email</span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </label>
                    <fieldset className="field">
                      <legend>How you'll use it</legend>
                      <div className="choices">
                        {useCases.map((item) => (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={useCase === item}
                            onClick={() => setUseCase(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div className="field qty-row">
                      <span>Quantity</span>
                      <div className="stepper" role="group" aria-label="Quantity">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                        >
                          −
                        </button>
                        <strong>{quantity}</strong>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity((value) => Math.min(5, value + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {status === 'error' && error ? (
                      <p className="form-error" role="alert">
                        {error}
                      </p>
                    ) : null}
                    <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending' : 'Request a pre-order'}
                      {status !== 'sending' && (
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      )}
                    </button>
                    <p className="form-note">Nothing is charged. We'll write when the first run is ready.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
