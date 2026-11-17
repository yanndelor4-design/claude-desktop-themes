import { rng, scenic, svgOpen } from './util.js'

// --- Voiture de sport, de nuit --------------------------------------------
const br = rng(5)
const BOKEH = Array.from({ length: 26 }, () => {
  const x = Math.round(br() * 1600)
  const y = Math.round(300 + br() * 330)
  const r = Math.round(8 + br() * 22)
  const c = ['#ff4d6d', '#ffb020', '#4dd2ff', '#ffffff'][Math.floor(br() * 4)]

  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${(0.12 + br() * 0.25).toFixed(2)}"/>`
}).join('')
const CAR = `${svgOpen}
<style>.dash{animation:ds .8s linear infinite}@keyframes ds{to{transform:translateX(-160px)}}.sp{animation:spd 1.4s linear infinite}@keyframes spd{from{transform:translateX(60px);opacity:0}30%{opacity:.8}to{transform:translateX(-120px);opacity:0}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07070d"/><stop offset="1" stop-color="#2a1030"/></linearGradient>
<linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0383c"/><stop offset="1" stop-color="#8e1218"/></linearGradient>
<radialGradient id="beam"><stop offset="0" stop-color="#fff6c8" stop-opacity=".8"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${BOKEH}
<rect y="740" width="1600" height="160" fill="#101015"/>
<g class="dash" fill="#e8e8f0" opacity=".8"><rect x="0" y="812" width="90" height="8"/><rect x="160" y="812" width="90" height="8"/><rect x="320" y="812" width="90" height="8"/><rect x="480" y="812" width="90" height="8"/><rect x="640" y="812" width="90" height="8"/><rect x="800" y="812" width="90" height="8"/><rect x="960" y="812" width="90" height="8"/><rect x="1120" y="812" width="90" height="8"/><rect x="1280" y="812" width="90" height="8"/><rect x="1440" y="812" width="90" height="8"/><rect x="1600" y="812" width="90" height="8"/></g>
<g fill="#fff"><rect class="sp" x="360" y="700" width="140" height="3" rx="2"/><rect class="sp" x="260" y="730" width="180" height="3" rx="2" style="animation-delay:.5s"/></g>
<ellipse cx="1260" cy="700" rx="240" ry="50" fill="url(#beam)"/>
<g transform="translate(940 560)">
  <path d="M0 160 L10 118 Q80 108 150 84 L225 36 Q300 6 385 30 L455 74 Q500 88 515 118 L525 160Z" fill="url(#body)"/>
  <path d="M170 82 L232 46 Q298 22 366 42 L412 78Z" fill="#1a1c26"/>
  <path d="M290 40 L292 80" stroke="#8e1218" stroke-width="5"/>
  <path d="M10 130 L520 130" stroke="#5a0a10" stroke-width="3" opacity=".6"/>
  <rect x="485" y="112" width="34" height="10" rx="4" fill="#fff6c8"/>
  <rect x="6" y="106" width="22" height="10" rx="4" fill="#ff2b3a"/>
  <circle cx="118" cy="162" r="42" fill="#0a0a0e"/><circle cx="118" cy="162" r="22" fill="#9aa0b2"/>
  <circle cx="414" cy="162" r="42" fill="#0a0a0e"/><circle cx="414" cy="162" r="22" fill="#9aa0b2"/>
</g>
</svg>`

