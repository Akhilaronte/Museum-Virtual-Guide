import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import exhibits from '../data/exhibits.json'
import { rooms, getRoomForExhibit } from '../utils/pathfinding.js'
import { siteConfig } from '../data/siteConfig.js'
import ExhibitImage from '../components/ExhibitImage.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function ExhibitDetail() {
  const { id } = useParams()
  const exhibit = useMemo(() => exhibits.find((e) => e.id === id), [id])

  if (!exhibit) {
    return (
      <section className="section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/exhibits">Exhibits</Link></li>
              <li>Not found</li>
            </ol>
          </nav>
          <EmptyState
            icon="✦"
            title="Exhibit not found"
            message={`We couldn't find an exhibit with id "${id}". It may have been moved or renamed.`}
            role="alert"
          >
            <Link className="btn btn--primary" style={{ marginTop: 12 }} to="/exhibits">
              Back to all exhibits
            </Link>
          </EmptyState>
        </div>
      </section>
    )
  }

  const room = getRoomForExhibit(rooms, exhibit)

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/exhibits">Exhibits</Link></li>
            <li>{exhibit.name}</li>
          </ol>
        </nav>

        {/* key forces a fresh subtree (and image reset) when navigating between exhibits */}
        <div className="detail" key={exhibit.id}>
          <div className="detail__media">
            <ExhibitImage exhibit={exhibit} alt={`Illustration of ${exhibit.name}`} loading="eager" />
          </div>

          <div>
            <p className="detail__cat">{exhibit.category}</p>
            <h1>{exhibit.name}</h1>
            <p className="detail__period">{exhibit.period}</p>
            <p className="detail__history">{exhibit.history}</p>

            <div className="facts">
              <h3 className="facts__title">Interesting facts</h3>
              <ul>
                {exhibit.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>

            <div className="location">
              <span aria-hidden="true" style={{ fontSize: '1.4rem' }}>📍</span>
              <div>
                <span className="muted">Located in</span>
                <div className="location__room">{room ? room.name : 'Unknown room'}</div>
              </div>
              {room && (
                <Link
                  className="btn btn--ghost btn--small"
                  to={`/floor-plan?to=${exhibit.id}`}
                  style={{ marginLeft: 'auto' }}
                >
                  Find on floor plan →
                </Link>
              )}
            </div>

            <p className="notice" role="note">
              <strong>Note:</strong> {siteConfig.sampleNotice}
            </p>

            <Link className="back-link" to="/exhibits">← Back to all exhibits</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
