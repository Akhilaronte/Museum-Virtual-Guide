// Turns a path of room ids into friendly, step-by-step directions.
import { getRoomById } from './pathfinding'

// Rough cardinal direction from one room's centre to the next, using their SVG rectangles.
function directionBetween(fromRoom, toRoom) {
  const fx = fromRoom.x + fromRoom.w / 2
  const fy = fromRoom.y + fromRoom.h / 2
  const tx = toRoom.x + toRoom.w / 2
  const ty = toRoom.y + toRoom.h / 2
  const dx = tx - fx
  const dy = ty - fy

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx > 0 ? 'east' : 'west'
  }
  return dy > 0 ? 'south' : 'north'
}

// Returns { steps: [{n, text}], totalRooms } or null for an invalid/empty path.
export function describeRoute(rooms, path) {
  if (!path || path.length === 0) return null
  if (path.length === 1) {
    const room = getRoomById(rooms, path[0])
    return {
      startRoom: room,
      endRoom: room,
      steps: [{ n: 1, text: `You are already in the ${room ? room.name : 'selected room'}.` }],
      totalRooms: 1,
    }
  }

  const steps = []
  for (let i = 0; i < path.length - 1; i += 1) {
    const fromRoom = getRoomById(rooms, path[i])
    const toRoom = getRoomById(rooms, path[i + 1])
    if (!fromRoom || !toRoom) return null
    const dir = directionBetween(fromRoom, toRoom)
    steps.push({
      n: i + 1,
      text: `From the ${fromRoom.name}, head ${dir} to the ${toRoom.name}.`,
    })
  }

  const startRoom = getRoomById(rooms, path[0])
  const endRoom = getRoomById(rooms, path[path.length - 1])
  return {
    startRoom,
    endRoom,
    steps,
    totalRooms: path.length,
  }
}

export default describeRoute
