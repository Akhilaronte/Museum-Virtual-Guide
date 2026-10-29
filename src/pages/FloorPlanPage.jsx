import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import exhibits from '../data/exhibits.json'
import { rooms, findPath } from '../utils/pathfinding.js'
import { describeRoute } from '../utils/formatRoute.js'
import FloorPlan from '../components/FloorPlan.jsx'
import RouteDirections from '../components/RouteDirections.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function FloorPlanPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [startRoomId, setStartRoomId] = useState('entrance-hall')
  const [destinationExhibitId, setDestinationExhibitId] = useState(searchParams.get('to') || '')

  // Keep the chosen destination in the URL (?to=) so it survives refresh and is shareable.
  useEffect(() => {
    const params = {}
    if (destinationExhibitId) params.to = destinationExhibitId
    setSearchParams(params, { replace: true })
  }, [destinationExhibitId, setSearchParams])

  const destinationExhibit = useMemo(
    () => exhibits.find((e) => e.id === destinationExhibitId) || null,
    [destinationExhibitId],
  )
  const destinationRoomId = destinationExhibit ? destinationExhibit.roomId : null

  const path = useMemo(() => {
    if (!destinationRoomId) return null
    return findPath(rooms, startRoomId, destinationRoomId)
  }, [startRoomId, destinationRoomId])

  const route = useMemo(() => (path ? describeRoute(rooms, path) : null), [path])

  const handleSelectRoom = (roomId) => setStartRoomId(roomId)
  const reset = () => {
    setStartRoomId('entrance-hall')
    setDestinationExhibitId('')
  }

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li>Floor Plan</li>
          </ol>
        </nav>

        <div className="section-head">
          <div>
            <p className="eyebrow">Wayfinding</p>
            <h2>Museum Floor Plan</h2>
            <p className="lead">
              Pick where you are and what you want to see. We&apos;ll show you the shortest route, room by room.
            </p>
          </div>
        </div>

        <div className="floorplan-layout">
          <FloorPlan
            rooms={rooms}
            exhibits={exhibits}
            startRoomId={startRoomId}
            destinationRoomId={destinationRoomId}
            pathRoomIds={path || undefined}
            onSelectRoom={handleSelectRoom}
          />

          <div className="route-panel">
            <div className="route-controls">
              <h3>Plan your route</h3>
              <div className="field">
                <label htmlFor="start-room">Starting room</label>
                <select
                  id="start-room"
                  className="select"
                  value={startRoomId}
                  onChange={(e) => setStartRoomId(e.target.value)}
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}{r.isEntrance ? ' (entrance)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="dest-exhibit">Destination exhibit</label>
                <select
                  id="dest-exhibit"
                  className="select"
                  value={destinationExhibitId}
                  onChange={(e) => setDestinationExhibitId(e.target.value)}
                >
                  <option value="">Select an exhibit…</option>
                  {rooms.map((r) => {
                    const roomExhibits = exhibits.filter((e) => e.roomId === r.id)
                    if (roomExhibits.length === 0) return null
                    return (
                      <optgroup key={r.id} label={r.name}>
                        {roomExhibits.map((e) => (
                          <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                      </optgroup>
                    )
                  })}
                </select>
              </div>
              {(startRoomId !== 'entrance-hall' || destinationExhibitId) && (
                <button type="button" className="btn btn--ghost btn--small" onClick={reset}>
                  Reset
                </button>
              )}
              <p className="muted mb-0" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Tip: tap a room on the map to set it as your starting point.
              </p>
            </div>

            {!destinationExhibitId ? (
              <EmptyState
                icon="🧭"
                title="Choose a destination"
                message="Select an exhibit to visit and we'll calculate the route from your starting room."
              />
            ) : !path ? (
              <EmptyState
                icon="⚠"
                title="No route found"
                message="We couldn't find a path between these rooms. Try a different starting point."
                role="alert"
              />
            ) : route ? (
              <div className="route-controls" aria-live="polite">
                <div className="route-summary">
                  From <strong>{route.startRoom?.name}</strong> to{' '}
                  <strong>{route.endRoom?.name}</strong>
                </div>
                <p className="muted" style={{ marginTop: 0, marginBottom: '0.5rem' }}>
                  {route.totalRooms} {route.totalRooms === 1 ? 'room' : 'rooms'} ·{' '}
                  {route.steps.length} {route.steps.length === 1 ? 'step' : 'steps'}
                </p>
                <RouteDirections route={route} />
                {destinationExhibit && (
                  <p className="muted" style={{ marginTop: '0.75rem' }}>
                    Destination exhibit:{' '}
                    <Link to={`/exhibits/${destinationExhibit.id}`}>{destinationExhibit.name}</Link>
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
