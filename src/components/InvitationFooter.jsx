import { invitation } from '../config/invitation.js'
import { safeHttpsUrl } from '../utils/validation.js'
import { Divider, FloralSprig, Reveal } from './Ornaments.jsx'

export default function InvitationFooter() {
  const { couple, closing, brand } = invitation
  const social = safeHttpsUrl(brand.socialUrl)

  return (
    <footer className="relative overflow-hidden px-5 pb-24 pt-16 text-center">
      <FloralSprig className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 opacity-40" flip />
      <FloralSprig className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 opacity-40" />
      <Reveal>
        <p className="text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-lg mx-auto">{closing}</p>
        {/* <h2 className="mt-6 font-serif text-5xl sm:text-6xl font-bold text-ink">
          <span>{couple.groomLatin}</span>
          <span className="font-light text-gold text-3xl sm:text-4xl mx-3">&</span>
          <span>{couple.brideLatin}</span>
        </h2> */}
        <p className="mt-1 font-names text-6xl text-gold-deep">
          {couple.groom} <br />  {couple.bride}
        </p>
        <Divider className="mt-6" />
        <p className="mt-6 text-sm text-ink-soft">{brand.attribution}</p>
        {social && (
          <a href={social} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-gold-deep underline underline-offset-4">
            {brand.socialLabel}
          </a>
        )}
      </Reveal>
    </footer>
  )
}
