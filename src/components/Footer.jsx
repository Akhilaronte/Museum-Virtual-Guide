import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__about">
            <h4>{siteConfig.museumFullName}</h4>
            <p>{siteConfig.tagline}</p>
            <p>{siteConfig.about}</p>
            <p className="muted">{siteConfig.sampleNotice}</p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="footer__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/exhibits">Exhibits</Link></li>
              <li><Link to="/floor-plan">Floor Plan</Link></li>
              <li><Link to="/guide">Visitor Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact &amp; Project</h4>
            <ul className="footer__list">
              <li>
                <a href={siteConfig.repoUrl} target="_blank" rel="noreferrer noopener">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href={`${siteConfig.repoUrl}/issues`} target="_blank" rel="noreferrer noopener">
                  Report an Issue
                </a>
              </li>
              <li className="muted">Learning project — sample content, no real contact details.</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {siteConfig.museumFullName}. Sample project.</span>
          <span>Built with React + Vite.</span>
        </div>
      </div>
    </footer>
  )
}
