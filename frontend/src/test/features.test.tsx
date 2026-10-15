import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { WhatsAppButton } from '@/components/site/WhatsAppButton'
import { VideoEmbed } from '@/design-system/components/VideoEmbed'
import { whatsappAvailable, whatsappLink } from '@/lib/contact'

vi.mock('@/lib/useScrolled', () => ({ useScrolled: () => false }))

describe('whatsappLink', () => {
  it('strips non-digits and encodes the message', () => {
    const link = whatsappLink('+263 774 862 592', 'Hello there')
    expect(link).toBe('https://wa.me/263774862592?text=Hello%20there')
  })

  it('omits the query when there is no message', () => {
    expect(whatsappLink('263774862592', '')).toBe('https://wa.me/263774862592')
  })
})

describe('WhatsAppButton', () => {
  it('is available and links to wa.me', () => {
    expect(whatsappAvailable).toBe(true)
    render(
      <MemoryRouter>
        <WhatsAppButton />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /whatsapp/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/'))
  })
})

describe('VideoEmbed', () => {
  it('embeds a YouTube link via the privacy-friendly player', () => {
    render(<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Tour" />)
    const frame = screen.getByTitle('Tour')
    expect(frame.tagName).toBe('IFRAME')
    expect(frame).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    )
  })

  it('embeds a Vimeo link', () => {
    render(<VideoEmbed url="https://vimeo.com/123456789" title="Tour" />)
    expect(screen.getByTitle('Tour')).toHaveAttribute('src', 'https://player.vimeo.com/video/123456789')
  })

  it('falls back to a native player for direct files', () => {
    render(<VideoEmbed url="/media/school-tour.mp4" title="Tour" />)
    const video = screen.getByTitle('Tour')
    expect(video.tagName).toBe('VIDEO')
  })
})
