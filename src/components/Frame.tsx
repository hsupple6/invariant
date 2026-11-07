import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../motion'
import { useAsset } from '../hooks/useAsset'

type Props = {
  file: string
  title: string
  className?: string
}

export function Frame({ file, title, className }: Props) {
  const reduce = useReducedMotion()
  const { src, settled } = useAsset(`/images/${file}`)

  return (
    <motion.figure
      className={`shot ${className ?? ''} ${src ? 'has-image' : ''}`}
      initial={reduce ? false : { clipPath: 'inset(8% 8% 8% 8% round 20px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.05, ease }}
    >
      <div className="shot-fallback" aria-hidden="true">
        <strong>{title}</strong>
      </div>
      {src && (
        <motion.img
          src={src}
          alt={title}
          initial={{ opacity: 0, scale: 1.045 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
        />
      )}
      <figcaption className="caption">
        <span>{title}</span>
        {settled && !src && <span className="file-plate">{file}.jpg</span>}
      </figcaption>
    </motion.figure>
  )
}
