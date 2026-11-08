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

export const useCases = ['Founder', 'Writer', 'Student', 'Other'] as const

export type Slide = {
  file: string
  title: string
  alt: string
  position: string
}

export type Product = {
  id: string
  path: string
  storageKey: string
  images: string
  /** Desktop hero type. right sits in the top right, in ink. */
  heroSide: 'left' | 'right'
  name: string
  siblingPath: string
  siblingLabel: string
  specs: { label: string; value: string }[]
  specsNote: string
  slides: Slide[]
  copy: {
    heroEyebrow: string
    heroTitle: string[]
    heroBody: string
    heroAlt: string
    heroMobileAlt: string
    heroFile: string
    wideFile: string
    productBody: string
    preorderEyebrow: string
    preorderTitle: string
    preorderBody: string
    preorderCta: string
    doneBody: string
    footerNote: string
  }
  metaTitle: string
  metaDescription: string
  ogImage: string
}

const sharedCopy = {
  heroEyebrow: 'invariant.one',
  heroTitle: ['The office', 'that fits', 'in a bag.'],
  preorderEyebrow: 'First run',
  preorderTitle: 'Pre-order invariant.one.',
  preorderBody: 'Leave your name. Nothing is charged.',
  preorderCta: 'Pre-order invariant.one',
  doneBody: 'Nothing was charged. This is a request for the first run of invariant.one.',
  footerNote: 'Pre-order requests are not a charge.',
}

const sharedSpecs = [
  { label: 'Capacity', value: '99.6 Wh' },
  { label: 'Extra battery', value: 'Up to 14 hours' },
  { label: 'Charges', value: 'All your devices' },
  { label: 'Network', value: 'Personal SIM hotspot' },
]

export const mat: Product = {
  id: 'invariant.one',
  path: '/',
  storageKey: 'invariant-preorders',
  images: '/images',
  heroSide: 'left',
  name: 'invariant.one',
  siblingPath: '/screen',
  siblingLabel: 'Behind the screen',
  specs: [...sharedSpecs, { label: 'Form', value: 'Shaped for your MacBook' }],
  specsNote: '',
  slides: [
    { file: 'wide', title: 'On the table', alt: 'invariant.one on the table', position: 'center 60%' },
    { file: 'signal', title: 'Its own signal', alt: 'The lights on invariant.one', position: 'center' },
    { file: 'edge', title: 'The edge', alt: 'The edge of invariant.one', position: 'center' },
  ],
  copy: {
    ...sharedCopy,
    heroBody: 'A personal hotspot that charges all your devices. Shaped for your MacBook.',
    heroAlt: 'invariant.one with a MacBook',
    heroMobileAlt: 'invariant.one on the table',
    heroFile: 'hero.webp',
    wideFile: 'wide.jpg',
    productBody:
      '99.6 Wh of power. Up to 14 hours of extra battery for your laptop, and it charges the rest of your devices too. The hotspot is its own SIM.',
  },
  metaTitle: 'invariant.one — Invariant',
  metaDescription:
    'invariant.one charges all your devices and brings a personal SIM hotspot. 99.6 Wh, up to 14 hours of extra battery, shaped for your MacBook.',
  ogImage: '/images/hero.jpg',
}

export const screen: Product = {
  id: 'behind-screen',
  path: '/screen',
  storageKey: 'invariant-preorders-screen',
  images: '/images/screen',
  heroSide: 'right',
  name: 'Behind the screen',
  siblingPath: '/',
  siblingLabel: 'Under the MacBook',
  specs: [...sharedSpecs, { label: 'Form', value: 'Sits behind your screen' }],
  specsNote: '',
  slides: [
    {
      file: 'wide',
      title: 'Behind the screen',
      alt: 'The power bank behind the screen',
      position: 'center',
    },
    { file: 'signal', title: 'Its own signal', alt: 'The lights on the power bank', position: 'center' },
    { file: 'edge', title: 'The edge', alt: 'The edge of the power bank', position: 'center' },
  ],
  copy: {
    ...sharedCopy,
    heroBody: 'A personal hotspot that charges all your devices. A power bank that sits behind your screen.',
    heroAlt: 'Power bank behind the screen',
    heroMobileAlt: 'Power bank behind the screen',
    heroFile: 'screen/hero.webp',
    wideFile: 'screen/wide.jpg',
    productBody:
      '99.6 Wh of power. Up to 14 hours of extra battery for your laptop, and it charges the rest of your devices too. The hotspot is its own SIM. It sits behind your screen.',
  },
  metaTitle: 'Behind the screen — Invariant',
  metaDescription:
    'A power bank that sits behind your screen. It charges all your devices and brings a personal SIM hotspot. 99.6 Wh, up to 14 hours of extra battery.',
  ogImage: '/images/screen/hero.jpg',
}

export function productFromPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/screen' || path.endsWith('/screen')) return screen
  return mat
}

export function shotLabel(images: string, file: string) {
  const folder = images.replace(/^\/images\/?/, '')
  return `${folder ? `${folder}/` : ''}${file}.jpg`
}
