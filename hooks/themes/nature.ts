import { pines, rng, scenic, stars, svgOpen, wave } from './util.js'

const cloud = (x: number, y: number, s: number, fill = '#fff', op = 0.85) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" opacity="${op}"><ellipse cx="0" cy="0" rx="90" ry="26"/><ellipse cx="-50" cy="-18" rx="50" ry="26"/><ellipse cx="25" cy="-28" rx="60" ry="32"/></g>`

// --- Plage -----------------------------------------------------------------
const BEACH = `${svgOpen}
<style>.w1{animation:dx 9s linear infinite}.w2{animation:dx 14s linear infinite reverse}.cl{animation:dr 60s linear infinite}.sun{animation:pu 5s ease-in-out infinite alternate}
@keyframes dx{to{transform:translateX(-200px)}}@keyframes dr{from{transform:translateX(-200px)}to{transform:translateX(200px)}}@keyframes pu{to{opacity:.8}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb8ee"/><stop offset="1" stop-color="#fff0c8"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1394bd"/><stop offset="1" stop-color="#7fe3d9"/></linearGradient>
<linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dfa4"/><stop offset="1" stop-color="#e3bd76"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<circle class="sun" cx="1330" cy="180" r="84" fill="#fff7cf"/>
<g class="cl">${cloud(300, 150, 1)}${cloud(900, 100, 0.8)}${cloud(1180, 260, 0.6)}</g>
<rect y="520" width="1600" height="190" fill="url(#sea)"/>
<g class="w1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3"><path d="${wave(560, 14)}"/><path d="${wave(610, 18)}"/></g>
<g class="w2" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="3"><path d="${wave(585, 12)}"/><path d="${wave(650, 16)}"/></g>
<path d="M0 700 Q400 650 800 690 T1600 676 V900 H0Z" fill="url(#sand)"/>
<path d="M0 700 Q400 650 800 690 T1600 676" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="6"/>
<path d="M190 790 Q225 610 175 420" stroke="#8a5a2b" stroke-width="16" fill="none" stroke-linecap="round"/>
<g stroke="#2f9e5b" stroke-width="12" fill="none" stroke-linecap="round"><path d="M175 420 Q100 380 40 440"/><path d="M175 420 Q130 340 60 330"/><path d="M175 420 Q200 330 270 320"/><path d="M175 420 Q260 390 320 450"/><path d="M175 420 Q175 350 165 290"/></g>
<line x1="1390" y1="830" x2="1390" y2="650" stroke="#6b4a2b" stroke-width="7"/>
<path d="M1300 660 Q1390 560 1480 660Z" fill="#ff5a5f"/><path d="M1345 640 Q1390 580 1435 640Z" fill="#fff" opacity=".9"/>
</svg>`

// --- Montagne --------------------------------------------------------------
const snow = (x: number, y: number, w: number) =>
  `<polygon points="${x},${y} ${x - w},${y + w * 1.1} ${x - w / 3},${y + w * 0.95} ${x},${y + w * 1.3} ${x + w / 3},${y + w * 0.95} ${x + w},${y + w * 1.1}" fill="#fff"/>`
const MOUNTAIN = `${svgOpen}
<style>.cl{animation:dr 80s linear infinite}@keyframes dr{from{transform:translateX(-160px)}to{transform:translateX(160px)}}</style>
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cb9ea"/><stop offset="1" stop-color="#eef6ff"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g class="cl">${cloud(350, 170, 1.1)}${cloud(1000, 120, 0.9)}${cloud(1400, 230, 0.7)}</g>
<polygon points="0,640 180,430 330,520 540,380 780,540 990,420 1200,300 1420,470 1600,410 1600,760 0,760" fill="#a9bdd6"/>
${snow(1200, 300, 70)}${snow(540, 380, 55)}${snow(180, 430, 45)}
<polygon points="0,720 260,500 420,600 620,470 880,650 1100,540 1350,420 1600,600 1600,800 0,800" fill="#6f8fb5"/>
${snow(1350, 420, 60)}${snow(260, 500, 50)}${snow(620, 470, 45)}
<polygon points="0,800 0,640 160,720 360,690 560,780 900,740 1200,790 1420,700 1600,760 1600,900 0,900" fill="#3f5f86"/>
${pines(900, 34, 150, '#1f4d3a', 3)}
<rect y="860" width="1600" height="40" fill="#173d2e"/>
</svg>`

