let ctx = null

function audio() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  ctx ??= new Ctx()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

/** Synthesized wooden knock: a low thump plus a short filtered click. */
export function playKnock() {
  try {
    const ac = audio()
    if (!ac) return
    const t = ac.currentTime

    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, t)
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.14)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.9, t + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
    osc.connect(gain).connect(ac.destination)
    osc.start(t)
    osc.stop(t + 0.22)

    const len = Math.floor(ac.sampleRate * 0.05)
    const buffer = ac.createBuffer(1, len, ac.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3
    const noise = ac.createBufferSource()
    noise.buffer = buffer
    const filter = ac.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1100
    const noiseGain = ac.createGain()
    noiseGain.gain.value = 0.55
    noise.connect(filter).connect(noiseGain).connect(ac.destination)
    noise.start(t)
  } catch {
    // Audio is decorative; ignore failures.
  }
  navigator.vibrate?.(25)
}

/** Soft low creak-like swell for the doors opening. */
export function playOpen() {
  try {
    const ac = audio()
    if (!ac) return
    const t = ac.currentTime
    const osc = ac.createOscillator()
    const filter = ac.createBiquadFilter()
    const gain = ac.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(70, t)
    osc.frequency.linearRampToValueAtTime(95, t + 1.2)
    filter.type = 'lowpass'
    filter.frequency.value = 380
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.25)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4)
    osc.connect(filter).connect(gain).connect(ac.destination)
    osc.start(t)
    osc.stop(t + 1.5)
  } catch {
    // ignore
  }
}
