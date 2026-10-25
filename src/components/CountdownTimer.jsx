import { invitation } from '../config/invitation.js'
import { useCountdown } from '../hooks/useCountdown.js'
import { toArabicDigits } from '../utils/format.js'
import { Reveal, Section } from './Ornaments.jsx'

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
]

export default function CountdownTimer() {
  const remaining = useCountdown(invitation.event.start)

  return (
    <Section id="countdown" title="The Big Day" eyebrow="Counting Down The Moments" className="bg-cream/60">
      {remaining.status === 'invalid' && (
        <p className="text-center text-lg text-ink-soft">The wedding date will be announced soon.</p>
      )}
      {remaining.status === 'done' && (
        <Reveal className="text-center">
          <p className="font-heading text-2xl text-gold-deep">The Wedding Celebration Has Begun!</p>
          <p className="mt-2 text-lg text-ink-soft">Thank you for sharing this joyous day with us.</p>
        </Reveal>
      )}
      {(remaining.status === 'running' || remaining.status === 'pending') && (
        <Reveal>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto" role="timer" aria-label="Countdown until wedding">
            {UNITS.map(([key, label]) => (
              <div key={key} className="flex flex-col items-center rounded-xl border border-gold/40 bg-ivory/80 px-2 py-6 shadow-sm">
                <span className="font-heading text-3xl sm:text-5xl font-bold tabular-nums text-ink" aria-hidden={key === 'seconds'}>
                  {remaining.status === 'running' ? toArabicDigits(String(remaining[key]).padStart(2, '0')) : toArabicDigits('00')}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-deep">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
