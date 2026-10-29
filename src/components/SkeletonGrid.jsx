// Accessible loading skeleton shown while data is "loading".
export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton" key={i}>
          <div className="skeleton__media" />
          <div className="skeleton__line" />
          <div className="skeleton__line skeleton__line--sm" />
        </div>
      ))}
    </div>
  )
}