// --- Forêt la nuit ---------------------------------------------------------
const fr = rng(11)
const FLIES = Array.from({ length: 22 }, (_, i) => {
  const x = Math.round(fr() * 1500 + 50)
  const y = Math.round(500 + fr() * 330)
  const d = (3 + fr() * 4).toFixed(1)

  return `<circle cx="${x}" cy="${y}" r="3" fill="#e6ff8a" style="animation:fly ${d}s ease-in-out ${(i * 0.4).toFixed(1)}s infinite alternate"/>`
}).join('')
const FOREST = `${svgOpen}
<style>@keyframes fly{from{opacity:.1;transform:translate(0,0)}to{opacity:1;transform:translate(24px,-30px)}}.tw{animation:tw 4s ease-in-out infinite alternate}@keyframes tw{to{opacity:.2}}.mist{animation:mi 14s ease-in-out infinite alternate}@keyframes mi{to{transform:translateX(80px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03100c"/><stop offset="1" stop-color="#0f3a2a"/></linearGradient>
<radialGradient id="moon"><stop offset=".3" stop-color="#eaf8e4"/><stop offset="1" stop-color="#eaf8e4" stop-opacity="0"/></radialGradient>
<linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fe8c8" stop-opacity="0"/><stop offset="1" stop-color="#9fe8c8" stop-opacity=".25"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(70, 5, 420)}
<circle cx="1310" cy="170" r="170" fill="url(#moon)" opacity=".5"/><circle cx="1310" cy="170" r="62" fill="#eaf8e4"/>
${pines(700, 22, 330, '#0a2a1f', 21)}
${pines(790, 26, 300, '#071f17', 22)}
<g class="mist"><rect x="-100" y="560" width="1800" height="220" fill="url(#mist)"/></g>
${pines(900, 30, 360, '#04120d', 23)}
${FLIES}
</svg>`

// --- Coucher de soleil -----------------------------------------------------
const reflect = Array.from({ length: 10 }, (_, i) => {
  const w = 220 - i * 16

  return `<rect x="${400 - w / 2}" y="${612 + i * 24}" width="${w}" height="8" rx="4" fill="#ffd36b" opacity="${(0.7 - i * 0.05).toFixed(2)}" style="animation:sh ${(2 + i * 0.2).toFixed(1)}s ease-in-out infinite alternate"/>`
}).join('')
const SUNSET = `${svgOpen}
<style>@keyframes sh{from{transform:translateX(-14px)}to{transform:translateX(14px)}}.b{animation:bd 18s linear infinite}@keyframes bd{from{transform:translateX(-80px)}to{transform:translateX(120px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d0b3a"/><stop offset=".35" stop-color="#6b1f6e"/><stop offset=".62" stop-color="#ff5e62"/><stop offset=".78" stop-color="#ffb347"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a3d"/><stop offset=".3" stop-color="#8a2a5f"/><stop offset="1" stop-color="#1c0a33"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#ffd36b" stop-opacity=".7"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<circle cx="400" cy="600" r="330" fill="url(#glow)"/><circle cx="400" cy="600" r="112" fill="#ffd36b"/>
<rect y="600" width="1600" height="300" fill="url(#sea)"/>
${reflect}
<g class="b" fill="none" stroke="#1c0a33" stroke-width="4" stroke-linecap="round"><path d="M1100 250 q15 -18 30 0 q15 -18 30 0"/><path d="M1220 300 q12 -14 24 0 q12 -14 24 0"/><path d="M1000 330 q10 -12 20 0 q10 -12 20 0"/></g>
</svg>`

export const NATURE_THEMES = [
  scenic({
    id: 'plage',
    label: 'Plage',
    description: 'Mer turquoise, sable doré, palmier et parasol (clair)',
    accent: '#0e8fb0',
    bg: '#e8f6f8',
    mode: 'light',
    svg: BEACH,
    alt: 'Une plage avec un palmier, un parasol et des vagues',
  }),
  scenic({
    id: 'montagne',
    label: 'Montagne',
    description: 'Sommets enneigés, sapins et nuages qui passent (clair)',
    accent: '#2f6fa8',
    bg: '#e9f0f7',
    mode: 'light',
    svg: MOUNTAIN,
    alt: 'Des montagnes enneigées et des sapins',
  }),
  scenic({
    id: 'foret',
    label: 'Forêt',
    description: 'Forêt de nuit, brume, lune et lucioles (sombre)',
    accent: '#3ddc97',
    bg: '#0b1f17',
    mode: 'dark',
    svg: FOREST,
    alt: 'Une forêt de sapins la nuit avec des lucioles',
  }),
  scenic({
    id: 'coucher-soleil',
    label: 'Coucher de soleil',
    description: 'Soleil rouge sur la mer, ciel orange et violet (sombre)',
    accent: '#ff8a3d',
    bg: '#2a0f1f',
    mode: 'dark',
    svg: SUNSET,
    alt: 'Un coucher de soleil sur la mer avec des oiseaux',
  }),
]
