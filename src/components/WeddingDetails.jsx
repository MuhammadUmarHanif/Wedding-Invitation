import { CalendarDays, Clock } from 'lucide-react'
import { invitation } from '../config/invitation.js'
import { toArabicDigits } from '../utils/format.js'
import { Divider, Reveal, Section, StarMedallion } from './Ornaments.jsx'

function FamilyCard({ family, delay }) {
  return (
    <Reveal delay={delay} className="flex-1 rounded-2xl border border-gold/40 bg-ivory/80 px-6 py-8 text-center shadow-sm">
      <h3 className="font-heading text-xl font-bold tracking-wide text-gold-deep">{family.title}</h3>
      <ul className="mt-4 space-y-1.5 text-lg leading-relaxed text-ink">
        {family.names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </Reveal>
  )
}

export function Verse() {
  const { verse } = invitation
  return (
    <section id="verse" aria-label="Quranic Verse" className="px-5 py-20 text-center bg-ivory">
      <Reveal className="mx-auto max-w-3xl">
        <StarMedallion className="mx-auto mb-6 h-12 w-12 text-gold" />
        <p className="font-heading text-sm sm:text-base text-gold-deep mb-4" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Holy Quran Arabic Verse */}
        <blockquote className="my-6">
          <p className="font-quran text-2xl sm:text-3xl md:text-4xl leading-[2.4] text-ink" dir="rtl">
            ﴿ {verse.arabic} ﴾
          </p>
          <footer className="mt-3 text-base font-heading text-gold-deep" dir="rtl">
            {verse.referenceAr}
          </footer>
        </blockquote>

        <div className="mx-auto my-8 h-px w-36 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-start">
          {/* Urdu Translation */}
          <div className="rounded-2xl border border-gold/30 bg-cream/40 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-block text-xs uppercase tracking-wider text-gold-deep font-bold mb-3">
                اردو ترجمہ (Urdu Translation)
              </span>
              <p className="font-body text-xl sm:text-2xl leading-[2.2] text-ink text-right" dir="rtl">
                "{verse.urdu}"
              </p>
            </div>
            <p className="mt-4 text-sm font-semibold text-gold-deep text-right" dir="rtl">
              — {verse.referenceUrdu}
            </p>
          </div>

          {/* English Translation */}
          <div className="rounded-2xl border border-gold/30 bg-cream/40 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-block text-xs uppercase tracking-wider text-gold-deep font-bold mb-3">
                English Translation
              </span>
              <p className="font-serif italic text-lg sm:text-xl leading-relaxed text-ink">
                "{verse.english}"
              </p>
            </div>
            <p className="mt-4 text-sm font-semibold text-gold-deep">
              — {verse.referenceEng}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function WeddingDetails() {
  const { families, details } = invitation

  return (
    <Section id="details" title={details.title} eyebrow={details.eyebrow}>
      <Reveal>
        <p className="text-center text-xl sm:text-2xl leading-relaxed text-ink max-w-2xl mx-auto">
          {details.message}
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row max-w-2xl mx-auto">
        <FamilyCard family={families.groom} delay={0.05} />
        <FamilyCard family={families.bride} delay={0.15} />
      </div>

      <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 text-lg text-ink sm:flex-row sm:gap-10">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-gold" aria-hidden="true" />
          <span>Friday, {toArabicDigits('18')} December {toArabicDigits('2026')}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
          <span>At {toArabicDigits('7')}:{toArabicDigits('00')} PM</span>
        </p>
      </Reveal>

      {details.ceremony && (
        <Reveal className="mt-8 text-center">
          <Divider />
          <p className="mt-4 text-base italic text-ink-soft">{details.ceremony}</p>
        </Reveal>
      )}
    </Section>
  )
}
