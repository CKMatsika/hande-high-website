import { motion, useReducedMotion } from 'motion/react'
import { Container } from '@/design-system/components/Container'
import { Heading } from '@/design-system/components/Heading'
import { MediaFrame } from '@/design-system/components/MediaFrame'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { school } from '@/content/school'

export function Welcome() {
  const reduce = useReducedMotion()
  const whileInView = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <section id="welcome" className="bg-white py-[var(--spacing-section)]">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div {...whileInView}>
          <Heading eyebrow="Headmaster's Welcome" level="h2">
            Welcome to {school.shortName}
          </Heading>
          {/* TODO: CONFIRM — replace with the Headmaster's signed message and portrait */}
          <p className="mt-6 leading-relaxed text-brand-700">
            It is my privilege to welcome you to our school. We are a community that values
            academic rigour, character and the wide breadth of opportunity that a school
            education should offer. I invite you to explore our website and, better still, to
            visit us and experience our campus and people first-hand.
          </p>
          <p className="mt-4 font-display text-lg italic text-brand-600">
            [HEADMASTER NAME] — Headmaster
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink to="/about" variant="primary">
              Read More
            </ButtonLink>
            <ButtonLink to="/about/vision-mission-values" variant="outline">
              Our Vision & Mission
            </ButtonLink>
          </div>
        </motion.div>
        <motion.div {...whileInView} className="order-first lg:order-last">
          <MediaFrame
            src="/img/photos/landscape-01.jpg"
            alt="Photograph of Hande High School"
            aspect="photo"
            className="shadow-2xl"
          />
        </motion.div>
      </Container>
    </section>
  )
}
