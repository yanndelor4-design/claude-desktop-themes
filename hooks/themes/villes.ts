import { rng, scenic, stars, svgOpen } from './util.js'

// --- Monuments : Paris au crépuscule --------------------------------------
const pr = rng(31)
const HAUSSMANN = Array.from({ length: 14 }, (_, i) => {
  const x = i * 62
  const h = 120 + Math.round(pr() * 90)
  const win = Array.from({ length: 6 }, (_, k) => {
    const lit = pr() < 0.55

    return `<rect x="${x + 8 + (k % 3) * 16}" y="${900 - h + 16 + Math.floor(k / 3) * 34}" width="9" height="16" fill="${lit ? '#ffd27a' : '#2a2f5c'}"/>`
  }).join('')

  return `<rect x="${x}" y="${900 - h}" width="60" height="${h}" fill="#171a3a"/><polygon points="${x},${900 - h} ${x + 60},${900 - h} ${x + 52},${900 - h - 18} ${x + 8},${900 - h - 18}" fill="#222654"/>${win}`
}).join('')
const PARIS = `${svgOpen}
<style>.tw{animation:tw 3s ease-in-out infinite alternate}@keyframes tw{to{opacity:.15}}.bc{animation:bc 2s ease-in-out infinite alternate}@keyframes bc{to{opacity:.2}}.sp{animation:sp 1.6s steps(2) infinite}@keyframes sp{50%{opacity:.4}}</style>
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121538"/><stop offset=".55" stop-color="#5a2f6e"/><stop offset=".85" stop-color="#f08a5d"/><stop offset="1" stop-color="#ffc27a"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(60, 13, 360)}
<g transform="translate(0 0)">${HAUSSMANN}</g>
<g transform="translate(1250 0)">
  <polygon points="0,290 8,380 16,380 28,470 46,470 66,600 98,600 128,900 40,900 26,790 -26,790 -40,900 -128,900 -98,600 -66,600 -46,470 -28,470 -16,380 -8,380" fill="#0c0e24"/>
  <g stroke="#2c3170" stroke-width="3" fill="none"><path d="M-8 380 L28 470 M8 380 L-28 470"/><path d="M-28 470 L66 600 M28 470 L-66 600"/><path d="M-66 600 L-26 790 M66 600 L26 790"/><path d="M-98 600 H98 M-26 790 H26"/></g>
  <path d="M-40 900 Q0 760 40 900Z" fill="#ffc27a" opacity=".25"/>
  <circle class="bc" cx="0" cy="288" r="8" fill="#ffe9a8"/>
  <g class="sp" fill="#ffe9a8"><circle cx="-4" cy="420" r="3"/><circle cx="14" cy="540" r="3"/><circle cx="-36" cy="700" r="3"/><circle cx="44" cy="700" r="3"/></g>
</g>
<rect y="880" width="1600" height="20" fill="#0c0e24"/>
</svg>`

