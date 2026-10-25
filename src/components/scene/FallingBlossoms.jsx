import { seeded } from '../../utils/random.js'

const COLORS = ['#c64f9f', '#b4378e', '#d36aac', '#a84aa8']
const rand = seeded(17)
const ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: rand() * 100,
  delay: rand() * 10,
  duration: 10 + rand() * 8,
  size: 10 + rand() * 8,
  color: COLORS[i % COLORS.length],
}))

export default function FallingBlossoms() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden" aria-hidden="true">
      {ITEMS.map((b) => (
        <svg
          key={b.id}
          viewBox="-6 -6 12 12"
          className="blossom absolute -top-6"
          style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s` }}
        >
          {[0, 120, 240].map((a) => (
            <ellipse key={a} cx="0" cy="-2.6" rx="2.2" ry="3" fill={b.color} transform={`rotate(${a})`} />
          ))}
          <circle r=".8" fill="#f6ecc8" />
        </svg>
      ))}
    </div>
  )
}
