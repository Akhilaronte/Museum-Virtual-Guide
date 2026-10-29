import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ExhibitDetail from '../pages/ExhibitDetail.jsx'

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/exhibits/${id}`]}>
      <Routes>
        <Route path="/exhibits/:id" element={<ExhibitDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ExhibitDetail', () => {
  it('shows the correct selected exhibit and its room', () => {
    renderDetail('sun-disk-of-aravia')
    expect(
      screen.getByRole('heading', { name: /The Sun Disk of Aravia/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Egyptian Wing/)).toBeInTheDocument()
    expect(screen.getByText(/Interesting facts/i)).toBeInTheDocument()
  })

  it('links to the floor plan with the exhibit as destination', () => {
    renderDetail('sun-disk-of-aravia')
    const link = screen.getByRole('link', { name: /Find on floor plan/i })
    expect(link).toHaveAttribute('href', '/floor-plan?to=sun-disk-of-aravia')
  })

  it('shows a not-found state for an invalid exhibit id', () => {
    renderDetail('does-not-exist')
    expect(
      screen.getByRole('heading', { name: /Exhibit not found/i }),
    ).toBeInTheDocument()
  })
})