// --- Rue de nuit sous la pluie --------------------------------------------
const sr = rng(43)
const building = (x: number, w: number, top: number) => {
  const cols = Math.floor(w / 30)
  const rows = Math.floor((900 - top) / 44)
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const lit = sr() < 0.45

    return lit
      ? `<rect x="${x + 10 + (i % cols) * 30}" y="${top + 14 + Math.floor(i / cols) * 44}" width="14" height="22" fill="${sr() < 0.7 ? '#ffd27a' : '#7fd8ff'}" opacity=".85"/>`
      : ''
  }).join('')

  return `<rect x="${x}" y="${top}" width="${w}" height="${900 - top}" fill="#10112a"/>${cells}`
}
const RAIN = Array.from({ length: 70 }, () => {
  const x = Math.round(sr() * 1600)
  const y = Math.round(sr() * 900)
  const d = (0.5 + sr() * 0.5).toFixed(2)

  return `<line x1="${x}" y1="${y}" x2="${x - 6}" y2="${y + 28}" style="animation:rn ${d}s linear infinite;animation-delay:-${(sr() * 1).toFixed(2)}s"/>`
}).join('')
const STREET = `${svgOpen}
<style>@keyframes rn{from{transform:translateY(-120px)}to{transform:translateY(900px)}}.ng{animation:ng 3s ease-in-out infinite alternate}@keyframes ng{to{opacity:.55}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05050f"/><stop offset="1" stop-color="#241046"/></linearGradient>
<linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1633"/><stop offset="1" stop-color="#0a0818"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${building(0, 150, 280)}${building(150, 120, 420)}${building(270, 170, 220)}${building(1160, 170, 260)}${building(1330, 120, 400)}${building(1450, 150, 200)}
<polygon points="440,900 600,560 1000,560 1160,900" fill="url(#road)"/>
<g class="ng"><rect x="228" y="330" width="14" height="110" fill="#ff4fd8"/><rect x="1196" y="320" width="14" height="100" fill="#4df0ff"/><rect x="1380" y="470" width="60" height="12" fill="#ffd24d"/><rect x="60" y="360" width="60" height="12" fill="#4df0ff"/></g>
<g stroke="#ff4fd8" stroke-opacity=".25" stroke-width="40"><line x1="235" y1="700" x2="235" y2="900"/></g>
<g stroke="#4df0ff" stroke-opacity=".22" stroke-width="40"><line x1="1203" y1="700" x2="1203" y2="900"/></g>
<g stroke="#cfd8ff" stroke-opacity=".5" stroke-width="2">${RAIN}</g>
</svg>`

// --- Gratte-ciel de jour ---------------------------------------------------
const gr = rng(57)
const towers = (base: number, fill: string, step: number, op: number) =>
  Array.from({ length: Math.ceil(1700 / step) }, (_, i) => {
    const x = i * step - 40
    const mid = Math.abs(x + step / 2 - 800) / 800
    const h = Math.round(base + mid * 380 * (0.5 + gr() * 0.7) + gr() * 40)
    const w = step - 6 + Math.round(gr() * 10)

    return `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${fill}" opacity="${op}"/><rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="url(#win)" opacity="${op}"/>`
  }).join('')
const SKYLINE = `${svgOpen}
<style>.cl{animation:dr 90s linear infinite}@keyframes dr{from{transform:translateX(-200px)}to{transform:translateX(200px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa7e8"/><stop offset="1" stop-color="#f3f8ff"/></linearGradient>
<pattern id="win" width="18" height="24" patternUnits="userSpaceOnUse"><rect x="3" y="4" width="10" height="14" fill="#e9f5ff" opacity=".7"/></pattern>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<circle cx="1280" cy="170" r="70" fill="#fff" opacity=".8"/>
<g class="cl" fill="#fff" opacity=".85"><ellipse cx="300" cy="170" rx="110" ry="28"/><ellipse cx="250" cy="150" rx="56" ry="28"/><ellipse cx="900" cy="120" rx="90" ry="24"/></g>
${towers(300, '#9db8d6', 72, 0.9)}
${towers(200, '#5d82ad', 90, 1)}
${towers(110, '#2f4f78', 110, 1)}
</svg>`

export const CITY_THEMES = [
  scenic({
    id: 'monuments-paris',
    label: 'Monuments (Paris)',
    description: 'Tour Eiffel au crépuscule, toits de Paris éclairés (sombre)',
    accent: '#ffcc66',
    bg: '#141a33',
    mode: 'dark',
    svg: PARIS,
    alt: 'La Tour Eiffel au crépuscule au-dessus des toits de Paris',
  }),
  scenic({
    id: 'rue-nuit',
    label: 'Rue de nuit',
    description: 'Rue sous la pluie, néons roses et cyan, fenêtres allumées (sombre)',
    accent: '#ff4fd8',
    bg: '#0b0c1a',
    mode: 'dark',
    svg: STREET,
    alt: 'Une rue de nuit sous la pluie avec des néons',
  }),
  scenic({
    id: 'gratte-ciel',
    label: 'Gratte-ciel',
    description: 'Skyline de tours de verre en plein jour (clair)',
    accent: '#2b6cb0',
    bg: '#e8eef5',
    mode: 'light',
    svg: SKYLINE,
    alt: 'Une skyline de gratte-ciel de verre sous un ciel bleu',
  }),
]
