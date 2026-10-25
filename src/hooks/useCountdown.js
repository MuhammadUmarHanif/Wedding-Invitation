import { useEffect, useState } from 'react'
import { isValidDate } from '../utils/format.js'

export function getRemaining(target, now) {
  if (!isValidDate(target)) return { status: 'invalid' }
  const diff = new Date(target).getTime() - now
  if (diff <= 0) return { status: 'done' }
  return {
    status: 'running',
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    minutes: Math.floor(diff / 6e4) % 60,
    seconds: Math.floor(diff / 1e3) % 60,
  }
}

/**
 * The target is an absolute instant (ISO string with offset), so the result is
 * timezone-correct regardless of the visitor's clock zone. `now` starts as null
 * so a server-rendered pass would output a stable placeholder.
 */
export function useCountdown(target) {
  const [now, setNow] = useState(null)

  useEffect(() => {
    if (!isValidDate(target)) return
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  if (!isValidDate(target)) return { status: 'invalid' }
  if (now === null) return { status: 'pending' }
  return getRemaining(target, now)
}
