// Shared search + category filter used by the Exhibits page and tests.
// Search matches the exhibit name and description (and the longer history text).
export function filterExhibits(exhibits, { query = '', category = 'All' } = {}) {
  const normalizedQuery = (query || '').trim().toLowerCase()
  const activeCategory = category && category !== 'All' ? category : null

  return exhibits.filter((exhibit) => {
    const matchesCategory = !activeCategory || exhibit.category === activeCategory
    if (!matchesCategory) return false

    if (!normalizedQuery) return true

    const haystack = [
      exhibit.name || '',
      exhibit.shortDescription || '',
      exhibit.history || '',
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })
}

export function getCategories(exhibits) {
  return Array.from(new Set(exhibits.map((e) => e.category)))
}

export default filterExhibits
