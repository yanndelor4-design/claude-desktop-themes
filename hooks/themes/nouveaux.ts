import { pines, rng, scenic, stars, svgOpen } from './util.js'

// --- Aurore boréale --------------------------------------------------------
const AURORE = `${svgOpen}
<style>.tw{animation:tw 3.5s ease-in-out infinite alternate}@keyframes tw{to{opacity:.2}}
.a1{animation:sw 14s ease-in-out infinite alternate}.a2{animation:sw 19s ease-in-out infinite alternate-reverse}.a3{animation:sw 23s ease-in-out infinite alternate}
@keyframes sw{from{transform:translateX(-60px) skewX(-4deg);opacity:.5}to{transform:translateX(70px) skewX(5deg);opacity:.95}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020611"/><stop offset="1" stop-color="#0d2236"/></linearGradient>
<linearGradient id="g1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#3dffb0" stop-opacity="0"/><stop offset=".45" stop-color="#3dffb0" stop-opacity=".85"/><stop offset="1" stop-color="#3dffb0" stop-opacity="0"/></linearGradient>
<linearGradient id="g2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7b5cff" stop-opacity="0"/><stop offset=".5" stop-color="#4de1ff" stop-opacity=".7"/><stop offset="1" stop-color="#4de1ff" stop-opacity="0"/></linearGradient>
<filter id="bl" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="16"/></filter>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(130, 61, 520)}
<g filter="url(#bl)">
  <path class="a1" d="M-100 390 C200 150 420 470 700 260 S1200 110 1700 330 L1700 540 C1300 410 1000 540 700 440 S100 580 -100 510Z" fill="url(#g1)"/>
  <path class="a2" d="M-100 300 C250 90 520 330 820 170 S1300 60 1700 220 L1700 400 C1350 300 1000 420 760 330 S200 430 -100 390Z" fill="url(#g2)"/>
  <path class="a3" d="M-100 470 C300 330 560 560 900 400 S1350 300 1700 440 L1700 580 C1350 520 1050 620 850 540 S250 650 -100 600Z" fill="url(#g1)" opacity=".7"/>
</g>
<path d="M0 760 Q300 640 640 720 T1300 700 T1600 740 V900 H0Z" fill="#071827"/>
<path d="M0 830 Q400 770 800 820 T1600 800 V900 H0Z" fill="#0c2236"/>
${pines(800, 24, 210, '#04101c', 71)}
${pines(890, 28, 250, '#030b14', 72)}
<g transform="translate(1240 800)"><rect width="90" height="56" fill="#2a1a12"/><polygon points="-10,0 45,-40 100,0" fill="#e9f2f8"/><rect x="58" y="16" width="20" height="20" fill="#ffd27a"/></g>
</svg>`

