// Reusable empty / no-results / error state block.
export default function EmptyState({ icon = '✦', title, message, children, role = 'status' }) {
  return (
    <div className="state" role={role}>
      <div className="state__icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      {message && <p className="muted mb-0">{message}</p>}
      {children}
    </div>
  )
}
