import { Link } from 'react-router-dom'
import ExhibitImage from './ExhibitImage.jsx'

export default function ExhibitCard({ exhibit }) {
  return (
    <article className="card">
      <div className="card__media">
        <ExhibitImage exhibit={exhibit} alt={`Illustration of ${exhibit.name}`} />
        <span className="card__badge">{exhibit.category}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">
          <Link to={`/exhibits/${exhibit.id}`}>{exhibit.name}</Link>
        </h3>
        <p className="card__desc">{exhibit.shortDescription}</p>
        <div className="card__meta">
          <span className="card__category">{exhibit.category}</span>
          <Link
            className="card__link"
            to={`/exhibits/${exhibit.id}`}
            aria-label={`View details for ${exhibit.name}`}
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}
