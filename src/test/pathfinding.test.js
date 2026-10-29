import { describe, it, expect } from 'vitest'
import { rooms, findPath, buildGraph, getRoomForExhibit } from '../utils/pathfinding.js'
import exhibits from '../data/exhibits.json'

function adjacent(rooms, a, b) {
  const ra = rooms.find((r) => r.id === a)
  return (ra.connectsTo || []).includes(b)
}

function isValidPath(rooms, path) {
  if (!path || path.length === 0) return false
  for (let i = 0; i < path.length - 1; i += 1) {
    if (!adjacent(rooms, path[i], path[i + 1])) return false
  }
  return true
}

describe('findPath (BFS shortest route)', () => {
  it('returns a single-element path when from === to', () => {
    expect(findPath(rooms, 'entrance-hall', 'entrance-hall')).toEqual(['entrance-hall'])
  })

  it('finds a path between adjacent rooms', () => {
    expect(findPath(rooms, 'entrance-hall', 'antiquities')).toEqual([
      'entrance-hall',
      'antiquities',
    ])
  })

  it('returns a valid shortest path to a far room (the cafe)', () => {
    const path = findPath(rooms, 'entrance-hall', 'cafe')
    expect(path).not.toBeNull()
    expect(path[0]).toBe('entrance-hall')
    expect(path[path.length - 1]).toBe('cafe')
    expect(isValidPath(rooms, path)).toBe(true)
    expect(path.length).toBe(4) // entrance -> * -> * -> cafe
  })

  it('returns null for unknown ids', () => {
    expect(findPath(rooms, 'nope', 'cafe')).toBeNull()
    expect(findPath(rooms, 'entrance-hall', 'nope')).toBeNull()
  })

  it('reaches every room from the entrance', () => {
    rooms.forEach((room) => {
      expect(findPath(rooms, 'entrance-hall', room.id)).not.toBeNull()
    })
  })
})

describe('buildGraph', () => {
  it('builds adjacency lists for every room', () => {
    const graph = buildGraph(rooms)
    expect(graph['entrance-hall']).toContain('atrium')
    expect(graph['cafe']).toContain('modern')
  })
})

describe('getRoomForExhibit', () => {
  it('returns the room hosting an exhibit', () => {
    const exhibit = exhibits.find((e) => e.id === 'sun-disk-of-aravia')
    const room = getRoomForExhibit(rooms, exhibit)
    expect(room.id).toBe('egyptian')
  })
})