// --- Volcan ----------------------------------------------------------------
const vr = rng(81)
const EMBERS = Array.from({ length: 26 }, () => {
  const x = Math.round(1050 + vr() * 280)
  const d = (4 + vr() * 5).toFixed(1)

  return `<circle cx="${x}" cy="420" r="${(1.5 + vr() * 2.5).toFixed(1)}" fill="#ffb347" style="animation:em ${d}s ease-out -${(vr() * 8).toFixed(1)}s infinite"/>`
}).join('')
const VOLCAN = `${svgOpen}
<style>@keyframes em{from{transform:translate(0,0);opacity:1}to{transform:translate(${'-40'}px,-380px);opacity:0}}
.sm{animation:sm 12s ease-in-out infinite alternate}@keyframes sm{from{transform:translate(0,0) scale(1);opacity:.35}to{transform:translate(40px,-60px) scale(1.25);opacity:.15}}
.lv{stroke-dasharray:26 14;animation:lv 2.2s linear infinite}@keyframes lv{to{stroke-dashoffset:-80}}.gl{animation:gl 2.6s ease-in-out infinite alternate}@keyframes gl{to{opacity:.55}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0407"/><stop offset=".6" stop-color="#3a0f14"/><stop offset="1" stop-color="#b3341a"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#ff8a3d" stop-opacity=".8"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
<filter id="bl"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(60, 5, 300)}
<g fill="#6b5a5a"><ellipse class="sm" cx="1190" cy="330" rx="150" ry="70"/><ellipse class="sm" cx="1250" cy="250" rx="190" ry="80" style="animation-delay:-4s"/><ellipse class="sm" cx="1160" cy="170" rx="230" ry="90" style="animation-delay:-8s"/></g>
<ellipse class="gl" cx="1190" cy="410" rx="260" ry="120" fill="url(#glow)"/>
<polygon points="750,900 1040,430 1100,400 1280,400 1340,430 1630,900" fill="#1a0c0a"/>
<polygon points="1040,430 1100,400 1190,420 1130,470" fill="#2b1512"/>
<ellipse cx="1190" cy="404" rx="95" ry="16" fill="#ff7a2b"/>
<g fill="none" stroke="#ff5a1a" stroke-width="9" stroke-linecap="round" filter="url(#bl)">
  <path class="lv" d="M1160 412 Q1100 520 1130 620 T1070 820"/>
  <path class="lv" d="M1200 414 Q1230 540 1190 650 T1240 860" style="animation-delay:-.8s"/>
  <path class="lv" d="M1240 410 Q1330 500 1310 620 T1390 800" style="animation-delay:-1.4s"/>
</g>
${EMBERS}
<path d="M0 820 Q400 760 800 810 T1600 790 V900 H0Z" fill="#0b0506"/>
<g fill="#050203"><polygon points="60,900 130,760 190,900"/><polygon points="170,900 260,720 340,900"/><polygon points="1450,900 1520,770 1600,900"/></g>
</svg>`

// --- Jungle ----------------------------------------------------------------
const jr = rng(91)
const FIREFLIES = Array.from({ length: 18 }, (_, i) => {
  const x = Math.round(jr() * 1500 + 50)
  const y = Math.round(300 + jr() * 480)

  return `<circle cx="${x}" cy="${y}" r="3" fill="#d9ff7a" style="animation:ff ${(3 + jr() * 4).toFixed(1)}s ease-in-out ${(i * 0.5).toFixed(1)}s infinite alternate"/>`
}).join('')
const leaf = (x: number, y: number, rot: number, s: number, fill: string) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C60 -50 200 -60 320 -10 C220 20 80 40 0 0Z" fill="${fill}"/><path d="M0 0 C100 -10 220 -20 320 -10" stroke="#0b3a1c" stroke-width="3" fill="none"/></g>`
const JUNGLE = `${svgOpen}
<style>@keyframes ff{from{opacity:.1;transform:translate(0,0)}to{opacity:1;transform:translate(20px,-26px)}}.ray{animation:ra 7s ease-in-out infinite alternate}@keyframes ra{to{opacity:.25}}
.vn{animation:vn 5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:top}@keyframes vn{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c7a43"/><stop offset=".5" stop-color="#0f3d24"/><stop offset="1" stop-color="#03150b"/></linearGradient>
<linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaffb0" stop-opacity=".5"/><stop offset="1" stop-color="#eaffb0" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#bg)"/>
<g fill="url(#ray)"><polygon class="ray" points="300,0 420,0 760,900 520,900"/><polygon class="ray" points="760,0 860,0 1180,900 1000,900" style="animation-delay:-2s"/><polygon class="ray" points="1180,0 1260,0 1500,900 1340,900" style="animation-delay:-4s"/></g>
<g fill="#06210f"><rect x="90" y="0" width="70" height="900"/><rect x="1380" y="0" width="90" height="900"/><rect x="640" y="0" width="34" height="900" opacity=".6"/></g>
${leaf(60, 220, -20, 1.2, '#1f7a3a')}${leaf(40, 420, 8, 1.4, '#1a6a32')}${leaf(1560, 260, 200, 1.2, '#1f7a3a')}${leaf(1580, 460, 172, 1.4, '#1a6a32')}
${leaf(120, 640, -30, 1.5, '#145a2b')}${leaf(1500, 660, 210, 1.5, '#145a2b')}
<g stroke="#0e4a24" stroke-width="6" fill="none" stroke-linecap="round"><path class="vn" d="M300 0 C280 120 330 200 300 330"/><path class="vn" d="M520 0 C560 100 500 220 540 300" style="animation-delay:-2s"/><path class="vn" d="M1100 0 C1060 130 1130 210 1090 340" style="animation-delay:-3s"/><path class="vn" d="M1300 0 C1330 90 1280 200 1310 280" style="animation-delay:-1s"/></g>
<path d="M0 820 Q300 760 640 810 T1300 800 T1600 820 V900 H0Z" fill="#04170c"/>
<g fill="#0b3a1c"><path d="M40 900 C80 780 140 760 190 800 C150 820 110 860 100 900Z"/><path d="M1400 900 C1440 790 1500 770 1560 810 C1520 830 1480 870 1470 900Z"/></g>
${FIREFLIES}
</svg>`

