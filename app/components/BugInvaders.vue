<template>
  <div class="invaders">
    <div class="invaders__bar">
      <span class="invaders__title">BUG INVADERS</span>
      <div class="invaders__status">
        <span v-if="combo >= 3" class="pop invaders__combo">COMBO x{{ combo }}</span>
        <div class="invaders__lives" role="img" :aria-label="`${lives} vidas`">
          <span v-for="i in 3" :key="i" class="invaders__life" :class="{ 'invaders__life--on': i <= lives }" />
        </div>
      </div>
    </div>

    <div class="invaders__screen">
      <canvas ref="canvasEl" class="invaders__canvas" aria-label="Área do jogo Bug Invaders" @pointermove="aim"
        @pointerdown="aim" />

      <div v-if="phase === 'idle'" class="invaders__overlay invaders__overlay--idle">
        <span class="invaders__kicker">PRODUÇÃO ESTÁ PEGANDO FOGO</span>
        <span class="invaders__headline">Derruba os bugs<br>antes do deploy.</span>
        <button type="button" class="press invaders__play" @click="start">▶ JOGAR</button>
        <span class="invaders__hint">Mova o mouse ou o dedo. A nave atira sozinha.</span>
      </div>

      <div v-if="phase === 'over'" class="invaders__overlay invaders__overlay--over">
        <span class="invaders__gameover">GAME OVER</span>
        <span class="pop invaders__final">{{ padScore(score) }}</span>
        <span class="invaders__record">{{ overLine }}</span>
        <div class="invaders__actions">
          <button type="button" class="press arc-btn arc-btn--solid" @click="start">JOGAR DE NOVO</button>
          <a href="#coop" class="press arc-btn arc-btn--ghost">CONTRATAR O DEV</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { score, best, unlocked } = useArcade()

const canvasEl = ref(null)
const phase = ref('idle')
const lives = ref(3)
const combo = ref(0)

const overLine = computed(() =>
  score.value >= best.value && score.value > 0 ? 'NOVO RECORDE!' : `RECORDE: ${padScore(best.value)}`
)

const PAL = { bg: '#0a090d', ink: '#f4efe6', acc: '#ff5a1f', yel: '#ffd23f', lil: '#b8a6ff', dim: '#2a2733', pink: '#ff4f8b' }

const RULES = [
  { id: 'first', test: (g) => g.score >= 1 },
  { id: 'review', test: (g) => g.score >= 25 },
  { id: 'combo', test: (g) => g.combo >= 10 },
  { id: 'boss', test: (g) => g.bossKills >= 1 },
  { id: 'friday', test: (g) => g.score >= 100 }
]

const fresh = () => ({
  ship: { x: 0, init: false },
  bullets: [],
  bugs: [],
  parts: [],
  pops: [],
  stars: [],
  spawnT: 0.6,
  fireT: 0,
  shake: 0,
  time: 0,
  score: 0,
  lives: 3,
  combo: 0,
  comboT: 0,
  w: 0,
  h: 0,
  nextBoss: 20,
  bossKills: 0,
  over: false
})

let g = fresh()
let targetX = null
let raf = 0
let last = 0
let inView = true
let reduceMotion = false
let intersection = null
let resizeObs = null
let motionQuery = null

const aim = (e) => {
  if (!canvasEl.value) return
  targetX = e.clientX - canvasEl.value.getBoundingClientRect().left
}

const start = () => {
  g = fresh()
  targetX = null
  score.value = 0
  lives.value = 3
  combo.value = 0
  phase.value = 'play'
}

const burst = (x, y, color, n) => {
  if (reduceMotion) return
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2
    const s = 80 + Math.random() * 260
    g.parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5 + Math.random() * 0.4, t: 0, c: color, s: 3 + Math.random() * 4 })
  }
}

const loseLife = (x, y) => {
  if (g.over) return
  g.lives -= 1
  g.combo = 0
  g.shake = reduceMotion ? 0 : 14
  burst(x, y, PAL.pink, 26)
  if (g.lives <= 0) {
    g.over = true
    const newBest = Math.max(best.value, g.score)
    try { window.localStorage.setItem(BEST_STORAGE_KEY, String(newBest)) } catch (e) { /* storage indisponível */ }
    burst(g.ship.x, g.h - 46, PAL.acc, 60)
    best.value = newBest
    score.value = g.score
    lives.value = 0
    combo.value = 0
    phase.value = 'over'
  }
}

