import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { invitation } from './config/invitation.js'
import DoorOpening from './components/DoorOpening.jsx'
import InvitationHero from './components/InvitationHero.jsx'
import WeddingDetails, { Verse } from './components/WeddingDetails.jsx'
import CountdownTimer from './components/CountdownTimer.jsx'
import EventSchedule from './components/EventSchedule.jsx'
import VenueSection from './components/VenueSection.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import RSVPForm from './components/RSVPForm.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import InvitationFooter from './components/InvitationFooter.jsx'

const c = invitation.colors
const themeVars = {
  '--color-ivory': c.ivory,
  '--color-cream': c.cream,
  '--color-champagne': c.champagne,
  '--color-gold': c.gold,
  '--color-gold-deep': c.goldDeep,
  '--color-ink': c.ink,
  '--color-ink-soft': c.inkSoft,
  '--color-door': c.door,
  '--color-door-deep': c.doorDeep,
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [musicStart, setMusicStart] = useState(1)

  return (
    <MotionConfig reducedMotion="user">
      <div style={themeVars} className="min-h-svh bg-ivory text-ink">
        <a href="#details" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-2">
          تخطَّ إلى تفاصيل الدعوة
        </a>

        <header>
          <DoorOpening
            onInteraction={() => setMusicStart((n) => n + 1)}
            onOpened={() => setOpened(true)}
          >
            <InvitationHero />
          </DoorOpening>
        </header>

        <main aria-hidden={!opened} inert={!opened}>
          <Verse />
          <WeddingDetails />
          <CountdownTimer />
          <EventSchedule />
          <VenueSection />
          <SaveTheDate />
          <RSVPForm />
        </main>
        <InvitationFooter />
        <MusicPlayer startSignal={musicStart} />
      </div>
    </MotionConfig>
  )
}
