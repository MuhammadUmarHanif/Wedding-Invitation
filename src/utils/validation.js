export const LIMITS = { name: 60, message: 500 }
export const ATTENDANCE = ['yes', 'no', 'maybe']

/** Collapses whitespace and strips control characters. React escapes on render. */
export function cleanText(value, max) {
  return String(value ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‎‏‪-‮]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

export function validateRsvp(values, { maxExtraGuests }) {
  const errors = {}
  const name = cleanText(values.name, LIMITS.name)
  const message = cleanText(values.message, LIMITS.message)
  const extra = Number(values.extraGuests)

  if (name.length < 2) errors.name = 'يرجى كتابة الاسم (حرفان على الأقل)'
  else if (String(values.name).trim().length > LIMITS.name)
    errors.name = `الاسم طويل جداً (الحد ${LIMITS.name} حرفاً)`

  if (!ATTENDANCE.includes(values.attendance)) errors.attendance = 'يرجى اختيار حالة الحضور'

  if (values.attendance !== 'no') {
    if (!Number.isInteger(extra) || extra < 0 || extra > maxExtraGuests)
      errors.extraGuests = `عدد المرافقين يجب أن يكون بين ٠ و ${maxExtraGuests}`
  }

  if (String(values.message ?? '').trim().length > LIMITS.message)
    errors.message = `الرسالة طويلة جداً (الحد ${LIMITS.message} حرف)`

  return {
    errors,
    valid: Object.keys(errors).length === 0,
    data: {
      name,
      attendance: values.attendance,
      extraGuests: values.attendance === 'no' ? 0 : extra,
      message,
    },
  }
}

const ALLOWED_MAP_HOSTS = ['google.com', 'www.google.com', 'maps.google.com', 'goo.gl', 'maps.app.goo.gl']

/** Returns the URL only if it is https and points at a Google Maps host. */
export function safeMapsUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && ALLOWED_MAP_HOSTS.includes(url.hostname) ? url.href : ''
  } catch {
    return ''
  }
}

export function safeHttpsUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}
