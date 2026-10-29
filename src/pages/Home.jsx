import { Link } from 'react-router-dom'
import exhibits from '../data/exhibits.json'
import { rooms } from '../utils/pathfinding.js'
import { siteConfig } from '../data/siteConfig.js'
import ExhibitCard from '../components/ExhibitCard.jsx'
import ExhibitImage from '../components/ExhibitImage.jsx'

const FEATURES = [
  {
    title: 'Browse & search',
    body: 'Scroll every exhibit or use the search box and category chips to narrow the collection by name, keyword, or theme.',
    to: '/exhibits',
    cta: 'Browse exhibits',
  },
  {
    title: 'Read the details',
    body: 'Open any exhibit to see its image, historical background, interesting facts, category, and the room it lives in.',
    to: '/exhibits/' + (exhibits[0]?.id || ''),
    cta: 'See an example',
  },
  {
    title: 'Find your way',
    body: 'Open the interactive floor plan, choose where you are and what you want to see, and follow a step-by-step route.',
    to: '/floor-plan',
    cta: 'Open floor plan',
  },
]

export default function Home() {
  const featured = exhibits.filter((e) => e.featured).slice(0, 4)
  const heroExhibit = featured[0] || exhibits[0]

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="eyebrow">Virtual Guide</p>
            <h1 className="hero__title">Explore the {siteConfig.museumName}</h1>
            <p className="hero__text">
              {siteConfig.tagline} Browse the collection, search and filter exhibits, and find your way around
              the building with an interactive floor plan.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/exhibits">Browse Exhibits</Link>
              <Link className="btn btn--ghost" to="/floor-plan">Open Floor Plan</Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-num">{exhibits.length}</span>
                <span className="hero__stat-label">Exhibits</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-num">{siteConfig.categories.length}</span>
                <span className="hero__stat-label">Categories</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-num">{rooms.length}</span>
                <span className="hero__stat-label">Rooms</span>
              </div>
            </div>
          </div>
          <div className="hero__art">
            <ExhibitImage exhibit={heroExhibit} alt={`Featured exhibit: ${heroExhibit.name}`} loading="eager" />
          </div>
        </div>
      </section>

      {/* Featured exhibits */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured</p>
              <h2>Highlights of the collection</h2>
            </div>
            <Link className="btn btn--ghost btn--small" to="/exhibits">View all exhibits →</Link>
          </div>
          <div className="grid grid--auto">
            {featured.map((exhibit) => (
              <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Getting around</p>
              <h2>Three ways to explore</h2>
            </div>
          </div>
          <div className="grid grid--3">
            {FEATURES.map((f) => (
              <div className="guide-card" key={f.title}>
                <h3>{f.title}</h3>
                <p className="muted mb-0">{f.body}</p>
                <p style={{ marginTop: '1rem' }}>
                  <Link className="btn btn--ghost btn--small" to={f.to}>{f.cta} →</Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan your visit */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Plan your visit</p>
              <h2>Sample hours &amp; admission</h2>
            </div>
          </div>
          <div className="grid grid--2">
            <div className="guide-card">
              <h3>Opening hours</h3>
              <ul className="muted mb-0">
                {siteConfig.hours.map((h) => (
                  <li key={h.day}><strong>{h.day}:</strong> {h.time}</li>
                ))}
              </ul>
            </div>
            <div className="guide-card">
              <h3>Admission</h3>
              <ul className="muted mb-0">
                {siteConfig.admission.map((a) => (
                  <li key={a.label}><strong>{a.label}:</strong> {a.value}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="notice" role="note">{siteConfig.sampleNotice}</p>
        </div>
      </section>
    </>
  )
}
