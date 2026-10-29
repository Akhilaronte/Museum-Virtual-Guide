import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import exhibits from '../data/exhibits.json'
import { siteConfig } from '../data/siteConfig.js'
import { filterExhibits } from '../utils/filterExhibits.js'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ExhibitCard from '../components/ExhibitCard.jsx'
import SkeletonGrid from '../components/SkeletonGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Exhibits() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [loading, setLoading] = useState(true)

  // A short, simulated loading delay so the loading state is visible and testable.
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [query, category])

  // Reflect search + category in the URL so state persists on refresh and is shareable.
  useEffect(() => {
    const params = {}
    if (query) params.q = query
    if (category && category !== 'All') params.category = category
    setSearchParams(params, { replace: true })
  }, [query, category, setSearchParams])

  const results = useMemo(
    () => filterExhibits(exhibits, { query, category }),
    [query, category],
  )

  const hasFilters = query || category !== 'All'
  const clearAll = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Exhibits</li>
          </ol>
        </nav>

        <div className="section-head">
          <div>
            <p className="eyebrow">Collection</p>
            <h2>All Exhibits</h2>
          </div>
          <p className="muted">{siteConfig.sampleNotice}</p>
        </div>

        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilter categories={siteConfig.categories} value={category} onChange={setCategory} />
        </div>

        <div className="resultbar">
          <span aria-live="polite">
            {loading ? 'Loading…' : `${results.length} ${results.length === 1 ? 'exhibit' : 'exhibits'} found`}
          </span>
          {hasFilters && (
            <button type="button" className="btn btn--ghost btn--small" onClick={clearAll}>
              Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : results.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No exhibits found"
            message="Try a different search term or category, or clear your filters."
          >
            <button type="button" className="btn btn--ghost btn--small" style={{ marginTop: 12 }} onClick={clearAll}>
              Reset filters
            </button>
          </EmptyState>
        ) : (
          <div className="grid grid--auto">
            {results.map((exhibit) => (
              <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
