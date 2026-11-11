import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { ButtonLink } from '@/design-system/components/ButtonLink'
import { Container } from '@/design-system/components/Container'
import { school } from '@/content/school'
import { featuredSchoolPhotos } from '@/content/photos'

export function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section className="relative bg-brand-950" aria-label="Welcome">
      <Container className="grid min-h-[calc(100svh-6rem)] items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.p
            {...fade(0)}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400"
          >
            {school.location}
          </motion.p>
          <motion.h1
            {...fade(0.1)}
            className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-white md:text-7xl"
          >
            {school.name}
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="mt-4 font-display text-xl italic text-brand-200 md:text-2xl"
          >
            {school.motto}
          </motion.p>
          <motion.p {...fade(0.3)} className="mt-8 max-w-xl text-lg leading-relaxed text-brand-100">
            A community of learning, character and opportunity — where every learner is known,
            challenged and prepared for the world ahead.
          </motion.p>
          <motion.div {...fade(0.4)} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/about" variant="accent" size="lg">
              Explore Our School
            </ButtonLink>
            <ButtonLink to="/admissions/apply" variant="outlineLight" size="lg">
              Apply for Admission
            </ButtonLink>
          </motion.div>
        </div>
        <figure className="order-first flex aspect-[4/3] items-center justify-center overflow-hidden bg-brand-950 lg:order-last">
          <img
            src={featuredSchoolPhotos.hero}
            alt="Hande High School bus on the school grounds"
            className="h-full w-full object-contain"
            fetchPriority="high"
          />
        </figure>
      </Container>

      <a
        href="#welcome"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 transition-colors hover:text-accent-400 lg:bottom-8"
        aria-label="Scroll to welcome section"
      >
        <ArrowDown aria-hidden="true" className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  )
}
