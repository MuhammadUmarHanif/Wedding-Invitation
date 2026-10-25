import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { invitation } from '../config/invitation.js'

/**
 * Compact floating audio control for Asma-ul-Husna (Atif Aslam).
 * Starts playing right from the entrance/door page upon page load or first tap.
 */
export default function MusicPlayer({ startSignal }) {
  const { src, title } = invitation.music
  const audioRef = useRef(null)
  const [state, setState] = useState('paused') // paused | playing | unavailable

  useEffect(() => {
    if (!src) return
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'auto'
    audio.src = src
    audio.volume = 0.9

    const onError = () => setState('unavailable')
    const onPlay = () => setState('playing')
    const onPause = () => setState((s) => (s === 'unavailable' ? s : 'paused'))

    audio.addEventListener('error', onError)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audioRef.current = audio

    // Attempt immediate autoplay on mount
    const p = audio.play()
    if (p !== undefined) {
      p.catch(() => {
        setState('paused')
      })
    }

    // Guarantee playback starts right on this page on user's very first touch or click
    const startOnFirstGesture = () => {
      if (audio.paused) {
        audio.play().catch(() => {})
      }
      window.removeEventListener('pointerdown', startOnFirstGesture)
      window.removeEventListener('touchstart', startOnFirstGesture)
      window.removeEventListener('click', startOnFirstGesture)
    }

    window.addEventListener('pointerdown', startOnFirstGesture, { once: true, passive: true })
    window.addEventListener('touchstart', startOnFirstGesture, { once: true, passive: true })
    window.addEventListener('click', startOnFirstGesture, { once: true, passive: true })

    return () => {
      window.removeEventListener('pointerdown', startOnFirstGesture)
      window.removeEventListener('touchstart', startOnFirstGesture)
      window.removeEventListener('click', startOnFirstGesture)
      audio.pause()
      audio.removeEventListener('error', onError)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.src = ''
      audioRef.current = null
    }
  }, [src])

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    const promise = audio.play()
    if (promise !== undefined) {
      promise.catch(() => {
        setState('paused')
      })
    }
  }

  // Also triggered by any external startSignal
  useEffect(() => {
    if (startSignal > 0) {
      play()
    }
  }, [startSignal])

  if (!src) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || state === 'unavailable') return
    if (audio.paused) {
      play()
    } else {
      audio.pause()
    }
  }

  const label =
    state === 'unavailable'
      ? 'التلاوة غير متاحة'
      : state === 'playing'
      ? `إيقاف ${title}`
      : `تشغيل ${title}`
  const Icon = state === 'playing' ? Volume2 : VolumeX

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={state === 'playing'}
      title={label}
      disabled={state === 'unavailable'}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-ivory/95 border border-gold/50 text-gold-deep shadow-[0_4px_16px_rgba(61,49,39,.35)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 ${
        state === 'playing' ? 'ring-2 sm:ring-4 ring-gold/30' : ''
      }`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      {state === 'playing' && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-deep"></span>
        </span>
      )}
    </button>
  )
}
