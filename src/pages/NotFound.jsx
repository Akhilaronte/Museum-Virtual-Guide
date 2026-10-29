import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <EmptyState
          icon="🧭"
          title="Page not found"
          message="The page you're looking for doesn't exist or may have moved."
          role="alert"
        >
          <div className="row" style={{ marginTop: 12, justifyContent: 'center' }}>
            <Link className="btn btn--primary" to="/">Back to home</Link>
            <Link className="btn btn--ghost" to="/exhibits">Browse exhibits</Link>
          </div>
        </EmptyState>
      </div>
    </section>
  )
}
