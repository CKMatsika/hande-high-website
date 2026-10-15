import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Container } from '@/design-system/components/Container'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { usePageMeta } from '@/lib/usePageMeta'
import { useGallery } from '@/lib/useContent'
import { school } from '@/content/school'

export default function GalleryPage() {
  const { photos } = useGallery()
  const [index, setIndex] = useState<number | null>(null)

  usePageMeta({
    title: `Gallery — ${school.name}`,
    description: `Photographs of ${school.name}, Nyashanu, Buhera.`,
  })

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, prev, next])

  const current = index === null ? null : photos[index]

  return (
    <>
      <PageHero eyebrow="Gallery" title="School Gallery" image="/img/photos/landscape-04.jpg" />
      <section className="bg-white py-[var(--spacing-section)]">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo, i) => (
              <li key={`${photo.src}-${i}`}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                  aria-label={`View photograph ${i + 1} of ${photos.length}`}
                >
                  <MediaFrame
                    src={photo.src}
                    alt={photo.alt}
                    aspect="square"
                    className="shadow-sm transition-shadow group-hover:shadow-lg"
                  />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-brand-500">
            More photographs — including video — will be added as the school supplies them.
          </p>
        </Container>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph ${index! + 1} of ${photos.length}`}
          className="fixed inset-0 z-[80] grid place-items-center bg-brand-950/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full p-2 text-white hover:bg-white/10"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous photograph"
            className="absolute left-4 rounded-full p-3 text-white hover:bg-white/10"
          >
            <ChevronLeft aria-hidden="true" className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next photograph"
            className="absolute right-4 rounded-full p-3 text-white hover:bg-white/10"
          >
            <ChevronRight aria-hidden="true" className="h-8 w-8" />
          </button>
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
