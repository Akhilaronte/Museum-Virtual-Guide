import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Exhibits from './pages/Exhibits.jsx'
import ExhibitDetail from './pages/ExhibitDetail.jsx'
import FloorPlanPage from './pages/FloorPlanPage.jsx'
import VisitorGuide from './pages/VisitorGuide.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exhibits" element={<Exhibits />} />
          <Route path="/exhibits/:id" element={<ExhibitDetail />} />
          <Route path="/floor-plan" element={<FloorPlanPage />} />
          <Route path="/guide" element={<VisitorGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
