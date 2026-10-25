const LOCALE = 'ar-u-nu-arab'

export function toArabicDigits(value) {
  return String(value).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d])
}

export function isValidDate(value) {
  const d = value instanceof Date ? value : new Date(value)
  return !Number.isNaN(d.getTime())
}

export function formatDate(iso, timeZone) {
  if (!isValidDate(iso)) return ''
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone,
  }).format(new Date(iso))
}

export function formatTime(iso, timeZone) {
  if (!isValidDate(iso)) return ''
  return new Intl.DateTimeFormat(LOCALE, { hour: 'numeric', minute: '2-digit', timeZone }).format(
    new Date(iso),
  )
}

/** Formats a schedule clock string like "19:30" as an Arabic 12-hour time. */
export function formatClock(hhmm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm ?? '')
  if (!match) return ''
  const h = Number(match[1])
  const period = h < 12 ? 'ص' : 'م'
  const h12 = h % 12 || 12
  return `${toArabicDigits(h12)}:${toArabicDigits(match[2])} ${period}`
}

export function dateParts(iso, timeZone) {
  if (!isValidDate(iso)) return null
  const parts = new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone,
  }).formatToParts(new Date(iso))
  return Object.fromEntries(parts.map((p) => [p.type, p.value]))
}
