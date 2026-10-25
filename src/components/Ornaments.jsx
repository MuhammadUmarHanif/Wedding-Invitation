import { motion } from 'framer-motion'

/** Thin gold separator with a small lozenge and leaves. */
export function Divider({ className = '' }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`mx-auto h-5 w-48 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M4 12h86M150 12h86" />
      <path d="M120 3l8 9-8 9-8-9z" fill="currentColor" fillOpacity=".25" />
      <path d="M100 12c4-6 8-6 12 0-4 6-8 6-12 0zM128 12c4-6 8-6 12 0-4 6-8 6-12 0z" />
      <circle cx="94" cy="12" r="1.5" fill="currentColor" />
      <circle cx="146" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

/** Delicate floral sprig, mirrored for symmetric corners. */
export function FloralSprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`text-gold ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 114C30 90 52 62 64 30" />
      <path d="M24 96c-10-2-16-8-18-16 9 0 15 5 18 16zM36 82c-3-10 0-18 6-24 3 9 1 17-6 24zM46 66c-11-1-18-7-21-15 10-1 17 5 21 15zM56 48c-2-10 2-18 9-22 2 9-1 17-9 22z" />
      <circle cx="66" cy="24" r="6" />
      <circle cx="66" cy="24" r="2" fill="currentColor" />
      <path d="M66 18c0-5 3-9 6-10M72 24c5 0 9 3 10 6M60 24c-5 0-9-3-10-6" />
      <circle cx="80" cy="44" r="3.5" />
      <circle cx="30" cy="60" r="2.5" />
    </svg>
  )
}

/** Eight-point star medallion used on the doors and section headers. */
export function StarMedallion({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="22" y="22" width="56" height="56" strokeWidth="1.4" />
      <rect x="22" y="22" width="56" height="56" strokeWidth="1.4" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="14" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      <circle cx="50" cy="50" r="40" strokeWidth=".8" strokeDasharray="2 4" />
    </svg>
  )
}

/** Fades content in as it scrolls into view. MotionConfig handles reduced motion. */
export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, title, eyebrow, children, className = '' }) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`px-5 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-2xl">
        {title && (
          <Reveal className="mb-10 text-center">
            {eyebrow && <p className="mb-2 font-heading text-sm tracking-wide text-gold-deep">{eyebrow}</p>}
            <h2 id={headingId} className="font-heading text-3xl text-ink sm:text-4xl">
              {title}
            </h2>
            <Divider className="mt-4" />
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
