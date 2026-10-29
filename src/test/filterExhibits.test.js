import { describe, it, expect } from 'vitest'
import { filterExhibits, getCategories } from '../utils/filterExhibits.js'
import exhibits from '../data/exhibits.json'

describe('filterExhibits — search + category together', () => {
  it('returns all exhibits with no query and All category', () => {
    expect(filterExhibits(exhibits, {})).toHaveLength(exhibits.length)
    expect(filterExhibits(exhibits, { category: 'All' })).toHaveLength(exhibits.length)
  })

  it('filters by category only', () => {
    const result = filterExhibits(exhibits, { category: 'Antiquities' })
    expect(result.every((e) => e.category === 'Antiquities')).toBe(true)
    expect(result).toHaveLength(exhibits.filter((e) => e.category === 'Antiquities').length)
  })

  it('searches by name (case-insensitive)', () => {
    const result = filterExhibits(exhibits, { query: 'ammonite' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('the-ammonite-collection')
  })

  it('searches by description text', () => {
    const result = filterExhibits(exhibits, { query: 'fossil' })
    expect(result.some((e) => e.id === 'crested-lizard-fossil')).toBe(true)
  })

  it('combines search and category filter', () => {
    const result = filterExhibits(exhibits, { query: 'orrery', category: 'Science & Technology' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('brass-orrery-of-the-inner-planets')
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterExhibits(exhibits, { query: 'zzzznothingmatches' })).toHaveLength(0)
  })

  it('treats whitespace-only query as no search', () => {
    expect(filterExhibits(exhibits, { query: '   ' })).toHaveLength(exhibits.length)
  })
})

describe('getCategories', () => {
  it('returns unique categories in order of first appearance', () => {
    expect(getCategories(exhibits)).toEqual([
      'Antiquities',
      'Paintings',
      'Natural History',
      'Science & Technology',
    ])
  })
})