// --- Avion -----------------------------------------------------------------
const cloud = (x: number, y: number, s: number, op = 0.9) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity="${op}"><ellipse rx="100" ry="28"/><ellipse cx="-56" cy="-20" rx="56" ry="28"/><ellipse cx="30" cy="-30" rx="66" ry="34"/></g>`
const PLANE = `${svgOpen}
<style>.c1{animation:dr 70s linear infinite}.c2{animation:dr 110s linear infinite reverse}@keyframes dr{from{transform:translateX(-220px)}to{transform:translateX(220px)}}.pl{animation:bob 6s ease-in-out infinite alternate}@keyframes bob{to{transform:translateY(-14px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f8fe0"/><stop offset="1" stop-color="#d8ecff"/></linearGradient>
<linearGradient id="trail" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g class="c2">${cloud(250, 700, 1.6, 0.7)}${cloud(900, 780, 2, 0.6)}${cloud(1450, 690, 1.4, 0.7)}</g>
<g class="c1">${cloud(180, 260, 1)}${cloud(700, 170, 0.8)}${cloud(1500, 420, 1.1)}</g>
<g class="pl">
  <polygon points="1090,360 1100,330 700,590 690,620" fill="url(#trail)" opacity=".6"/>
  <g transform="translate(1090 240) rotate(-14)">
    <path d="M40 24 L6 -44 L52 -44 L118 18Z" fill="#1e6fd9"/>
    <path d="M200 38 L270 -26 L296 -26 L262 38Z" fill="#dfe7f2" stroke="#b9c6d8" stroke-width="2"/>
    <path d="M0 40 Q10 18 90 14 L340 14 Q410 18 436 40 Q410 62 340 66 L90 66 Q10 62 0 40Z" fill="#fff" stroke="#c9d4e2" stroke-width="2"/>
    <path d="M10 46 L430 46" stroke="#1e6fd9" stroke-width="6"/>
    <path d="M180 50 L300 150 L338 150 L290 50Z" fill="#eef3fa" stroke="#b9c6d8" stroke-width="2"/>
    <ellipse cx="262" cy="104" rx="30" ry="14" fill="#c5d0df"/>
    <g fill="#5a7da8">${Array.from({ length: 14 }, (_, i) => `<circle cx="${110 + i * 16}" cy="32" r="3"/>`).join('')}</g>
    <path d="M392 26 Q420 26 430 38 L392 38Z" fill="#5a7da8"/>
  </g>
</g>
</svg>`

// --- F1 Flèches d'argent ---------------------------------------------------
const FLAG = Array.from({ length: 64 }, (_, i) => {
  const col = i % 32
  const row = Math.floor(i / 32)

  return (col + row) % 2 === 0 ? `<rect x="${col * 50}" y="${row * 50}" width="50" height="50" fill="#fff"/>` : ''
}).join('')
const F1 = `${svgOpen}
<style>.sl{animation:sl 1.1s linear infinite}@keyframes sl{from{transform:translateX(300px);opacity:0}25%{opacity:.7}to{transform:translateX(-500px);opacity:0}}.gl{animation:gl 3s ease-in-out infinite alternate}@keyframes gl{to{opacity:.4}}</style>
<defs>
<pattern id="cf" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#0e1012"/><rect width="7" height="7" fill="#171a1d"/><rect x="7" y="7" width="7" height="7" fill="#171a1d"/></pattern>
<linearGradient id="silver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f4"/><stop offset=".6" stop-color="#aab3b9"/><stop offset="1" stop-color="#6f787e"/></linearGradient>
<linearGradient id="teal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00d2be" stop-opacity="0"/><stop offset=".5" stop-color="#00d2be"/><stop offset="1" stop-color="#00d2be" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#cf)"/>
<g class="gl"><polygon points="0,640 1600,480 1600,520 0,690" fill="url(#teal)" opacity=".5"/></g>
<g transform="translate(800 0) scale(.5)" opacity=".45">${FLAG}</g>
<rect y="740" width="1600" height="160" fill="#08090a"/>
<rect y="738" width="1600" height="5" fill="#00d2be"/>
<g fill="#cfd6da"><rect class="sl" x="900" y="770" width="260" height="3"/><rect class="sl" x="760" y="800" width="340" height="3" style="animation-delay:.35s"/><rect class="sl" x="1100" y="830" width="220" height="3" style="animation-delay:.7s"/></g>
<g transform="translate(600 566) scale(1.15)">
  <path d="M0 140 L30 112 L200 96 L270 70 L350 62 L440 64 L540 96 L660 106 L730 116 L730 140Z" fill="url(#silver)"/>
  <path d="M310 64 Q330 36 380 42 L404 64Z" fill="#1b1f22"/>
  <path d="M300 64 L430 64" stroke="#00d2be" stroke-width="4"/>
  <path d="M60 122 L700 122" stroke="#00d2be" stroke-width="3" opacity=".8"/>
  <rect x="-18" y="34" width="14" height="86" fill="#aab3b9"/><rect x="-44" y="30" width="66" height="10" fill="#00d2be"/><rect x="-44" y="44" width="66" height="6" fill="#d9dfe2"/>
  <rect x="690" y="132" width="110" height="10" fill="#0e1012"/><rect x="690" y="132" width="110" height="3" fill="#00d2be"/>
  <circle cx="150" cy="140" r="40" fill="#0b0c0d"/><circle cx="150" cy="140" r="18" fill="#8b949a"/>
  <circle cx="590" cy="140" r="36" fill="#0b0c0d"/><circle cx="590" cy="140" r="16" fill="#8b949a"/>
</g>
</svg>`

// --- Technologie -----------------------------------------------------------
const tr = rng(19)
const COLUMNS = Array.from({ length: 12 }, (_, i) => {
  const x = 40 + i * 62
  const digits = Array.from({ length: 22 }, () => (tr() < 0.5 ? '0' : '1')).join('')

  return `<text x="${x}" y="40" class="bn" style="animation-duration:${(9 + tr() * 8).toFixed(1)}s;animation-delay:-${(tr() * 9).toFixed(1)}s" writing-mode="vertical-rl">${digits}</text>`
}).join('')
const TECH = `${svgOpen}
<style>.tr{stroke-dasharray:14 12;animation:fl 2.4s linear infinite}@keyframes fl{to{stroke-dashoffset:-52}}.bn{font:16px monospace;fill:#00e5ff;opacity:.35;animation:dn linear infinite}@keyframes dn{from{transform:translateY(-300px)}to{transform:translateY(900px)}}.nd{animation:pu 2.5s ease-in-out infinite alternate}@keyframes pu{to{opacity:.3}}</style>
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#040a12"/><stop offset="1" stop-color="#0a1f33"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#bg)"/>
${COLUMNS}
<g fill="none" stroke="#00e5ff" stroke-width="3" stroke-opacity=".7">
  <path class="tr" d="M1240 300 H1100 V200 H900 V120 H700"/>
  <path class="tr" d="M1240 340 H1020 V260 H820 V180"/>
  <path class="tr" d="M1240 380 H1160 V520 H980 V640 H760"/>
  <path class="tr" d="M1240 420 H1300 V620 H1100 V760"/>
  <path class="tr" d="M1470 300 H1560 V150 H1400"/>
  <path class="tr" d="M1470 420 H1540 V700 H1380 V820"/>
</g>
<g fill="#00e5ff"><circle class="nd" cx="700" cy="120" r="7"/><circle class="nd" cx="820" cy="180" r="7"/><circle class="nd" cx="760" cy="640" r="7"/><circle class="nd" cx="1100" cy="760" r="7"/><circle class="nd" cx="1400" cy="150" r="7"/><circle class="nd" cx="1380" cy="820" r="7"/></g>
<rect x="1240" y="260" width="230" height="200" rx="10" fill="#0c2236" stroke="#00e5ff" stroke-width="3"/>
<rect x="1270" y="290" width="170" height="140" rx="6" fill="none" stroke="#00e5ff" stroke-opacity=".6"/>
<g fill="#00e5ff">${Array.from({ length: 7 }, (_, i) => `<rect x="1226" y="${280 + i * 26}" width="14" height="8"/><rect x="1470" y="${280 + i * 26}" width="14" height="8"/>`).join('')}</g>
<circle cx="1355" cy="360" r="30" fill="#00e5ff" opacity=".25"/><circle cx="1355" cy="360" r="12" fill="#00e5ff"/>
</svg>`

export const VEHICLE_THEMES = [
  scenic({
    id: 'voiture-sport',
    label: 'Voiture de sport',
    description: 'Coupé rouge sur une route de nuit, lumières floues (sombre)',
    accent: '#ff3b30',
    bg: '#14100f',
    mode: 'dark',
    svg: CAR,
    alt: 'Une voiture de sport rouge roulant la nuit',
  }),
  scenic({
    id: 'avion',
    label: 'Avion',
    description: 'Avion de ligne dans le ciel bleu, nuages qui défilent (clair)',
    accent: '#1e6fd9',
    bg: '#e8f1fb',
    mode: 'light',
    svg: PLANE,
    alt: 'Un avion de ligne dans le ciel avec des nuages',
  }),
  scenic({
    id: 'f1-fleches-argent',
    label: 'F1 Flèches d\'argent',
    description: 'Monoplace argent et vert-eau sur fibre de carbone (sombre)',
    accent: '#00d2be',
    bg: '#0e1012',
    mode: 'dark',
    svg: F1,
    alt: 'Une monoplace de course argentée avec des lignes de vitesse',
  }),
  scenic({
    id: 'technologie',
    label: 'Technologie',
    description: 'Circuit imprimé, puce et pluie de 0 et de 1 (sombre)',
    accent: '#00e5ff',
    bg: '#06121c',
    mode: 'dark',
    svg: TECH,
    alt: 'Un circuit électronique lumineux avec des chiffres binaires',
  }),
]
