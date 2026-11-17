import { rng, scenic, stars, svgOpen } from './util.js'

const TW = '<style>.tw{animation:tw 3.5s ease-in-out infinite alternate}@keyframes tw{to{opacity:.15}}'

// --- Planètes --------------------------------------------------------------
const PLANETS = `${svgOpen}
${TW}.fl{animation:fl 12s ease-in-out infinite alternate}@keyframes fl{to{transform:translateY(-16px)}}</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04061a"/><stop offset="1" stop-color="#101a45"/></linearGradient>
<radialGradient id="p1" cx=".35" cy=".3"><stop offset="0" stop-color="#ffcf8a"/><stop offset=".6" stop-color="#d9743a"/><stop offset="1" stop-color="#6b2a1c"/></radialGradient>
<radialGradient id="p2" cx=".35" cy=".3"><stop offset="0" stop-color="#9fe2ff"/><stop offset=".6" stop-color="#3a7bd5"/><stop offset="1" stop-color="#14306b"/></radialGradient>
<clipPath id="c1"><circle cx="260" cy="760" r="260"/></clipPath>
</defs>
<rect width="1600" height="900" fill="url(#bg)"/>
${stars(140, 41)}
<g class="fl">
  <circle cx="260" cy="760" r="260" fill="url(#p1)"/>
  <g clip-path="url(#c1)" fill="#fff" opacity=".12"><rect x="0" y="600" width="600" height="30"/><rect x="0" y="680" width="600" height="46"/><rect x="0" y="780" width="600" height="24"/></g>
  <ellipse cx="260" cy="760" rx="430" ry="80" transform="rotate(-18 260 760)" fill="none" stroke="#ffd9a8" stroke-opacity=".55" stroke-width="14"/>
</g>
<circle cx="1380" cy="200" r="74" fill="url(#p2)"/>
<ellipse cx="1380" cy="200" rx="120" ry="24" transform="rotate(20 1380 200)" fill="none" stroke="#bfe6ff" stroke-opacity=".5" stroke-width="5"/>
<circle cx="1130" cy="110" r="22" fill="#d8dbe8"/><circle cx="1122" cy="104" r="5" fill="#b9bdd0"/>
<circle cx="1520" cy="560" r="12" fill="#ff7a5c"/>
</svg>`

// --- Lune ------------------------------------------------------------------
const cr = rng(7)
const CRATERS = Array.from({ length: 16 }, () => {
  const a = cr() * Math.PI * 2
  const d = Math.sqrt(cr()) * 330
  const x = Math.round(1330 + Math.cos(a) * d)
  const y = Math.round(900 + Math.sin(a) * d * 0.6 - 140)
  const r = Math.round(10 + cr() * 38)

  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#8d92a3" opacity=".35"/><circle cx="${x - 3}" cy="${y - 3}" r="${Math.round(r * 0.8)}" fill="#c9cddb" opacity=".25"/>`
}).join('')
const MOON = `${svgOpen}
${TW}.fl{animation:fl 16s ease-in-out infinite alternate}@keyframes fl{to{transform:translateY(10px)}}</style>
<defs>
<radialGradient id="m" cx=".4" cy=".3"><stop offset="0" stop-color="#f1f2f7"/><stop offset=".7" stop-color="#b6bac8"/><stop offset="1" stop-color="#6f7384"/></radialGradient>
<radialGradient id="e" cx=".35" cy=".3"><stop offset="0" stop-color="#9fe2ff"/><stop offset=".55" stop-color="#2f78d0"/><stop offset="1" stop-color="#0d2a66"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="#05060b"/>
${stars(170, 77)}
<g class="fl"><circle cx="1330" cy="1020" r="560" fill="url(#m)"/>${CRATERS}</g>
<circle cx="250" cy="190" r="96" fill="url(#e)"/>
<g fill="#fff" opacity=".7"><path d="M205 160 q30 -18 60 -4 q14 8 4 18 q-30 6 -64 -14z"/><path d="M230 220 q36 -8 52 14 q-24 14 -52 -14z"/></g>
<path d="M185 150 a96 96 0 0 0 0 80" fill="none" stroke="#9fe2ff" stroke-opacity=".5" stroke-width="3"/>
</svg>`

// --- Galaxie ---------------------------------------------------------------
const GALAXY = `${svgOpen}
${TW}.spin{transform-box:fill-box;transform-origin:center;animation:sp 240s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}</style>
<defs>
<radialGradient id="arm"><stop offset="0" stop-color="#c07bff" stop-opacity=".55"/><stop offset=".6" stop-color="#5a3bd1" stop-opacity=".25"/><stop offset="1" stop-color="#2a1a8a" stop-opacity="0"/></radialGradient>
<radialGradient id="core"><stop offset="0" stop-color="#fff6d8"/><stop offset=".25" stop-color="#ffc977" stop-opacity=".9"/><stop offset="1" stop-color="#ff7ac8" stop-opacity="0"/></radialGradient>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06020f"/><stop offset="1" stop-color="#150a33"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#bg)"/>
${stars(190, 91)}
<g transform="translate(1180 330)"><g class="spin">
  <g transform="rotate(25) scale(1 .45)">
    <ellipse rx="560" ry="150" fill="url(#arm)"/>
    <ellipse rx="560" ry="150" transform="rotate(60)" fill="url(#arm)"/>
    <ellipse rx="560" ry="150" transform="rotate(120)" fill="url(#arm)"/>
    <circle r="120" fill="url(#core)"/>
  </g>
</g></g>
<circle cx="250" cy="720" r="3" fill="#ffd7a8"/><circle cx="420" cy="140" r="2.5" fill="#bfe6ff"/>
</svg>`

export const SPACE_THEMES = [
  scenic({
    id: 'planetes',
    label: 'Planètes',
    description: 'Planète à anneaux, géante bleue et petite lune (sombre)',
    accent: '#7aa2ff',
    bg: '#070b1f',
    mode: 'dark',
    svg: PLANETS,
    alt: 'Des planètes à anneaux dans un ciel d\'étoiles',
  }),
  scenic({
    id: 'lune',
    label: 'Lune',
    description: 'Surface lunaire cratérisée et Terre à l\'horizon (sombre)',
    accent: '#c9d1e6',
    bg: '#0c0d12',
    mode: 'dark',
    svg: MOON,
    alt: 'La Lune et la Terre dans l\'espace',
  }),
  scenic({
    id: 'galaxie',
    label: 'Galaxie',
    description: 'Galaxie spirale qui tourne très lentement (sombre)',
    accent: '#c07bff',
    bg: '#0d0720',
    mode: 'dark',
    svg: GALAXY,
    alt: 'Une galaxie spirale violette',
  }),
]
