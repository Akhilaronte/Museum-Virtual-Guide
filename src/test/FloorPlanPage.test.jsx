import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import FloorPlanPage from '../pages/FloorPlanPage.jsx'

function renderPlan(initial = ['/floor-plan']) {
  return render(
    <MemoryRouter initialEntries={initial}>
      <Routes>
        <Route path="/floor-plan" element={<FloorPlanPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

// The route summary's text is split across <strong> child elements, so a plain
// text matcher won't find it. Query the element directly and check textContent.
async function expectRouteSummary(text) {
  await waitFor(() => {
    const summary = document.querySelector('.route-summary')
    expect(summary).not.toBeNull()
    expect(summary.textContent).toMatch(new RegExp(text))
  })
}

describe('FloorPlanPage — route selection updates directions', () => {
  it('shows a prompt when no destination is selected', () => {
    renderPlan()
    expect(
      screen.getByRole('heading', { name: /Choose a destination/i }),
    ).toBeInTheDocument()
  })

  it('updates directions when a destination exhibit is selected', async () => {
    const user = userEvent.setup()
    renderPlan()

    await user.selectOptions(
      screen.getByRole('combobox', { name: /destination exhibit/i }),
      'the-mariners-astrolabe',
    )

    await expectRouteSummary('Science Pavilion')
    // The first step goes from the Entrance Hall to the Central Atrium.
    expect(
      screen.getByText(/head south to the Central Atrium/i),
    ).toBeInTheDocument()
  })

  it('handles the start room being the destination room', async () => {
    const user = userEvent.setup()
    renderPlan()

    await user.selectOptions(
      screen.getByRole('combobox', { name: /destination exhibit/i }),
      'the-mariners-astrolabe',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: /starting room/i }),
      'science',
    )

    expect(
      await screen.findByText(/already in the Science Pavilion/i),
    ).toBeInTheDocument()
  })

  it('reads the destination from the URL (?to=)', async () => {
    renderPlan(['/floor-plan?to=brass-orrery-of-the-inner-planets'])
    await expectRouteSummary('Science Pavilion')
  })
})
