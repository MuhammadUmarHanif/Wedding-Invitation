import { MapPin, Navigation } from 'lucide-react'
import { invitation } from '../config/invitation.js'
import { safeMapsUrl } from '../utils/validation.js'
import { Reveal, Section } from './Ornaments.jsx'

export default function VenueSection() {
  const { venue } = invitation
  const mapsUrl =
    safeMapsUrl(venue.mapsUrl) ||
    (venue.address || venue.name
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([venue.name, venue.address].join(' '))}`
      : '')
  const embedSrc = venue.embedQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(venue.embedQuery)}&output=embed`
    : ''

  return (
    <Section id="venue" title={venue.title || "The Venue"} eyebrow={venue.eyebrow || "Location & Directions"} className="bg-cream/60">
      <Reveal className="text-center max-w-xl mx-auto">
        {venue.image && (
          <img
            src={venue.image}
            alt={venue.imageAlt}
            loading="lazy"
            decoding="async"
            width="800"
            height="500"
            className="mb-8 aspect-[8/5] w-full rounded-2xl border border-gold/40 object-cover p-1.5 shadow-sm"
          />
        )}
        <MapPin className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
        <h3 className="mt-3 font-heading text-2xl font-bold text-ink">{venue.name}</h3>
        {venue.address && <p className="mt-2 text-lg text-ink-soft">{venue.address}</p>}

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 rounded-full inline-flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions on Google Maps
          </a>
        )}

        {embedSrc && (
          <iframe
            title={`Map for ${venue.name}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            className="mt-8 aspect-[4/3] w-full rounded-2xl border border-gold/40 sm:aspect-[16/9] shadow-sm"
          />
        )}
      </Reveal>
    </Section>
  )
}
