import { pines, rng, scenic, stars, svgOpen } from './util.js'

// --- Neige -----------------------------------------------------------------
const sn = rng(101)
const SNOWFALL = Array.from({ length: 70 }, (_, i) => {
  const x = Math.round(sn() * 1600)
  const r = (1.5 + sn() * 3).toFixed(1)
  const d = (6 + sn() * 8).toFixed(1)

  return `<circle cx="${x}" cy="-20" r="${r}" fill="#fff" style="animation:fall ${d}s linear -${(sn() * 12).toFixed(1)}s infinite" opacity="${(0.6 + (i % 4) * 0.1).toFixed(1)}"/>`
}).join('')
const snowPines = (y: number, count: number, h: number, seed: number) => {
  const r = rng(seed)

  return Array.from({ length: count }, (_, i) => {
    const x = Math.round((i / count) * 1700 - 50 + r() * 40)
    const hh = Math.round(h * (0.7 + r() * 0.6))
    const w = Math.round(hh * 0.36)

    return `<polygon points="${x},${y - hh} ${x - w},${y} ${x + w},${y}" fill="#2c5a4a"/><polygon points="${x},${y - hh} ${x - w * 0.55},${y - hh * 0.45} ${x + w * 0.55},${y - hh * 0.45}" fill="#fff" opacity=".92"/>`
  }).join('')
}
const SNOW = `${svgOpen}
<style>@keyframes fall{from{transform:translate(0,0)}to{transform:translate(40px,960px)}}</style>
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c8e6"/><stop offset="1" stop-color="#f2f8ff"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<path d="M0 640 Q300 540 620 620 T1240 600 T1600 640 V900 H0Z" fill="#dfeaf6"/>
${snowPines(700, 12, 230, 4)}
<path d="M0 760 Q400 680 800 750 T1600 720 V900 H0Z" fill="#f7fbff"/>
<g transform="translate(1250 690)"><rect width="150" height="100" fill="#8a5a3a"/><polygon points="-14,0 75,-70 164,0" fill="#f4f8fc" stroke="#c8d6e6" stroke-width="3"/><rect x="95" y="30" width="34" height="34" fill="#ffd27a"/><rect x="28" y="40" width="34" height="60" fill="#5a3a24"/></g>
${snowPines(900, 7, 300, 6)}
<g>${SNOWFALL}</g>
</svg>`

// --- Désert ----------------------------------------------------------------
const DESERT = `${svgOpen}
<style>.sun{animation:pu 6s ease-in-out infinite alternate}@keyframes pu{to{opacity:.8}}.hz{animation:hz 5s ease-in-out infinite alternate}@keyframes hz{to{transform:translateX(30px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a4d"/><stop offset=".6" stop-color="#ffd58a"/><stop offset="1" stop-color="#fff0c4"/></linearGradient>
<linearGradient id="d1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a85c"/><stop offset="1" stop-color="#c9803a"/></linearGradient>
<linearGradient id="d2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d78d46"/><stop offset="1" stop-color="#a95f28"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<circle class="sun" cx="1220" cy="300" r="120" fill="#fff4d0"/>
<g class="hz"><path d="M0 560 Q300 470 640 540 T1300 520 T1600 560 V900 H0Z" fill="#f0c079"/></g>
<path d="M0 650 Q400 560 820 640 T1600 600 V900 H0Z" fill="url(#d1)"/>
<path d="M0 780 Q500 690 1000 770 T1600 740 V900 H0Z" fill="url(#d2)"/>
<g fill="#3f6f3a" stroke="#3f6f3a" stroke-linecap="round" transform="translate(250 560)">
  <rect x="-14" y="0" width="28" height="230" rx="14"/>
  <path d="M-14 100 H-56 V40" fill="none" stroke-width="22"/><path d="M14 150 H56 V80" fill="none" stroke-width="22"/>
</g>
<g fill="#3f6f3a" transform="translate(1420 700) scale(.6)"><rect x="-14" y="0" width="28" height="200" rx="14"/><path d="M14 110 H56 V50" fill="none" stroke="#3f6f3a" stroke-width="22" stroke-linecap="round"/></g>
</svg>`

