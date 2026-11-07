import { useEffect, useState } from 'react'

const EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'avif']

export function useAsset(base: string) {
  const [src, setSrc] = useState<string | null>(null)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function probe() {
      for (const ext of EXTENSIONS) {
        const url = `${base}.${ext}`
        try {
          const res = await fetch(url, { method: 'HEAD' })
          if (!res.ok) continue
          const type = res.headers.get('content-type') || ''
          if (type.includes('text/html')) continue
          if (!cancelled) setSrc(url)
          break
        } catch {
          /* try the next extension */
        }
      }
      if (!cancelled) setSettled(true)
    }

    setSrc(null)
    setSettled(false)
    void probe()
    return () => {
      cancelled = true
    }
  }, [base])

  return { src, settled }
}
