import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'

const STEPS = [
  {
    title: 'Browse the collection',
    body: 'Open the Exhibits page to see every item in the museum, each shown with an image, name, category, and a short description.',
  },
  {
    title: 'Search and filter',
    body: 'Type a name or keyword into the search box to find exhibits by name or description. Use the category chips to narrow results — search and filters work together.',
  },
  {
    title: 'Open exhibit details',
    body: 'Select any exhibit card to read its historical background, interesting facts, category, and the room it is displayed in.',
  },
  {
    title: 'Use the floor plan',
    body: 'Open the Floor Plan page to see a labelled map of the museum. Tap a room to set it as your starting point, or choose it from the dropdown.',
  },
  {
    title: 'Plan a route',
    body: 'Pick a destination exhibit. The guide calculates the shortest route and gives you step-by-step directions from your starting room.',
  },
  {
    title: 'Look for the sample notice',
    body: 'This is a learning project. Exhibit details are illustrative sample content and are clearly labelled so they are not mistaken for verified facts.',
  },
]

export default function VisitorGuide() {
  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Visitor Guide</li>
          </ol>
        </nav>

        <div className="section-head">
          <div>
            <p className="eyebrow">Help</p>
            <h2>How to use this guide</h2>
            <p className="lead">A quick tour of everything the virtual guide can do.</p>
          </div>
        </div>

        <div className="guide-grid">
          {STEPS.map((step, i) => (
            <div className="guide-card" key={step.title}>
              <div className="guide-card__num" aria-hidden="true">{i + 1}</div>
              <h3>{step.title}</h3>
              <p className="muted mb-0">{step.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <div className="notice" role="note">{siteConfig.sampleNotice}</div>
          <div className="row" style={{ marginTop: '1rem' }}>
            <Link className="btn btn--primary" to="/exhibits">Start exploring</Link>
            <Link className="btn btn--ghost" to="/floor-plan">Open the floor plan</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
