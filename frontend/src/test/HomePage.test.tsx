import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import HomePage from '@/pages/HomePage'

describe('HomePage', () => {
  it('renders all homepage sections', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hande High School')
    expect(screen.getByRole('heading', { name: /welcome to hande high/i })).toBeInTheDocument()
    expect(screen.getByText(/headmaster's welcome/i)).toBeInTheDocument()
    expect(screen.getByText(/discover our school/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /latest announcements/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /begin your family/i })).toBeInTheDocument()
  })
})
