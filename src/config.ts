/** Everything you are likely to edit lives in this file. */

export const scene = {
  /** How large the model is framed. Raise it if the mat looks small. */
  fit: 5.12,
  /**
   * Radians, applied before framing.
   * If the export lies on its side, try [Math.PI / 2, 0, 0].
   */
  rotation: [0, 0, 0] as [number, number, number],
  autoRotateSpeed: 0.42,
  cameraPosition: [9.02, 8.86, 8.12] as [number, number, number],
  cameraFov: 32,
  cameraTarget: [0, 0.04, 0] as [number, number, number],
  envIntensity: 0.22,
}

/** Leave empty until you have a real price. It will show on the pre-order card. */
export const price = ''

/**
 * If this is a full URL, the nav and hero buttons go there.
 * Leave empty to keep people on the form on this page.
 */
export const preorderUrl = ''

/** Shown in the footer when set. */
export const contactEmail = ''

export const socials: { label: string; href: string }[] = []

export const specs: { label: string; value: string }[] = [
  { label: 'Capacity', value: '99.6 Wh' },
  { label: 'Extra battery', value: 'Up to 14 hours' },
  { label: 'Charges', value: 'All your devices' },
  { label: 'Network', value: 'Personal SIM hotspot' },
  { label: 'Form', value: 'Shaped for your MacBook' }
]

export const specsNote = ''

export const useCases = ['Founder', 'Writer', 'Student', 'Other'] as const

export const slides = [
  { file: 'wide', title: 'On the table', alt: 'invariant.one on the table', position: 'center 60%' },
  { file: 'signal', title: 'Its own signal', alt: 'The lights on invariant.one', position: 'center' },
  { file: 'edge', title: 'The edge', alt: 'The edge of invariant.one', position: 'center' },
]

export const copy = {
  heroEyebrow: 'invariant.one',
  heroTitle: ['The office', 'that fits', 'in a bag.'],
  heroBody: 'A personal hotspot that charges all your devices. Shaped for your MacBook.',
  productBody:
    '99.6 Wh of power. Up to 14 hours of extra battery for your laptop, and it charges the rest of your devices too. The hotspot is its own SIM.',
  preorderEyebrow: 'First run',
  preorderTitle: 'Pre-order invariant.one.',
  preorderBody: 'Leave your name. Nothing is charged.',
  footerNote: 'Pre-order requests are not a charge.',
}
