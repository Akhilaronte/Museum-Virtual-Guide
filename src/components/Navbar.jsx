import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/exhibits', label: 'Exhibits', end: false },
  { to: '/floor-plan', label: 'Floor Plan', end: false },
  { to: '/guide', label: 'Visitor Guide', end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label={`${siteConfig.museumName} home`}>
          <span className="navbar__brand-mark" aria-hidden="true">A</span>
          <span>{siteConfig.museumName}</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar__toggle-icon" aria-hidden="true" />
        </button>

        <nav id="primary-nav" aria-label="Primary navigation">
          <ul className={`navbar__links ${open ? 'is-open' : ''}`}>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
