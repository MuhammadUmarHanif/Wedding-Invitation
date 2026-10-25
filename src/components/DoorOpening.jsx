import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { invitation } from '../config/invitation.js'
import { playKnock } from '../utils/knock.js'
import FallingBlossoms from './scene/FallingBlossoms.jsx'

const MAX_KNOCKS = 3
// Pigeons finish their flight around 3.8s, where names smoothly emerge
const PIGEONS_END_AT = 3.8

export default function DoorOpening({ onOpenStart, onOpened, onInteraction, children }) {
  const [knocks, setKnocks] = useState(0)
  const [phase, setPhase] = useState('closed') // 'closed' | 'opening' | 'open'
  const [ripples, setRipples] = useState([])
  const [isBumping, setIsBumping] = useState(false)
  const [showPigeonNames, setShowPigeonNames] = useState(false)

  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const bumpTimer = useRef(null)
  const pigeonTimer = useRef(null)

  // Lock page scrolling while door is closed or opening
  useEffect(() => {
    if (phase === 'open') return
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [phase])

  // Pre-load video and pause at the first frame
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.pause()
    }
    return () => {
      clearTimeout(bumpTimer.current)
      clearTimeout(pigeonTimer.current)
    }
  }, [])

  const finishOpening = useCallback(() => {
    if (phase === 'open') return
    setPhase('open')
    setShowPigeonNames(true)
    onOpened?.()
  }, [phase, onOpened])

  const startVideoPlayback = useCallback(() => {
    const video = videoRef.current
    if (!video) {
      finishOpening()
      return
    }

    // Schedule names reveal right as the pigeons finish flying (~3.8s)
    pigeonTimer.current = setTimeout(() => {
      setShowPigeonNames(true)
    }, PIGEONS_END_AT * 1000)

    video.currentTime = 0
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: If autoplay with sound is blocked, mute and retry
        video.muted = true
        video.play().catch(() => {
          finishOpening()
        })
      })
    }
  }, [finishOpening])

  // Monitor video playback time so names appear right when pigeons finish flying
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video && video.currentTime >= PIGEONS_END_AT && !showPigeonNames) {
      setShowPigeonNames(true)
    }
  }

  const handleTap = (e) => {
    if (phase !== 'closed' || knocks >= MAX_KNOCKS) return

    // Calculate ripple position
    const rect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? (rect.left + rect.width / 2)
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? (rect.top + rect.height / 2)
    const x = clientX - rect.left
    const y = clientY - rect.top

    const rippleId = `${Date.now()}-${Math.random()}`
    setRipples((prev) => [...prev, { id: rippleId, x, y }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId))
    }, 750)

    // Bump animation
    setIsBumping(true)
    clearTimeout(bumpTimer.current)
    bumpTimer.current = setTimeout(() => setIsBumping(false), 350)

    // Sound effect
    playKnock()

    if (knocks === 0) {
      onInteraction?.()
    }

    const next = knocks + 1
    setKnocks(next)

    // Trigger opening when reaching 3 knocks
    if (next >= MAX_KNOCKS) {
      onOpenStart?.()
      setPhase('opening')
      startVideoPlayback()
    }
  }

  const isClosed = phase === 'closed'
  const isOpening = phase === 'opening'
  const isOpen = phase === 'open'

  return (
    <section
      ref={containerRef}
      aria-label={invitation.event.title}
      onClick={isClosed ? handleTap : undefined}
      className={`relative h-svh w-full overflow-hidden select-none ${
        isClosed ? 'cursor-pointer' : ''
      }`}
    >
      {/* Background Video (Door Opening Animation & Flying Pigeons) */}
      <div
        className={`absolute inset-0 h-full w-full transition-transform duration-300 ${
          isBumping ? 'door-bump' : ''
        }`}
      >
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}assets/door-opening.mp4`}
          playsInline
          muted
          webkit-playsinline="true"
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={finishOpening}
          onError={() => {
            finishOpening()
          }}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Tap Ripple Layer */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="tap-ripple"
            style={{ left: `${r.x}px`, top: `${r.y}px` }}
          />
        ))}
      </div>

      {/* Cinematic Vignette Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-1000"
        style={{
          background: isOpen
            ? 'linear-gradient(to bottom, rgba(20,12,6,0.6) 0%, rgba(20,12,6,0.35) 40%, rgba(20,12,6,0.7) 100%)'
            : isOpening
            ? 'linear-gradient(180deg, rgba(20,12,6,0.25) 0%, transparent 40%, rgba(20,12,6,0.5) 100%)'
            : 'linear-gradient(180deg, rgba(30,18,8,0.3) 0%, rgba(20,12,6,0.1) 40%, rgba(20,12,6,0.65) 100%)',
        }}
      />

      {/* Door Knock Prompt UI (Shown while door is closed) */}
      <AnimatePresence>
        {isClosed && (
          <motion.div
            key="knock-ui"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-x-0 bottom-[10%] z-20 px-6 text-center"
          >
            {/* Name ONLY in Arabic */}
            <h1 className="font-names text-6xl sm:text-7xl md:text-8xl text-white font-bold leading-tight [text-shadow:0_3px_20px_rgba(0,0,0,.95)]">
              {invitation.couple.groom}{' '} <br></br>
              <span className="text-4xl sm:text-5xl text-[#f4e3b5]"></span>{' '}
              {invitation.couple.bride}
            </h1>

            {/* Tap instruction in BOTH Arabic and English */}
            <p className="mt-3 font-heading text-xl sm:text-2xl font-bold text-[#fdf7e7] [text-shadow:0_2px_12px_rgba(0,0,0,.9)]">
              {invitation.opening.hintAr}
            </p>
            <p className="mt-1 font-heading text-sm sm:text-base text-[#f6ead0]/90 tracking-wider [text-shadow:0_1px_8px_rgba(0,0,0,.85)]">
              {invitation.opening.hintEn}
            </p>

            {/* 3 Knock Progress Dots */}
            <div className="mt-5 flex justify-center items-center gap-4" aria-hidden="true">
              {Array.from({ length: MAX_KNOCKS }, (_, i) => {
                const isHit = i < knocks
                return (
                  <motion.span
                    key={i}
                    className="h-4 w-4 rounded-full border-2 border-[#f4e3b5] transition-all duration-300"
                    style={{
                      backgroundColor: isHit ? '#f4e3b5' : 'transparent',
                      boxShadow: isHit
                        ? '0 0 16px 2px rgba(244, 227, 181, 0.95)'
                        : '0 2px 8px rgba(0,0,0,0.6)',
                    }}
                    animate={{
                      scale: i === knocks - 1 ? [1, 1.45, 1.15] : isHit ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )
              })}
            </div>

            <p className="mt-3 text-xs tracking-wider text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,.8)]">
              {invitation.opening.tapPromptAr} • {invitation.opening.tapPromptEn}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Names Reveal in Arabic ONLY, appearing as pigeons finish their flight */}
      <AnimatePresence>
        {isOpening && showPigeonNames && (
          <motion.div
            key="pigeon-names-arabic"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center text-white"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-heading text-lg sm:text-2xl text-[#f6ead0] [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]"
            >
              {invitation.opening.title}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 1 }}
              className="mt-4 font-names text-7xl sm:text-7xl md:text-8xl text-white font-bold leading-tight [text-shadow:0_4px_30px_rgba(0,0,0,0.95)]"
            >
              <span>{invitation.couple.groom}</span><br/>
              <span className="mx-3 text-4xl sm:text-5xl text-[#f4e3b5]"></span>
              <span>{invitation.couple.bride}</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opened State Content: Falling Blossoms + Invitation Hero */}
      {isOpen && (
        <div className="relative z-20 h-full w-full">
          <FallingBlossoms />
          {children}
        </div>
      )}

      {/* Screen Reader Announcements */}
      <p className="sr-only" aria-live="polite">
        {isOpen
          ? 'فُتح الباب وظهرت تفاصيل الدعوة'
          : knocks > 0
          ? `طرقة ${knocks} من ${MAX_KNOCKS}`
          : 'دُقّوا على الباب ثلاث مرات'}
      </p>
    </section>
  )
}