// --- Pyramides au crépuscule ----------------------------------------------
const pyr = (x: number, base: number, w: number, h: number) =>
  `<polygon points="${x - w / 2},${base} ${x},${base - h} ${x},${base}" fill="#e0a060"/><polygon points="${x},${base - h} ${x + w / 2},${base} ${x},${base}" fill="#6a3a34"/>`
const PYRAMIDES = `${svgOpen}
<style>.tw{animation:tw 3s ease-in-out infinite alternate}@keyframes tw{to{opacity:.15}}.cv{animation:cv 40s linear infinite}@keyframes cv{from{transform:translateX(-60px)}to{transform:translateX(160px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#150d33"/><stop offset=".5" stop-color="#6b2f5e"/><stop offset=".8" stop-color="#d4624a"/><stop offset="1" stop-color="#ffb36b"/></linearGradient>
<linearGradient id="dune" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c07a45"/><stop offset="1" stop-color="#6a3a2a"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(80, 33, 380)}
<circle cx="330" cy="190" r="56" fill="#fff0d0" opacity=".92"/>
${pyr(1200, 700, 560, 380)}${pyr(1500, 700, 380, 250)}${pyr(930, 700, 260, 170)}
<path d="M0 700 Q400 650 800 700 T1600 680 V900 H0Z" fill="url(#dune)"/>
<path d="M0 800 Q500 740 1000 800 T1600 770 V900 H0Z" fill="#4a2420"/>
<g class="cv" fill="#1a0c10"><path d="M200 700 q8 -26 18 -26 q10 0 12 -18 l6 6 q-2 26 4 38 z"/><path d="M290 702 q8 -26 18 -26 q10 0 12 -18 l6 6 q-2 26 4 38 z"/><path d="M380 704 q8 -26 18 -26 q10 0 12 -18 l6 6 q-2 26 4 38 z"/></g>
<g transform="translate(120 820)"><path d="M20 80 Q24 20 16 -40" stroke="#120808" stroke-width="9" fill="none" stroke-linecap="round"/><g stroke="#120808" stroke-width="7" fill="none" stroke-linecap="round"><path d="M16 -40 Q-30 -60 -60 -30"/><path d="M16 -40 Q-10 -80 -50 -80"/><path d="M16 -40 Q50 -80 90 -62"/><path d="M16 -40 Q60 -50 80 -16"/></g></g>
</svg>`

