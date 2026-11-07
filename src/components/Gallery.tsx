import { copy, gallery } from '../config'
import { Frame } from './Frame'
import { Reveal } from './Reveal'

export function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{copy.galleryEyebrow}</p>
            <h2>{copy.galleryTitle}</h2>
          </div>
        </Reveal>
        <div className="gallery-grid">
          {gallery.map((shot) => (
            <Frame key={shot.file} file={shot.file} title={shot.title} className={`shot-${shot.area}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
