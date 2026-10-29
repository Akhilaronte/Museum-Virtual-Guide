import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Exhibits from '../pages/Exhibits.jsx'

function renderExhibits(initial = ['/exhibits']) {
  return render(
    <MemoryRouter initialEntries={initial}>
      <Routes>
        <Route path="/exhibits" element={<Exhibits />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Exhibits page', () => {
  it('renders exhibit cards after loading', async () => {
    renderExhibits()
    expect(await screen.findByText(/The Sun Disk of Aravia/i)).toBeInTheDocument()
    expect(await screen.findByText(/Crested Lizard Fossil/i)).toBeInTheDocument()
  })

  it('filters by search and category together', async () => {
    const user = userEvent.setup()
    renderExhibits()
    await screen.findByText(/The Sun Disk of Aravia/i)

    await user.type(screen.getByLabelText(/search exhibits/i), 'orrery')
    await user.click(screen.getByRole('button', { name: /^Science & Technology$/ }))

    expect(await screen.findByText(/Brass Orrery/i)).toBeInTheDocument()
    expect(screen.queryByText(/Crested Lizard/i)).not.toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup()
    renderExhibits()
    await screen.findByText(/The Sun Disk of Aravia/i)

    await user.type(screen.getByLabelText(/search exhibits/i), 'zzzznothingmatches')

    expect(await screen.findByRole('heading', { name: /no exhibits found/i })).toBeInTheDocument()
    expect(screen.queryByText(/Brass Orrery/i)).not.toBeInTheDocument()
  })

  it('restores search state from the URL', async () => {
    renderExhibits(['/exhibits?q=ammonite&category=Natural%20History'])
    expect(await screen.findByText(/The Ammonite Collection/i)).toBeInTheDocument()
    expect(screen.queryByText(/The Sun Disk of Aravia/i)).not.toBeInTheDocument()
  })
})
