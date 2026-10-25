import { isValidDate } from './format.js'

/** 2026-12-18T14:00:00.000Z -> 20261218T140000Z */
function toUtcStamp(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function eventRange(event) {
  if (!isValidDate(event.start)) return null
  const start = new Date(event.start)
  const end = isValidDate(event.end) ? new Date(event.end) : new Date(start.getTime() + 4 * 36e5)
  return { start, end }
}

function locationOf(venue) {
  return [venue.name, venue.address].filter(Boolean).join('، ')
}

export function googleCalendarUrl(event, venue) {
  const range = eventRange(event)
  if (!range) return ''
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toUtcStamp(range.start)}/${toUtcStamp(range.end)}`,
    details: event.description,
    location: locationOf(venue),
    ctz: event.timeZone,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

/** Escapes text per RFC 5545 §3.3.11 */
function escapeIcs(text = '') {
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')
}

/** Folds lines longer than 75 octets per RFC 5545 §3.1 */
function foldLine(line) {
  const bytes = new TextEncoder().encode(line)
  if (bytes.length <= 75) return line
  const out = []
  let current = ''
  let size = 0
  for (const ch of line) {
    const len = new TextEncoder().encode(ch).length
    if (size + len > (out.length ? 74 : 75)) {
      out.push(current)
      current = ''
      size = 0
    }
    current += ch
    size += len
  }
  out.push(current)
  return out.join('\r\n ')
}

export function buildIcs(event, venue, now = new Date()) {
  const range = eventRange(event)
  if (!range) return ''
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${toUtcStamp(range.start)}-wedding@invitation`,
    `DTSTAMP:${toUtcStamp(now)}`,
    `DTSTART:${toUtcStamp(range.start)}`,
    `DTEND:${toUtcStamp(range.end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(locationOf(venue))}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(event.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(foldLine).join('\r\n') + '\r\n'
}

export function downloadIcs(event, venue, filename = 'wedding.ics') {
  const ics = buildIcs(event, venue)
  if (!ics) return false
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return true
}