const unlock = () => {
  const add = {}
  RULES.forEach((r) => { if (!unlocked.value[r.id] && r.test(g)) add[r.id] = true })
  if (Object.keys(add).length) {
    unlocked.value = { ...unlocked.value, ...add }
    g.pops.push({ text: 'CONQUISTA!', x: g.w / 2, y: g.h / 2, t: 0 })
  }
}

const drawBug = (ctx, b, t) => {
  const col = b.flash > 0 ? '#ffffff' : (b.boss ? PAL.yel : (b.max > 1 ? PAL.lil : PAL.acc))
  const k = b.r / 14
  ctx.save()
  ctx.translate(b.x, b.y)
  ctx.strokeStyle = col
  ctx.fillStyle = col
  ctx.lineWidth = 2.4 * k
  ctx.lineCap = 'round'
  const leg = Math.sin(t * 14 + b.wob) * 3 * k
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath(); ctx.moveTo(-8 * k, i * 6 * k); ctx.lineTo(-16 * k, i * 7 * k + leg * (i === 0 ? -1 : 1)); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(8 * k, i * 6 * k); ctx.lineTo(16 * k, i * 7 * k - leg * (i === 0 ? -1 : 1)); ctx.stroke()
  }
  ctx.beginPath(); ctx.ellipse(0, 2 * k, 9 * k, 11 * k, 0, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(0, -11 * k, 5 * k, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = PAL.bg
  ctx.lineWidth = 2 * k
  ctx.beginPath(); ctx.moveTo(0, -6 * k); ctx.lineTo(0, 12 * k); ctx.stroke()
  ctx.fillStyle = PAL.bg
  ctx.fillRect(-3.5 * k, -13 * k, 2.4 * k, 2.4 * k)
  ctx.fillRect(1.1 * k, -13 * k, 2.4 * k, 2.4 * k)
  if (b.max > 1) {
    const w = b.r * 2
    ctx.fillStyle = PAL.dim; ctx.fillRect(-w / 2, -b.r - 12, w, 4)
    ctx.fillStyle = col; ctx.fillRect(-w / 2, -b.r - 12, w * (b.hp / b.max), 4)
  }
  ctx.restore()
}

const draw = (ctx, dpr, W, H, shipY) => {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = PAL.bg
  ctx.fillRect(0, 0, W, H)
  ctx.translate((Math.random() - 0.5) * g.shake, (Math.random() - 0.5) * g.shake)

  g.stars.forEach((s) => {
    ctx.fillStyle = s.z > 0.75 ? PAL.lil : '#3a3645'
    const z = s.z > 0.75 ? 2.4 : 1.6
    ctx.fillRect(s.x, s.y, z, z)
  })

  ctx.strokeStyle = 'rgba(184,166,255,0.08)'
  ctx.lineWidth = 1
  for (let y = reduceMotion ? 0 : (g.time * 40) % 40; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }

  g.bugs.forEach((b) => drawBug(ctx, b, g.time))

  ctx.fillStyle = PAL.yel
  g.bullets.forEach((b) => { ctx.fillRect(b.x - 2, b.y - 9, 4, 14) })

  g.parts.forEach((p) => {
    ctx.globalAlpha = 1 - p.t / p.life
    ctx.fillStyle = p.c
    ctx.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s)
  })
  ctx.globalAlpha = 1

  if (phase.value !== 'over') {
    const x = g.ship.x
    const fl = reduceMotion ? 12 : 8 + Math.random() * 10
    ctx.fillStyle = PAL.yel
    ctx.beginPath(); ctx.moveTo(x - 7, shipY + 14); ctx.lineTo(x, shipY + 14 + fl); ctx.lineTo(x + 7, shipY + 14); ctx.fill()
    ctx.fillStyle = PAL.acc
    ctx.beginPath(); ctx.moveTo(x, shipY - 22); ctx.lineTo(x + 20, shipY + 14); ctx.lineTo(x + 7, shipY + 8); ctx.lineTo(x - 7, shipY + 8); ctx.lineTo(x - 20, shipY + 14); ctx.closePath(); ctx.fill()
    ctx.fillStyle = PAL.ink
    ctx.fillRect(x - 3, shipY - 8, 6, 8)
  }

  ctx.textAlign = 'center'
  g.pops.forEach((p) => {
    ctx.globalAlpha = 1 - p.t / 0.8
    ctx.fillStyle = p.text === 'CONQUISTA!' ? PAL.yel : PAL.ink
    ctx.font = `${p.text === 'CONQUISTA!' ? '800 28px' : '700 16px'} "JetBrains Mono", monospace`
    ctx.fillText(p.text, p.x, p.y)
  })
  ctx.globalAlpha = 1
}

