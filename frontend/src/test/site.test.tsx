import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/site/Header'
import { Button } from '@/design-system/components/Button'

vi.mock('@/lib/useScrolled', () => ({ useScrolled: () => false }))

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

describe('Button', () => {
  it('renders with the primary variant by default', () => {
    render(<Button>Apply</Button>)
    expect(screen.getByRole('button', { name: 'Apply' })).toHaveClass('bg-brand-700')
  })
})

describe('Header', () => {
  it('renders the primary navigation', () => {
    renderHeader()
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toHaveTextContent('About')
    expect(nav).toHaveTextContent('Admissions')
    expect(nav).toHaveTextContent('Gallery')
    expect(nav).toHaveTextContent('Contact')
  })

  it('toggles the mobile menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
  })
})
