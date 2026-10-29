export default function SearchBar({ value, onChange, id = 'exhibit-search', placeholder = 'Search exhibits by name or description…' }) {
  return (
    <div className="search">
      <span className="search__icon" aria-hidden="true">⌕</span>
      <input
        id={id}
        type="search"
        className="search__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Search exhibits"
      />
      {value && (
        <button
          type="button"
          className="search__clear"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          ×
        </button>
      )}
    </div>
  )
}