const tick = (dt) => {
  const c = canvasEl.value
  if (!c) return
  const r = c.getBoundingClientRect()
  if (!r.width) return
  const dpr = window.devicePixelRatio || 1
  const W = r.width
  const H = r.height
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
    c.width = Math.round(W * dpr)
    c.height = Math.round(H * dpr)
  }
  g.w = W
  g.h = H
  g.time += dt
  if (!g.ship.init) { g.ship.x = W / 2; g.ship.init = true }
  if (!g.stars.length) {
    for (let i = 0; i < 90; i++) g.stars.push({ x: Math.random() * W, y: Math.random() * H, z: 0.3 + Math.random() * 0.7 })
  }

  const playing = phase.value === 'play' && !g.over
  const speedUp = playing ? 1 + g.score / 60 : (reduceMotion ? 0 : 0.4)

  g.stars.forEach((s) => {
    s.y += (30 + 90 * s.z) * speedUp * dt
    if (s.y > H) { s.y = -2; s.x = Math.random() * W }
  })

  const tx = targetX == null ? W / 2 + (reduceMotion ? 0 : Math.sin(g.time * 1.3) * W * 0.25) : targetX
  g.ship.x += (Math.max(24, Math.min(W - 24, tx)) - g.ship.x) * Math.min(1, dt * 14)
  const shipY = H - 46

  if (playing) {
    g.fireT -= dt
    if (g.fireT <= 0) {
      const spread = g.score >= 40 ? [-10, 10] : [0]
      spread.forEach((o) => g.bullets.push({ x: g.ship.x + o, y: shipY - 18, vy: -720 }))
      g.fireT = 0.15
    }
    g.spawnT -= dt
    if (g.spawnT <= 0) {
      const boss = g.score >= g.nextBoss && !g.bugs.some((b) => b.boss)
      if (boss) g.nextBoss += 30
      const hp = boss ? 12 : (Math.random() < 0.18 ? 3 : 1)
      g.bugs.push({
        x: 30 + Math.random() * (W - 60),
        y: -30,
        vy: (boss ? 40 : 70 + Math.min(200, g.score * 2.2)) * (0.8 + Math.random() * 0.4),
        wob: Math.random() * 6,
        hp,
        max: hp,
        boss,
        r: boss ? 34 : (hp > 1 ? 20 : 14),
        flash: 0
      })
      g.spawnT = Math.max(0.28, 1.05 - g.score * 0.012)
    }
  }

  g.bullets.forEach((b) => { b.y += b.vy * dt })
  g.bullets = g.bullets.filter((b) => b.y > -20)

  g.bugs.forEach((b) => {
    b.y += b.vy * dt
    b.x += Math.sin(g.time * (b.boss ? 1.2 : 2.4) + b.wob) * (b.boss ? 70 : 40) * dt
    b.flash = Math.max(0, b.flash - dt)
  })

  if (playing) {
    g.bullets.forEach((bl) => {
      if (bl.dead) return
      for (const b of g.bugs) {
        if (b.dead) continue
        const dx = bl.x - b.x
        const dy = bl.y - b.y
        if (dx * dx + dy * dy < (b.r + 4) * (b.r + 4)) {
          bl.dead = true
          b.hp -= 1
          b.flash = 0.08
          burst(bl.x, bl.y, PAL.yel, 3)
          if (b.hp <= 0) {
            b.dead = true
            const pts = b.boss ? 10 : b.max
            g.combo += 1
            g.comboT = 1.4
            const mult = g.combo >= 10 ? 2 : 1
            g.score += pts * mult
            if (b.boss) g.bossKills += 1
            g.shake = reduceMotion ? 0 : Math.max(g.shake, b.boss ? 16 : 4)
            burst(b.x, b.y, b.boss ? PAL.yel : (b.max > 1 ? PAL.lil : PAL.acc), b.boss ? 70 : 18)
            g.pops.push({ text: `+${pts * mult}`, x: b.x, y: b.y, t: 0 })
          }
          break
        }
      }
    })
    g.bullets = g.bullets.filter((b) => !b.dead)
    g.bugs.forEach((b) => {
      if (b.dead) return
      const dx = b.x - g.ship.x
      const dy = b.y - shipY
      if (dx * dx + dy * dy < (b.r + 16) * (b.r + 16)) { b.dead = true; loseLife(b.x, b.y) }
      else if (b.y > H + b.r) { b.dead = true; loseLife(b.x, H - 6) }
    })
    g.comboT -= dt
    if (g.comboT <= 0) g.combo = 0
  }
  g.bugs = g.bugs.filter((b) => !b.dead)

  g.parts.forEach((p) => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.94; p.vy *= 0.94 })
  g.parts = g.parts.filter((p) => p.t < p.life)
  g.pops.forEach((p) => { p.t += dt; p.y -= reduceMotion ? 0 : 40 * dt })
  g.pops = g.pops.filter((p) => p.t < 0.8)
  g.shake = Math.max(0, g.shake - dt * 40)

  if (playing) {
    if (score.value !== g.score) score.value = g.score
    if (lives.value !== g.lives) lives.value = Math.max(0, g.lives)
    if (combo.value !== g.combo) combo.value = g.combo
    unlock()
  }

  draw(c.getContext('2d'), dpr, W, H, shipY)
}