// --- Océan -----------------------------------------------------------------
const oc = rng(131)
const BUBBLES = Array.from({ length: 30 }, () => {
  const x = Math.round(oc() * 1600)
  const r = (3 + oc() * 9).toFixed(1)
  const d = (7 + oc() * 8).toFixed(1)

  return `<circle cx="${x}" cy="920" r="${r}" fill="none" stroke="#bff6ff" stroke-opacity=".6" style="animation:up ${d}s linear -${(oc() * 12).toFixed(1)}s infinite"/>`
}).join('')
const fish = (y: number, s: number, fill: string, dur: number, delay: number) =>
  `<g transform="translate(0 ${y})"><g style="animation:sw ${dur}s linear -${delay}s infinite"><g transform="scale(${s})" fill="${fill}"><ellipse rx="40" ry="16"/><polygon points="-34,0 -62,-16 -62,16"/><circle cx="22" cy="-3" r="3" fill="#04182a"/></g></g></g>`
const WEED = Array.from({ length: 18 }, (_, i) => {
  const x = 40 + i * 92
  const h = 120 + ((i * 53) % 120)

  return `<path style="animation:sway ${3 + (i % 4)}s ease-in-out infinite alternate;transform-origin:${x}px 900px" d="M${x} 900 q-24 ${-h / 2} 0 ${-h} q24 ${-h / 2} 0 ${-h}" fill="none" stroke="${i % 2 ? '#1f9d6b' : '#16805a'}" stroke-width="14" stroke-linecap="round"/>`
}).join('')
const OCEAN = `${svgOpen}
<style>@keyframes up{from{transform:translateY(0)}to{transform:translateY(-1000px)}}@keyframes sw{from{transform:translateX(-120px)}to{transform:translateX(1720px)}}@keyframes sway{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}.ray{animation:ra 6s ease-in-out infinite alternate}@keyframes ra{to{opacity:.25}}</style>
<defs>
<linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b8fd0"/><stop offset=".5" stop-color="#0a4f8a"/><stop offset="1" stop-color="#021b3a"/></linearGradient>
<linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff6ff" stop-opacity=".55"/><stop offset="1" stop-color="#bff6ff" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#w)"/>
<g fill="url(#r)"><polygon class="ray" points="200,0 340,0 640,900 420,900"/><polygon class="ray" points="620,0 720,0 1060,900 880,900" style="animation-delay:-2s"/><polygon class="ray" points="1000,0 1140,0 1500,900 1260,900" style="animation-delay:-4s"/></g>
${BUBBLES}
${fish(260, 1, '#ffb347', 22, 4)}${fish(420, 0.7, '#ff7a8a', 30, 14)}${fish(560, 1.3, '#9fe8ff', 26, 9)}${fish(340, 0.5, '#fff27a', 18, 1)}
<path d="M0 860 Q400 820 800 850 T1600 840 V900 H0Z" fill="#0a2a3a"/>
${WEED}
</svg>`

