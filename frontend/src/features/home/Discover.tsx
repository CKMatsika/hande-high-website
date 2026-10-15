import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { discoverCards } from '@/content/discover'

export function Discover() {
  const reduce = useReducedMotion()
  return (
    <section className="bg-brand-50 py-[var(--spacing-section)]">
      <Container>
        <Heading eyebrow="Discover Our School" level="h2" className="max-w-2xl">
          A breadth of opportunity, in and beyond the classroom
        </Heading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {discoverCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={reduce ? undefined : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={card.to}
                className="group block h-full bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <MediaFrame src={card.image} alt="" aspect="video" />
                <div className="p-6">
                  <h3 className="font-display text-xl text-brand-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-600">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
