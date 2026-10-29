// Graph helpers for the museum floor plan.
// Rooms define an undirected adjacency graph via `connectsTo`. We run a plain
// breadth-first search to find the shortest path (fewest rooms) between two rooms.

import roomsData from '../data/rooms.json'

export const rooms = roomsData

export function buildGraph(rooms) {
  const graph = {}
  rooms.forEach((room) => {
    graph[room.id] = room.connectsTo || []
  })
  return graph
}

// Returns an array of room ids from `fromId` to `toId` inclusive, or null if no path exists.
export function findPath(rooms, fromId, toId) {
  if (!fromId || !toId) return null
  if (fromId === toId) return [fromId]

  const graph = buildGraph(rooms)
  if (!graph[fromId] || !graph[toId]) return null

  const queue = [fromId]
  const visited = { [fromId]: true }
  const prev = {}

  while (queue.length > 0) {
    const current = queue.shift()
    const neighbors = graph[current] || []
    for (const next of neighbors) {
      if (visited[next]) continue
      visited[next] = true
      prev[next] = current
      if (next === toId) {
        const path = [toId]
        let cursor = toId
        while (prev[cursor] !== undefined) {
          path.unshift(prev[cursor])
          cursor = prev[cursor]
        }
        return path
      }
      queue.push(next)
    }
  }
  return null
}

// Returns the room object for a given id.
export function getRoomById(rooms, id) {
  return rooms.find((room) => room.id === id) || null
}

// Returns the room that hosts a given exhibit.
export function getRoomForExhibit(rooms, exhibit) {
  if (!exhibit) return null
  return getRoomById(rooms, exhibit.roomId)
}

export default { rooms, buildGraph, findPath, getRoomById, getRoomForExhibit }
