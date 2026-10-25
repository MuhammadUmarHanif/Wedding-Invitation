import { useId, useRef, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { invitation } from '../config/invitation.js'
import { LIMITS, cleanText } from '../utils/validation.js'
import { toArabicDigits } from '../utils/format.js'
import { Reveal, Section } from './Ornaments.jsx'

const OPTIONS = [
  { value: 'yes', label: 'Joyfully Accept' },
  { value: 'maybe', label: 'Tentatively Yes / Maybe' },
  { value: 'no', label: 'Regretfully Decline' },
]

const EMPTY = { name: '', attendance: '', extraGuests: 0, message: '' }

function whatsappUrl(number, data) {
  const status = OPTIONS.find((o) => o.value === data.attendance)?.label || data.attendance
  const lines = [
    `Wedding RSVP Confirmation — ${invitation.event.title}`,
    `Name: ${data.name}`,
    `Attendance: ${status}`,
  ]
  if (data.attendance !== 'no') lines.push(`Additional Guests: ${toArabicDigits(data.extraGuests)}`)
  if (data.message) lines.push(`Warm Wishes / Message: ${data.message}`)
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`
}

function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-[#9b3b2e]">
      {children}
    </p>
  )
}

export default function RSVPForm() {
  const { maxExtraGuests, deadlineNote } = invitation.rsvp
  const number = /^\d{8,15}$/.test(invitation.rsvp.whatsapp) ? invitation.rsvp.whatsapp : ''
  const uid = useId()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent
  const formRef = useRef(null)

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!number) return

    const errs = {}
    const name = cleanText(values.name, LIMITS.name)
    const message = cleanText(values.message, LIMITS.message)
    const extra = Number(values.extraGuests)

    if (name.length < 2) errs.name = 'Please enter your name (at least 2 characters)'
    if (!values.attendance) errs.attendance = 'Please select your attendance status'

    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0]
      formRef.current?.querySelector(`[data-field="${first}"]`)?.focus()
      return
    }

    const payload = {
      name,
      attendance: values.attendance,
      extraGuests: values.attendance === 'no' ? 0 : extra,
      message,
    }

    window.open(whatsappUrl(number, payload), '_blank', 'noopener,noreferrer')
    setStatus('sent')
    setValues(EMPTY)
  }

  return (
    <Section id="rsvp" title="Confirm Your Attendance" eyebrow="RSVP" className="bg-cream/60">
      <Reveal className="mx-auto max-w-lg">
        {deadlineNote && <p className="mb-6 text-center text-base text-ink-soft">{deadlineNote}</p>}

        {!number ? (
          <div className="rounded-xl border border-gold/40 bg-ivory p-6 text-center">
            <p className="font-heading text-lg text-ink">RSVP will be open soon.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Please contact the couple or families directly to confirm your attendance.
            </p>
          </div>
        ) : status === 'sent' ? (
          <div className="rounded-xl border border-gold/50 bg-ivory p-8 text-center shadow-sm">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold-deep" aria-hidden="true" />
            <h3 className="mt-4 font-heading text-2xl font-bold text-ink">Thank You!</h3>
            <p className="mt-2 text-base text-ink-soft">
              Your response has been forwarded via WhatsApp. We look forward to celebrating with you!
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="btn-outline mt-6 rounded-full text-sm"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="space-y-6 rounded-2xl border border-gold/40 bg-ivory p-6 sm:p-8 shadow-sm"
          >
            <div>
              <label htmlFor={`${uid}-name`} className="block font-heading text-sm font-semibold tracking-wide text-ink">
                Full Name <span className="text-[#9b3b2e]">*</span>
              </label>
              <input
                id={`${uid}-name`}
                data-field="name"
                type="text"
                required
                maxLength={LIMITS.name}
                value={values.name}
                onChange={set('name')}
                placeholder="e.g. John Doe"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                className="mt-2 w-full rounded-lg border border-gold/40 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink-soft/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <FieldError id={`${uid}-name-err`}>{errors.name}</FieldError>
            </div>

            <fieldset>
              <legend className="font-heading text-sm font-semibold tracking-wide text-ink">
                Will you be attending? <span className="text-[#9b3b2e]">*</span>
              </legend>
              <div className="mt-3 space-y-2.5">
                {OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gold/30 bg-white/60 px-4 py-3 transition hover:bg-champagne/40"
                  >
                    <input
                      type="radio"
                      name={`${uid}-attendance`}
                      value={opt.value}
                      checked={values.attendance === opt.value}
                      onChange={set('attendance')}
                      className="h-4 w-4 text-gold-deep accent-gold-deep"
                    />
                    <span className="text-base text-ink">{opt.label}</span>
                  </label>
                ))}
              </div>
              <FieldError id={`${uid}-attendance-err`}>{errors.attendance}</FieldError>
            </fieldset>

            {values.attendance && values.attendance !== 'no' && (
              <div>
                <label htmlFor={`${uid}-guests`} className="block font-heading text-sm font-semibold tracking-wide text-ink">
                  Additional Guests
                </label>
                <select
                  id={`${uid}-guests`}
                  data-field="extraGuests"
                  value={values.extraGuests}
                  onChange={set('extraGuests')}
                  className="mt-2 w-full rounded-lg border border-gold/40 bg-white px-4 py-2.5 text-base text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  {Array.from({ length: maxExtraGuests + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0
                        ? `Just myself (${toArabicDigits('0')} additional guests)`
                        : `+${toArabicDigits(i)} additional guest${i > 1 ? 's' : ''}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor={`${uid}-message`} className="block font-heading text-sm font-semibold tracking-wide text-ink">
                Warm Wishes & Blessings (Optional)
              </label>
              <textarea
                id={`${uid}-message`}
                data-field="message"
                rows={3}
                maxLength={LIMITS.message}
                value={values.message}
                onChange={set('message')}
                placeholder="Write your prayers and warm wishes for Umar & Aiman..."
                className="mt-2 w-full rounded-lg border border-gold/40 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink-soft/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <FieldError id={`${uid}-message-err`}>{errors.message}</FieldError>
            </div>

            <button type="submit" className="btn-primary w-full rounded-full">
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Confirmation via WhatsApp
            </button>
          </form>
        )}
      </Reveal>
    </Section>
  )
}
