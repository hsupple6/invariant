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
  { label: 'Network', value: 'Built-in SIM hotspot' },
  { label: 'Form', value: 'Shaped for your MacBook' },
  { label: 'Made for', value: 'Work and study, anywhere' },
]

/** Small print under the spec list. Leave empty until you have test conditions. */
export const specsNote = ''

export const marquee = [
  'Innovators',
  'Founders',
  'Writers',
  'Coffee shops',
  'Libraries',
  'Studios',
  'Airports',
  'Late nights',
  'Study halls',
]

export const features = [
  {
    index: '01',
    title: 'Power',
    body: 'A charging station you can forget is there. 99.6 watt-hours in the mat, up to 14 hours of extra battery under your laptop.',
  },
  {
    index: '02',
    title: 'Signal',
    body: 'A SIM lives in invariant.one. It is the hotspot. You are not waiting on whatever network happens to be in the room.',
  },
  {
    index: '03',
    title: 'Form',
    body: 'Shaped for your MacBook. The same silhouette you already pack, with a quieter job: power and a connection, then out of the way.',
  },
]

export const people = [
  {
    title: 'Innovators',
    body: 'An idea does not wait for a desk. Power and a connection, in the shape of the laptop you already carry.',
  },
  {
    title: 'Founders',
    body: 'The meeting ended. The cafe is full. You still have the afternoon, and the battery for it.',
  },
  {
    title: 'Writers',
    body: 'A table by the window. The draft in front of you. A network that belongs to the mat, not the room.',
  },
]

export const useCases = ['Founder', 'Writer', 'Student', 'Other'] as const

export type Shot = {
  file: string
  title: string
  area: string
}

export const wideShot: Shot = {
  file: 'wide',
  title: 'On the table',
  area: 'wide',
}

export const gallery: Shot[] = [
  { file: 'edge', title: 'The edge', area: 'edge' },
  { file: 'signal', title: 'Its own signal', area: 'signal' },
]

export const copy = {
  heroEyebrow: 'invariant.one',
  heroTitle: ['The office', 'that fits', 'in a bag.'],
  heroBody:
    'invariant.one is a charging mat shaped for your MacBook. 99.6 Wh of power. Up to 14 hours of extra battery. A SIM of its own, so the hotspot is already with you.',
  statementTitle: 'A desk you can carry.',
  statementBody:
    'It takes the footprint of your laptop and quietly adds a battery and a network. Coffee shop, campus, gate, kitchen table. Work, study, or stay a little longer.',
  featuresTitle: 'Three things. Nothing else on the table.',
  signalEyebrow: 'Hotspot',
  signalTitle: 'Online before you ask for the password.',
  signalBody:
    'Cafe wifi is a coin toss. invariant.one brings its own SIM, and your laptop joins the mat. The connection travels with the power.',
  galleryEyebrow: 'The object',
  galleryTitle: 'Quiet enough to leave on the table.',
  audienceEyebrow: 'Who it is for',
  audienceTitle: 'For the work that moves.',
  audienceBody: 'And anyone who works from a table that is not theirs.',
  preorderEyebrow: 'First run',
  preorderTitle: 'Pre-order invariant.one.',
  preorderBody:
    'Leave your name. We will write when the first run is ready. Nothing is charged from this page.',
  footerNote: 'Pre-order requests are not a charge.',
}