// --- Circuit de F1 la nuit -------------------------------------------------
const fr = rng(101)
const STANDS = Array.from({ length: 70 }, (_, i) => {
  const lit = fr() < 0.55

  return lit ? `<rect x="${1040 + (i % 14) * 34}" y="${510 + Math.floor(i / 14) * 24}" width="10" height="10" fill="${fr() < 0.5 ? '#ffd27a' : '#cfe6ff'}" opacity=".85"/>` : ''
}).join('')
const track = 'M-100 790 Q300 690 760 740 T1700 650'
const CIRCUIT = `${svgOpen}
<style>.tr{stroke-dasharray:90 560;animation:tr 3.2s linear infinite}@keyframes tr{from{stroke-dashoffset:650}to{stroke-dashoffset:-650}}.fl{animation:fl 3s ease-in-out infinite alternate}@keyframes fl{to{opacity:.6}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04060c"/><stop offset="1" stop-color="#14203a"/></linearGradient>
<radialGradient id="lamp"><stop offset="0" stop-color="#fff6d0" stop-opacity=".9"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient>
<filter id="bl"><feGaussianBlur stdDeviation="4"/></filter>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(50, 8, 260)}
<rect x="1010" y="490" width="520" height="150" fill="#0c1220"/><polygon points="1010,490 1530,490 1560,470 990,470" fill="#161e30"/>${STANDS}
<g fill="#0a0e18"><rect x="196" y="260" width="8" height="500"/><rect x="696" y="300" width="8" height="460"/></g>
<g class="fl"><circle cx="200" cy="260" r="150" fill="url(#lamp)"/><circle cx="700" cy="300" r="130" fill="url(#lamp)"/></g>
<g fill="#fff6d0"><rect x="170" y="252" width="60" height="12" rx="3"/><rect x="670" y="292" width="60" height="12" rx="3"/></g>
<path d="M0 700 Q300 650 800 690 T1600 640 V900 H0Z" fill="#0a1220"/>
<path d="${track}" stroke="#e8e8f0" stroke-width="150" stroke-dasharray="36 36" fill="none" opacity=".9"/>
<path d="${track}" stroke="#d8191c" stroke-width="150" stroke-dasharray="36 36" stroke-dashoffset="36" fill="none"/>
<path d="${track}" stroke="#1b2030" stroke-width="126" fill="none"/>
<path d="${track}" stroke="#d5d9e6" stroke-width="4" stroke-dasharray="30 34" fill="none" opacity=".7"/>
<g fill="none" stroke-linecap="round" filter="url(#bl)"><path class="tr" d="${track}" stroke="#ff3030" stroke-width="10"/><path class="tr" d="${track}" stroke="#2bd9c2" stroke-width="8" style="animation-delay:-1.1s"/></g>
</svg>`

export const NEW_THEMES = [
  scenic({
    id: 'aurore-boreale',
    label: 'Aurore boréale',
    description: 'Rubans verts et bleus dans le ciel, sapins et chalet (sombre)',
    accent: '#3dffb0',
    bg: '#06121f',
    mode: 'dark',
    svg: AURORE,
    alt: 'Une aurore boréale au-dessus de sapins et d\'un chalet enneigé',
  }),
  scenic({
    id: 'volcan',
    label: 'Volcan',
    description: 'Cratère incandescent, coulées de lave et braises (sombre)',
    accent: '#ff6a2b',
    bg: '#1a0a08',
    mode: 'dark',
    svg: VOLCAN,
    alt: 'Un volcan en éruption avec de la lave et des braises',
  }),
  scenic({
    id: 'jungle',
    label: 'Jungle',
    description: 'Grandes feuilles, lianes, rayons de soleil et lucioles (sombre)',
    accent: '#7bdc4a',
    bg: '#0a1f12',
    mode: 'dark',
    svg: JUNGLE,
    alt: 'Une jungle dense avec des feuilles, des lianes et des rayons de lumière',
  }),
  scenic({
    id: 'pyramides',
    label: 'Pyramides',
    description: 'Les pyramides au crépuscule, caravane de chameaux (sombre)',
    accent: '#ffb36b',
    bg: '#1a1038',
    mode: 'dark',
    svg: PYRAMIDES,
    alt: 'Les pyramides d\'Égypte au crépuscule avec une caravane de chameaux',
  }),
  scenic({
    id: 'circuit-f1-nuit',
    label: 'Circuit F1 de nuit',
    description: 'Piste éclairée, vibreurs rouges et blancs, tribunes (sombre)',
    accent: '#ff3030',
    bg: '#0a0d14',
    mode: 'dark',
    svg: CIRCUIT,
    alt: 'Un circuit de course la nuit avec des projecteurs et des tribunes',
  }),
]
