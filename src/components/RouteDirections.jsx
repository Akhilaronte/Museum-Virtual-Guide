// Ordered, numbered list of route steps.
export default function RouteDirections({ route }) {
  if (!route || !route.steps) return null
  return (
    <ol className="route-list">
      {route.steps.map((step) => (
        <li key={step.n}>{step.text}</li>
      ))}
    </ol>
  )
}