// --- Tokyo de nuit ---------------------------------------------------------
const tk = rng(151)
const NIGHT_TOWERS = Array.from({ length: 16 }, (_, i) => {
  const x = i * 104 - 20
  const mid = Math.abs(i * 104 + 32 - 800) / 800
  const h = Math.round(210 + mid * 280 * (0.4 + tk() * 0.8))
  const w = 98
  const cells = Array.from({ length: Math.floor(h / 40) * 3 }, (_, k) => {
    const lit = tk() < 0.5

    return lit ? `<rect x="${x + 10 + (k % 3) * 28}" y="${900 - h + 14 + Math.floor(k / 3) * 40}" width="14" height="20" fill="${tk() < 0.7 ? '#ffe08a' : '#7fe0ff'}" opacity=".85"/>` : ''
  }).join('')
  const neon = tk() < 0.45 ? `<rect class="ng" x="${x + w - 20}" y="${900 - h + 30}" width="9" height="${60 + Math.round(tk() * 80)}" fill="${['#ff4f9a', '#4df0ff', '#ffd24d'][Math.floor(tk() * 3)]}"/>` : ''

  return `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="#14112e"/>${cells}${neon}`
}).join('')
const PETALS = Array.from({ length: 36 }, () => {
  const x = Math.round(tk() * 1600)
  const d = (8 + tk() * 8).toFixed(1)

  return `<ellipse cx="${x}" cy="-20" rx="7" ry="4" fill="#ffb8d4" opacity=".85" style="animation:pt ${d}s linear -${(tk() * 14).toFixed(1)}s infinite"/>`
}).join('')
const TOKYO = `${svgOpen}
<style>.ng{animation:ng 2.6s ease-in-out infinite alternate}@keyframes ng{to{opacity:.4}}@keyframes pt{from{transform:translate(0,0) rotate(0)}to{transform:translate(-140px,960px) rotate(300deg)}}.tw{animation:tw 3s ease-in-out infinite alternate}@keyframes tw{to{opacity:.2}}.bk{animation:bk 1.6s steps(2) infinite}@keyframes bk{50%{opacity:.3}}</style>
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#090818"/><stop offset=".7" stop-color="#2a1245"/><stop offset="1" stop-color="#7a2a6a"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(40, 17, 300)}
<circle cx="360" cy="170" r="54" fill="#ffe9c8"/>
${NIGHT_TOWERS}
<g transform="translate(1300 0)">
  <polygon points="0,200 10,360 30,360 44,520 70,520 100,900 -100,900 -70,520 -44,520 -30,360 -10,360" fill="#ff5a36"/>
  <g stroke="#fff" stroke-width="5" opacity=".85"><line x1="-10" y1="360" x2="10" y2="360"/><line x1="-44" y1="520" x2="44" y2="520"/><line x1="-76" y1="700" x2="76" y2="700"/></g>
  <circle class="bk" cx="0" cy="198" r="6" fill="#fff"/>
</g>
<g fill="#e0242f" transform="translate(150 560)"><rect x="40" y="40" width="22" height="300"/><rect x="238" y="40" width="22" height="300"/><rect x="0" y="0" width="300" height="28" rx="6"/><rect x="24" y="52" width="252" height="16"/></g>
${PETALS}
</svg>`

export const EXTRA_THEMES = [
  scenic({
    id: 'neige',
    label: 'Neige',
    description: 'Sapins enneigés, chalet éclairé, flocons qui tombent (clair)',
    accent: '#3b82c4',
    bg: '#eaf2f8',
    mode: 'light',
    svg: SNOW,
    alt: 'Un paysage de neige avec des sapins et un chalet',
  }),
  scenic({
    id: 'desert',
    label: 'Désert',
    description: 'Dunes orangées, cactus et grand soleil (clair)',
    accent: '#c8641e',
    bg: '#f7ecd8',
    mode: 'light',
    svg: DESERT,
    alt: 'Des dunes de sable avec des cactus et un grand soleil',
  }),
  scenic({
    id: 'ocean',
    label: 'Océan',
    description: 'Fond marin : rayons de lumière, bulles, poissons, algues (sombre)',
    accent: '#2fd0e8',
    bg: '#04182a',
    mode: 'dark',
    svg: OCEAN,
    alt: 'Le fond de l\'océan avec des poissons et des bulles',
  }),
  scenic({
    id: 'tokyo-nuit',
    label: 'Tokyo de nuit',
    description: 'Tours néon, tour rouge et blanche, torii et pétales de cerisier (sombre)',
    accent: '#ff4f9a',
    bg: '#0d0b1f',
    mode: 'dark',
    svg: TOKYO,
    alt: 'Tokyo la nuit avec des néons, une tour et des pétales de cerisier',
  }),
]
