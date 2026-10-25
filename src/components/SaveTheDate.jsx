import { CalendarPlus, Download } from 'lucide-react'
import { invitation } from '../config/invitation.js'
import { downloadIcs, googleCalendarUrl } from '../utils/calendar.js'
import { toArabicDigits } from '../utils/format.js'
import { Reveal, Section } from './Ornaments.jsx'

export default function SaveTheDate() {
  const { event, venue } = invitation
  const gcal = googleCalendarUrl(event, venue)

  return (
    <Section id="save-the-date" title="Save The Date" eyebrow="Add To Your Calendar">
      <Reveal className="mx-auto max-w-xs rounded-2xl overflow-hidden border border-gold/50 bg-ivory text-center shadow-[0_20px_40px_-24px_rgba(61,49,39,.35)]">
        <p className="border-b border-gold/40 bg-champagne/60 py-3 font-heading text-base font-bold tracking-widest text-ink uppercase">
          December {toArabicDigits('2026')}
        </p>
        <div className="py-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Friday</p>
          <p className="font-heading text-7xl font-bold leading-tight text-gold-deep my-1">
            {toArabicDigits('18')}
          </p>
          <p className="text-sm text-ink-soft font-medium">At {toArabicDigits('7')}:{toArabicDigits('00')} PM</p>
        </div>
      </Reveal>

      <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={gcal} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full">
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Add to Google Calendar
        </a>
        <button type="button" onClick={() => downloadIcs(event, venue)} className="btn-outline rounded-full">
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Calendar File (Apple / Outlook)
        </button>
      </Reveal>
    </Section>
  )
}
