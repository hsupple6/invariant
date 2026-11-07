import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { copy, price, useCases } from '../config'
import { ease } from '../motion'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'done' | 'error'

const endpoint = import.meta.env.VITE_PREORDER_ENDPOINT?.trim() || ''

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
    <section className="section preorder" id="preorder">
      <div className="wrap preorder-grid">
        <Reveal>
          <p className="eyebrow">{copy.preorderEyebrow}</p>
          <h2>{copy.preorderTitle}</h2>
          <p className="lede">{copy.preorderBody}</p>
          {price ? <p className="price">{price}</p> : null}
        </Reveal>
        <Reveal delay={0.08}>
          <div className="form-card">
            <AnimatePresence mode="wait">
              {status === 'done' ? (
                <motion.div
                  key="done"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <p className="eyebrow">You're on the list</p>
                  <h3>We'll write to {email.trim()}.</h3>
                  <p className="lede">Nothing was charged. This is a request for the first run of invariant.one.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate>
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
                  {!endpoint && (
                    <p className="form-note">
                      Connect a pre-order address to collect names beyond this browser. Until then, a request stays
                      on this device.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