const loop = (t) => {
  raf = requestAnimationFrame(loop)
  const dt = Math.min(0.033, last ? (t - last) / 1000 : 0.016)
  last = t
  tick(dt)
}

// O loop só roda com o canvas visível, a aba ativa e (com movimento reduzido) durante uma partida.
const syncLoop = () => {
  const shouldRun = inView && !document.hidden && (!reduceMotion || phase.value === 'play')
  if (shouldRun) {
    if (!raf) { last = 0; raf = requestAnimationFrame(loop) }
    return
  }
  if (raf) { cancelAnimationFrame(raf); raf = 0 }
  tick(0) // quadro estático
}

watch(phase, syncLoop)

onMounted(() => {
  try { best.value = parseInt(window.localStorage.getItem(BEST_STORAGE_KEY) || '0', 10) || 0 } catch (e) { best.value = 0 }

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)

  intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncLoop() })
  intersection.observe(canvasEl.value)

  resizeObs = new ResizeObserver(() => { if (!raf) tick(0) })
  resizeObs.observe(canvasEl.value)

  document.addEventListener('visibilitychange', syncLoop)
  syncLoop()
})

function onMotionChange (e) {
  reduceMotion = e.matches
  syncLoop()
}

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  raf = 0
  intersection?.disconnect()
  resizeObs?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', syncLoop)
})
</script>

<style scoped>
.invaders {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.invaders__bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.invaders__title {
  color: var(--arc-yel);
}

.invaders__status {
  display: flex;
  align-items: center;
  gap: 18px;
}

.invaders__combo {
  color: var(--arc-acc);
}

.invaders__lives {
  display: flex;
  gap: 6px;
}

.invaders__life {
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  border-radius: 2px;
  background: var(--arc-line);
}

.invaders__life--on {
  background: var(--arc-pink);
}

.invaders__screen {
  position: relative;
  aspect-ratio: 16 / 10;
  border: 3px solid var(--arc-line);
  border-radius: 10px;
  overflow: hidden;
  background: var(--arc-screen);
  box-shadow: 10px 10px 0 var(--arc-panel-hi);
}

.invaders__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
  cursor: crosshair;
}

.invaders__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
}

.invaders__overlay--idle {
  gap: 18px;
  background: rgba(10, 9, 13, 0.55);
}

.invaders__overlay--over {
  gap: 16px;
  background: rgba(10, 9, 13, 0.8);
}

.invaders__kicker {
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--arc-lil);
}

.invaders__headline {
  font-size: clamp(32px, 4.4vw, 60px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.invaders__play {
  height: 56px;
  padding: 0 28px;
  background: var(--arc-acc);
  color: var(--arc-bg);
  border: 0;
  border-radius: 4px;
  font-family: var(--arc-mono);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.invaders__hint {
  font-family: var(--arc-mono);
  font-size: 12px;
  color: var(--arc-dim);
}

.invaders__gameover {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--arc-acc);
}

.invaders__final {
  font-size: clamp(56px, 8vw, 112px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
}

.invaders__record {
  font-family: var(--arc-mono);
  font-size: 14px;
  color: var(--arc-yel);
}

.invaders__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
</style>
