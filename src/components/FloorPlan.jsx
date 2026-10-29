import { useMemo } from 'react'

// Wraps a room name into a few short lines so long labels fit inside a room box.
function wrapText(text, maxChars = 14) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length <= maxChars) {
      line = candidate
    } else {
      if (line) lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines.length ? lines : [text]
}

// Interactive museum floor plan rendered as inline SVG.
// Clicking or focusing + pressing Enter/Space on a room selects it as the start room.
export default function FloorPlan({
  rooms,
  exhibits,
  startRoomId,
  destinationRoomId,
  pathRoomIds,
  onSelectRoom,
}) {
  const pathSet = useMemo(() => new Set(pathRoomIds || []), [pathRoomIds])

  // Count exhibits per room, for the small dots.
  const exhibitsByRoom = useMemo(() => {
    const map = {}
    exhibits.forEach((e) => {
      if (!map[e.roomId]) map[e.roomId] = []
      map[e.roomId].push(e)
    })
    return map
  }, [exhibits])

  // Draw each undirected corridor once.
  const corridors = useMemo(() => {
    const drawn = new Set()
    const list = []
    rooms.forEach((room) => {
      ;(room.connectsTo || []).forEach((toId) => {
        const key = [room.id, toId].sort().join('|')
        if (drawn.has(key)) return
        drawn.add(key)
        const a = room
        const b = rooms.find((r) => r.id === toId)
        if (!b) return
        list.push({
          x1: a.x + a.w / 2,
          y1: a.y + a.h / 2,
          x2: b.x + b.w / 2,
          y2: b.y + b.h / 2,
        })
      })
    })
    return list
  }, [rooms])

  // Route overlay as a polyline through room centres.
  const routePoints = useMemo(() => {
    return (pathRoomIds || [])
      .map((id) => {
        const r = rooms.find((room) => room.id === id)
        return r ? `${r.x + r.w / 2},${r.y + r.h / 2}` : null
      })
      .filter(Boolean)
      .join(' ')
  }, [pathRoomIds, rooms])

  return (
    <div className="floorplan">
      <svg
        viewBox="0 0 680 560"
        role="img"
        aria-label="Interactive museum floor plan. Select a room as your starting point."
      >
        {/* Corridors between adjacent rooms */}
        {corridors.map((c, i) => (
          <line
            key={`corridor-${i}`}
            className="fp__corridor"
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
          />
        ))}

        {/* Rooms */}
        {rooms.map((room) => {
          const cx = room.x + room.w / 2
          const cy = room.y + room.h / 2
          let stateClass = ''
          if (room.id === startRoomId) stateClass = 'fp__room--start'
          else if (room.id === destinationRoomId) stateClass = 'fp__room--end'
          else if (pathSet.has(room.id)) stateClass = 'fp__room--path'

          const lines = wrapText(room.name, 14)
          const count = (exhibitsByRoom[room.id] || []).length
          const labelStartY = cy - ((lines.length - 1) * 16) / 2 - (count ? 6 : 0)
          const ariaLabel = `${room.name}. ${count} ${count === 1 ? 'exhibit' : 'exhibits'}. Select as starting room.`

          return (
            <g
              key={room.id}
              className={`fp__room ${stateClass}`}
              tabIndex={0}
              role="button"
              aria-label={ariaLabel}
              onClick={() => onSelectRoom(room.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectRoom(room.id)
                }
              }}
            >
              <rect x={room.x} y={room.y} width={room.w} height={room.h} rx={10} />
              {lines.map((ln, i) => (
                <text
                  key={i}
                  className="fp__label"
                  x={cx}
                  y={labelStartY + i * 16}
                  dominantBaseline="middle"
                >
                  {ln}
                </text>
              ))}
              {room.isEntrance && (
                <text
                  x={cx}
                  y={room.y + 14}
                  textAnchor="middle"
                  style={{ fontSize: 10, fill: '#4b6b3a' }}
                  aria-hidden="true"
                >
                  Entrance
                </text>
              )}
              {count > 0 && (
                <g aria-hidden="true">
                  {Array.from({ length: count }).map((_, i) => (
                    <circle
                      key={i}
                      className="fp__dot"
                      cx={cx - ((count - 1) * 11) / 2 + i * 11}
                      cy={room.y + room.h - 14}
                      r={3.2}
                    />
                  ))}
                </g>
              )}
            </g>
          )
        })}

        {/* Highlighted route overlay */}
        {pathRoomIds && pathRoomIds.length > 1 && (
          <polyline className="fp__route" points={routePoints} />
        )}
      </svg>

      <div className="fp__legend">
        <span>
          <span className="fp__swatch" style={{ background: '#cfe0d6', borderColor: '#4b6b3a' }} /> Starting room
        </span>
        <span>
          <span className="fp__swatch" style={{ background: '#f3e6cf', borderColor: '#a6743b' }} /> On route
        </span>
        <span>
          <span className="fp__swatch" style={{ background: '#f6d9cf', borderColor: '#7c5526' }} /> Destination
        </span>
        <span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c5526', display: 'inline-block' }} /> Exhibits in room
        </span>
      </div>
    </div>
  )
}
