// Category filter as a single-select group of toggle chips.
export default function CategoryFilter({ categories, value, onChange }) {
  const items = ['All', ...categories]
  return (
    <div className="filters" role="group" aria-label="Filter exhibits by category">
      <span className="filters__label">Category:</span>
      {items.map((category) => {
        const active = category === value
        return (
          <button
            key={category}
            type="button"
            className="chip"
            aria-pressed={active}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
