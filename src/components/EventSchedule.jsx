import { invitation } from '../config/invitation.js'
import { toArabicDigits } from '../utils/format.js'
import { Reveal, Section } from './Ornaments.jsx'

function formatClockWithArabicDigits(hhmm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm ?? '')
  if (!match) return ''
  const h = Number(match[1])
  const period = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 || 12
  return `${toArabicDigits(h12)}:${toArabicDigits(match[2])} ${period}`
}

export default function EventSchedule({ events = invitation.schedule }) {
  if (!events?.length) return null

  return (
    <Section id="schedule" title="Event Schedule" eyebrow="Evening Timeline">
      <ol className="relative mx-auto max-w-md border-s border-gold/50 ps-8">
        {events.map((item, i) => {
          const start = formatClockWithArabicDigits(item.start)
          const end = item.end ? formatClockWithArabicDigits(item.end) : null
          return (
            <Reveal as="li" key={`${item.name}-${i}`} delay={i * 0.08} className="relative pb-10 last:pb-0">
              <span
                className="absolute -start-[2.42rem] top-1.5 h-3 w-3 rotate-45 border border-gold bg-ivory"
                aria-hidden="true"
              />
              <p className="font-heading text-sm font-semibold tracking-wider text-gold-deep uppercase">
                {start}
                {end && ` — ${end}`}
              </p>
              <h3 className="mt-1 font-heading text-xl sm:text-2xl font-bold text-ink">{item.name}</h3>
              {item.description && <p className="mt-1 text-base text-ink-soft leading-relaxed">{item.description}</p>}
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
