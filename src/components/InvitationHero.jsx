import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { invitation } from '../config/invitation.js'
import { formatDate, formatTime } from '../utils/format.js'

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
})

const SHADOW = '[text-shadow:0_2px_14px_rgba(20,10,0,.85)]'

/** Text laid over the open doorway once the doors have opened. */
export default function InvitationHero() {
  const { couple, hero, event, opening } = invitation
  const date = formatDate(event.start, event.timeZone)
  const time = formatTime(event.start, event.timeZone)

  return (
    <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white ${SHADOW}`}>
      <motion.div {...rise(0.1)} className="flex items-center gap-2 font-heading text-sm sm:text-base text-[#f6ead0]">
        <span>{opening.titleAr}</span>
        <span className="text-gold/80">•</span>
        <span className="tracking-widest uppercase font-serif text-xs sm:text-sm">{opening.titleEn}</span>
      </motion.div>

      <motion.h1 {...rise(0.3)} className="mt-4 font-names text-6xl sm:text-7xl md:text-8xl leading-tight">
        <span>{couple.groom}</span> <br></br>
        <span className="mx-3 text-4xl sm:text-5xl text-[#f4e3b5]"></span>
        <span>{couple.bride}</span>
      </motion.h1>

      <motion.p {...rise(0.4)} className="font-serif text-lg sm:text-xl font-medium tracking-wide text-white/90">
        {couple.groomLatin} <span className="text-gold font-light">&</span> {couple.brideLatin}
      </motion.p>

      <motion.div {...rise(0.6)} className="mt-5 space-y-1 font-heading text-base sm:text-lg text-[#f6ead0]">
        {date && (
          <p>
            <time dateTime={event.start}>{date}</time>
          </p>
        )}
        {time && <p>الساعة {time} • At 7:00 PM</p>}
      </motion.div>

      {/* Bilingual Message (Arabic + English) */}
      <motion.div {...rise(0.8)} className="mx-auto mt-6 max-w-xl space-y-2">
        <p className="font-body text-xl sm:text-2xl leading-relaxed text-white">
          {hero.messageAr}
        </p>
        <p className="font-serif italic text-sm sm:text-base leading-relaxed text-white/85">
          {hero.messageEn}
        </p>
      </motion.div>

      {/* Bilingual Scroll Cue (Arabic + English) */}
      <motion.a
        {...rise(1.0)}
        href="#verse"
        className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-1 rounded-full px-5 py-2 font-heading text-sm sm:text-base text-[#f6ead0] transition hover:text-white"
      >
        <span className="flex items-center gap-1.5">
          <span>{hero.scrollCueAr}</span>
          <span className="text-gold/80">•</span>
          <span className="font-serif text-xs uppercase tracking-wider">{hero.scrollCueEn}</span>
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </motion.a>
    </div>
  )
}
