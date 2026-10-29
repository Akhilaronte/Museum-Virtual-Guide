import { describe, it, expect } from 'vitest'
import { describeRoute } from '../utils/formatRoute.js'
import { rooms, findPath } from '../utils/pathfinding.js'

describe('describeRoute', () => {
  it('returns a single "already here" step when start === end', () => {
    const route = describeRoute(rooms, ['entrance-hall'])
    expect(route.totalRooms).toBe(1)
    expect(route.steps).toHaveLength(1)
    expect(route.steps[0].text).toMatch(/already in the Entrance Hall/i)
  })

  it('produces one step per move and labels start/end', () => {
    const path = findPath(rooms, 'entrance-hall', 'cafe')
    const route = describeRoute(rooms, path)
    expect(route.steps.length).toBe(path.length - 1)
    expect(route.startRoom.id).toBe('entrance-hall')
    expect(route.endRoom.id).toBe('cafe')
    expect(route.totalRooms).toBe(path.length)
  })

  it('returns null for invalid input', () => {
    expect(describeRoute(rooms, null)).toBeNull()
    expect(describeRoute(rooms, [])).toBeNull()
    expect(describeRoute(rooms, ['nope', 'also-nope'])).toBeNull()
  })
})
