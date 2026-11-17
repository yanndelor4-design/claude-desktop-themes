import { rng, scenic, stars, svgOpen } from './util.js'

const f1 = (n: number) => Math.round(n * 10) / 10

// --- Cottage féerique ------------------------------------------------------
const cr = rng(201)
const FLOWERS = Array.from({ length: 34 }, () => {
  const x = Math.round(cr() * 1600)
  const y = Math.round(800 + cr() * 90)
  const h = Math.round(30 + cr() * 50)
  const c = ['#ff9ad5', '#c58bff', '#ffe27a', '#9ad9ff', '#ffffff'][Math.floor(cr() * 5)]

  return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - h}" stroke="#2f6a4a" stroke-width="3"/><circle cx="${x}" cy="${y - h}" r="${f1(6 + cr() * 6)}" fill="${c}"/><circle cx="${x}" cy="${y - h}" r="3" fill="#fff6c8"/>`
}).join('')
const BULBS = Array.from({ length: 18 }, (_, i) => {
  const x = 60 + i * 90
  const y = Math.round(70 + Math.sin(i * 0.9) * 22 + (i % 2) * 8)

  return `<circle class="tw" cx="${x}" cy="${y}" r="6" fill="${['#ffd27a', '#ff9ad5', '#9ad9ff'][i % 3]}" style="animation-delay:-${(i * 0.37).toFixed(2)}s"/>`
}).join('')
const FAIRIES = Array.from({ length: 20 }, (_, i) => {
  const x = Math.round(cr() * 1500 + 50)
  const y = Math.round(380 + cr() * 420)

  return `<circle cx="${x}" cy="${y}" r="3" fill="#e9ffa0" style="animation:ff ${(3 + cr() * 4).toFixed(1)}s ease-in-out ${(i * 0.4).toFixed(1)}s infinite alternate"/>`
}).join('')
const COTTAGE = `${svgOpen}
<style>.tw{animation:tw 2.6s ease-in-out infinite alternate}@keyframes tw{to{opacity:.25}}@keyframes ff{from{opacity:.1;transform:translate(0,0)}to{opacity:1;transform:translate(18px,-24px)}}
.sm{animation:sm 9s ease-in-out infinite alternate}@keyframes sm{from{transform:translate(0,0);opacity:.55}to{transform:translate(26px,-56px);opacity:.1}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1040"/><stop offset=".6" stop-color="#5a2f7a"/><stop offset="1" stop-color="#e59ac4"/></linearGradient>
<radialGradient id="mg"><stop offset="0" stop-color="#fff3d6" stop-opacity=".7"/><stop offset="1" stop-color="#fff3d6" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
${stars(70, 202, 380)}
<circle cx="1250" cy="170" r="130" fill="url(#mg)"/><circle cx="1250" cy="170" r="50" fill="#fff3d6"/>
<path d="M0 640 Q300 540 640 620 T1300 590 T1600 640 V900 H0Z" fill="#2c1b52"/>
<path d="M0 760 Q400 690 800 750 T1600 720 V900 H0Z" fill="#1f3a3f"/>
<g transform="translate(260 560)">
  <rect x="0" y="60" width="270" height="150" fill="#6a4258"/>
  <path d="M-30 70 Q135 -50 300 70 Q250 50 135 22 Q20 50 -30 70Z" fill="#a07a4e"/>
  <rect x="200" y="-10" width="34" height="70" fill="#4a2c40"/>
  <g class="sm" fill="#d9cce8"><circle cx="217" cy="-24" r="14"/><circle cx="228" cy="-52" r="18" opacity=".7"/></g>
  <rect x="30" y="100" width="56" height="60" rx="4" fill="#ffd27a"/><path d="M58 100 V160 M30 130 H86" stroke="#6a4258" stroke-width="4"/>
  <rect x="170" y="100" width="56" height="60" rx="4" fill="#ffd27a"/><path d="M198 100 V160 M170 130 H226" stroke="#6a4258" stroke-width="4"/>
  <path d="M108 210 V150 Q135 122 162 150 V210Z" fill="#3a2036"/>
</g>
<path d="M380 770 Q520 740 640 800 T900 900" stroke="#d9b98a" stroke-width="40" fill="none" opacity=".55"/>
${FLOWERS}
<path d="M0 60 Q400 120 800 70 T1600 80" stroke="#c9b4e0" stroke-width="3" fill="none"/>
${BULBS}
${FAIRIES}
</svg>`

// --- Automne cosy ----------------------------------------------------------
const ar = rng(211)
const CANOPY = (x: number, y: number, s: number) =>
  Array.from({ length: 9 }, (_, i) => {
    const cx = f1(x + (ar() - 0.5) * 220 * s)
    const cy = f1(y + (ar() - 0.5) * 130 * s)

    return `<circle cx="${cx}" cy="${cy}" r="${f1((50 + ar() * 50) * s)}" fill="${['#d9541f', '#f08a24', '#f5b73a', '#b8381e'][i % 4]}" opacity=".92"/>`
  }).join('')
const LEAVES = Array.from({ length: 30 }, (_, i) => {
  const x = Math.round(ar() * 1600)

  return `<ellipse cx="${x}" cy="-20" rx="9" ry="5" fill="${['#f08a24', '#d9541f', '#f5b73a'][i % 3]}" style="animation:lf ${(8 + ar() * 7).toFixed(1)}s linear -${(ar() * 12).toFixed(1)}s infinite"/>`
}).join('')
const AUTOMNE = `${svgOpen}
<style>@keyframes lf{from{transform:translate(0,0) rotate(0)}50%{transform:translate(-80px,500px) rotate(180deg)}to{transform:translate(30px,960px) rotate(360deg)}}
.sm{animation:sm 10s ease-in-out infinite alternate}@keyframes sm{from{transform:translate(0,0);opacity:.5}to{transform:translate(30px,-60px);opacity:.1}}.gl{animation:gl 3s ease-in-out infinite alternate}@keyframes gl{to{opacity:.7}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b1a2a"/><stop offset=".55" stop-color="#c8602a"/><stop offset="1" stop-color="#ffcf7a"/></linearGradient>
<radialGradient id="gw"><stop offset="0" stop-color="#ffd27a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<circle cx="800" cy="640" r="150" fill="#ffe3a0" opacity=".7"/>
<g fill="#3a1e14"><rect x="170" y="330" width="46" height="560"/><rect x="1380" y="300" width="52" height="600"/></g>
${CANOPY(190, 300, 1.6)}${CANOPY(1405, 290, 1.7)}${CANOPY(760, 470, 0.9)}${CANOPY(1010, 500, 0.8)}
<path d="M0 760 Q400 690 800 750 T1600 720 V900 H0Z" fill="#4a2414"/>
<g transform="translate(1000 640)"><rect width="150" height="100" fill="#6a3a22"/><polygon points="-14,0 75,-60 164,0" fill="#3a1e14"/><rect x="104" y="-50" width="22" height="40" fill="#3a1e14"/>
<g class="sm" fill="#e8d4c0"><circle cx="115" cy="-62" r="12"/><circle cx="124" cy="-88" r="16" opacity=".7"/></g>
<rect x="24" y="30" width="44" height="40" rx="3" fill="#ffd27a"/><circle class="gl" cx="46" cy="50" r="64" fill="url(#gw)"/><rect x="96" y="40" width="34" height="60" fill="#3a1e14"/></g>
<g><ellipse cx="260" cy="840" rx="48" ry="38" fill="#e8741c"/><path d="M232 818 Q260 880 288 818 M246 810 Q260 884 274 810" stroke="#b8501a" stroke-width="3" fill="none"/><rect x="256" y="796" width="8" height="16" fill="#3a5a2a"/><ellipse cx="352" cy="852" rx="34" ry="28" fill="#f08a24"/><ellipse cx="200" cy="858" rx="26" ry="22" fill="#d9541f"/></g>
${LEAVES}
</svg>`

// --- Rêve pastel -----------------------------------------------------------
const pr = rng(221)
const sparkle = (x: number, y: number, s: number, delay: number) =>
  `<path class="sp" d="M${x} ${y - 20 * s} Q${x} ${y} ${x + 20 * s} ${y} Q${x} ${y} ${x} ${y + 20 * s} Q${x} ${y} ${x - 20 * s} ${y} Q${x} ${y} ${x} ${y - 20 * s}Z" fill="#fff" style="animation-delay:-${delay}s"/>`
const SPARKLES = Array.from({ length: 22 }, (_, i) => sparkle(Math.round(pr() * 1560 + 20), Math.round(pr() * 860 + 20), f1(0.5 + pr() * 1.1), f1(pr() * 4))).join('')
const BUBBLES = Array.from({ length: 14 }, () => `<circle cx="${Math.round(pr() * 1600)}" cy="${Math.round(pr() * 900)}" r="${Math.round(10 + pr() * 40)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>`).join('')
const pastelCloud = (x: number, y: number, s: number, fill: string) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}"><ellipse rx="130" ry="36"/><ellipse cx="-70" cy="-26" rx="70" ry="38"/><ellipse cx="40" cy="-40" rx="86" ry="46"/></g>`
const REVE = `${svgOpen}
<style>.sp{animation:sp 3s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}@keyframes sp{from{opacity:.2;transform:scale(.6)}to{opacity:1;transform:scale(1.15)}}
.c1{animation:dr 70s linear infinite}.c2{animation:dr 100s linear infinite reverse}@keyframes dr{from{transform:translateX(-200px)}to{transform:translateX(200px)}}</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd0ea"/><stop offset=".5" stop-color="#d9c8ff"/><stop offset="1" stop-color="#bfe6ff"/></linearGradient>
<radialGradient id="sun"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#bg)"/>
<circle cx="1250" cy="230" r="300" fill="url(#sun)"/>
${BUBBLES}
<g class="c2" opacity=".85">${pastelCloud(260, 700, 1.7, '#fff0fa')}${pastelCloud(1000, 800, 2, '#f4eaff')}${pastelCloud(1480, 640, 1.4, '#e8f6ff')}</g>
<g class="c1">${pastelCloud(380, 200, 1.1, '#ffffff')}${pastelCloud(900, 130, 0.9, '#fff5fb')}${pastelCloud(1400, 420, 1.2, '#ffffff')}</g>
${SPARKLES}
</svg>`

// --- Vaporwave -------------------------------------------------------------
const FLOOR_BANDS = Array.from({ length: 9 }, (_, i) => {
  const y0 = 600 + i * i * 3.7 + i * 8
  const y1 = 600 + (i + 1) * (i + 1) * 3.7 + (i + 1) * 8

  return `<rect y="${f1(y0)}" width="1600" height="${f1(y1 - y0 + 1)}" fill="${i % 2 ? '#3d1a73' : '#2b1055'}"/>`
}).join('')
const FLOOR_LINES = Array.from({ length: 21 }, (_, i) => `<line x1="800" y1="600" x2="${-1600 + i * 160}" y2="900" stroke="#01cdfe" stroke-opacity=".5" stroke-width="2"/>`).join('')
const column = (x: number) =>
  `<g transform="translate(${x} 330)"><rect x="-6" y="0" width="132" height="26" rx="6" fill="#ffd1f0"/><rect x="10" y="26" width="100" height="330" fill="#fce3f6"/><path d="M30 26 V356 M52 26 V356 M74 26 V356 M96 26 V356" stroke="#e7b6dc" stroke-width="4"/><rect x="-6" y="356" width="132" height="26" rx="6" fill="#ffd1f0"/></g>`
const palm = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q20 -120 -6 -250" stroke="#14072e" stroke-width="14" fill="none" stroke-linecap="round"/><g stroke="#14072e" stroke-width="10" fill="none" stroke-linecap="round"><path d="M-6 -250 Q-70 -270 -110 -220"/><path d="M-6 -250 Q-50 -310 -110 -300"/><path d="M-6 -250 Q40 -310 100 -290"/><path d="M-6 -250 Q60 -260 110 -210"/></g></g>`
const VAPOR = `${svgOpen}
<style>.fl{animation:fl 6s ease-in-out infinite alternate}@keyframes fl{to{transform:translateY(-22px) rotate(8deg)}}.fl2{animation:fl 8s ease-in-out infinite alternate-reverse}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1055"/><stop offset=".6" stop-color="#8a2f9a"/><stop offset="1" stop-color="#ff71ce"/></linearGradient>
<linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffb96"/><stop offset="1" stop-color="#ff71ce"/></linearGradient>
<mask id="cut"><rect width="1600" height="900" fill="#fff"/><rect y="440" width="1600" height="8" fill="#000"/><rect y="478" width="1600" height="12" fill="#000"/><rect y="520" width="1600" height="16" fill="#000"/><rect y="566" width="1600" height="20" fill="#000"/></mask>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<circle cx="1120" cy="420" r="190" fill="url(#sun)" mask="url(#cut)"/>
${FLOOR_BANDS}${FLOOR_LINES}
<line x1="0" y1="600" x2="1600" y2="600" stroke="#01cdfe" stroke-width="3"/>
${column(120)}${column(300)}
${palm(1400, 640, 1.4)}${palm(1530, 690, 1)}
<g class="fl"><polygon points="640,160 700,260 580,260" fill="none" stroke="#01cdfe" stroke-width="5"/></g>
<g class="fl2"><circle cx="820" cy="210" r="30" fill="none" stroke="#fffb96" stroke-width="5"/><circle cx="820" cy="210" r="14" fill="#ff71ce"/></g>
<g class="fl"><rect x="1330" y="150" width="60" height="60" fill="none" stroke="#b967ff" stroke-width="5" transform="rotate(20 1360 180)"/></g>
</svg>`

// --- Cyberpunk -------------------------------------------------------------
const kr = rng(231)
const TOWERS = Array.from({ length: 14 }, (_, i) => {
  const mid = Math.abs(i * 120 + 60 - 800) / 800
  const x = i * 120 - 10
  const h = Math.round(260 + mid * 420 * (0.5 + kr() * 0.7))
  const edge = ['#00f0ff', '#ff2bd6', '#b967ff'][i % 3]
  const win = Array.from({ length: Math.floor(h / 36) * 3 }, (_, k) =>
    kr() < 0.2 ? `<rect x="${x + 12 + (k % 3) * 30}" y="${900 - h + 12 + Math.floor(k / 3) * 36}" width="12" height="16" fill="${kr() < 0.5 ? edge : '#ffe27a'}" opacity=".8"/>` : '',
  ).join('')

  return `<rect x="${x}" y="${900 - h}" width="110" height="${h}" fill="#0b0716"/><rect x="${x}" y="${900 - h}" width="4" height="${h}" fill="${edge}" opacity=".9"/>${win}`
}).join('')
const RAIN = Array.from({ length: 60 }, () => {
  const x = Math.round(kr() * 1600)

  return `<line x1="${x}" y1="0" x2="${x - 8}" y2="34" style="animation:rn ${(0.5 + kr() * 0.6).toFixed(2)}s linear -${(kr() * 1).toFixed(2)}s infinite"/>`
}).join('')
const CYBER = `${svgOpen}
<style>@keyframes rn{from{transform:translateY(-60px)}to{transform:translateY(920px)}}.bb{animation:bb 3.4s ease-in-out infinite alternate}@keyframes bb{to{opacity:.55}}.car{animation:cr 12s linear infinite}@keyframes cr{from{transform:translateX(-200px)}to{transform:translateX(1800px)}}.car2{animation:cr 17s linear -6s infinite}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07040f"/><stop offset=".6" stop-color="#1c0b35"/><stop offset="1" stop-color="#5a0f55"/></linearGradient>
<linearGradient id="ad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00f0ff"/><stop offset="1" stop-color="#ff2bd6"/></linearGradient>
<filter id="bl"><feGaussianBlur stdDeviation="10"/></filter>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g filter="url(#bl)" opacity=".7"><ellipse cx="400" cy="640" rx="360" ry="120" fill="#ff2bd6" opacity=".35"/><ellipse cx="1250" cy="600" rx="380" ry="130" fill="#00f0ff" opacity=".3"/></g>
${TOWERS}
<g class="bb"><rect x="1150" y="300" width="150" height="230" fill="url(#ad)" opacity=".85"/><rect x="1166" y="318" width="118" height="12" fill="#07040f"/><rect x="1166" y="346" width="80" height="8" fill="#07040f"/><rect x="90" y="340" width="120" height="180" fill="url(#ad)" opacity=".8"/><rect x="106" y="358" width="88" height="10" fill="#07040f"/></g>
<g class="car"><ellipse cx="0" cy="180" rx="26" ry="8" fill="#00f0ff"/><rect x="-90" y="177" width="64" height="4" fill="#00f0ff" opacity=".5"/></g>
<g class="car2"><ellipse cx="0" cy="250" rx="22" ry="7" fill="#ff2bd6"/><rect x="-80" y="247" width="58" height="4" fill="#ff2bd6" opacity=".5"/></g>
<rect y="840" width="1600" height="60" fill="#0b0716"/><rect y="840" width="1600" height="3" fill="#00f0ff" opacity=".7"/>
<g stroke="#bfe6ff" stroke-opacity=".5" stroke-width="2">${RAIN}</g>
</svg>`

// --- Japandi (minimaliste) -------------------------------------------------
const JAPANDI = `${svgOpen}
<style>.sn{animation:sn 9s ease-in-out infinite alternate}@keyframes sn{to{opacity:.8;transform:scale(1.03)}}.sn{transform-box:fill-box;transform-origin:center}</style>
<rect width="1600" height="900" fill="#f3ece0"/>
<circle class="sn" cx="1180" cy="330" r="190" fill="#d9a27a" opacity=".95"/>
<path d="M0 640 Q300 560 620 620 T1240 590 T1600 640 V900 H0Z" fill="#e9dcc7"/>
<path d="M0 720 Q400 650 820 710 T1600 690 V900 H0Z" fill="#dccab0"/>
<path d="M0 800 Q500 750 1000 800 T1600 780 V900 H0Z" fill="#cdb593"/>
<g fill="#e6d6bd"><path d="M110 640 V420 Q110 330 190 330 Q270 330 270 420 V640Z"/><path d="M310 640 V470 Q310 410 365 410 Q420 410 420 470 V640Z" fill="#dcc8a8"/></g>
<g stroke="#7a6a55" stroke-width="3" fill="none" stroke-linecap="round"><path d="M1600 120 Q1380 150 1240 250"/><path d="M1500 140 Q1470 100 1420 96"/><path d="M1420 190 Q1390 150 1340 146"/><path d="M1340 230 Q1310 190 1260 188"/></g>
<g fill="#8a7a62"><ellipse cx="1470" cy="104" rx="26" ry="9" transform="rotate(-25 1470 104)"/><ellipse cx="1392" cy="152" rx="24" ry="8" transform="rotate(-25 1392 152)"/><ellipse cx="1312" cy="194" rx="22" ry="8" transform="rotate(-25 1312 194)"/></g>
<g fill="#b49a76"><ellipse cx="760" cy="850" rx="34" ry="13"/><ellipse cx="830" cy="858" rx="20" ry="9"/><ellipse cx="700" cy="860" rx="14" ry="7"/></g>
</svg>`

// --- Roses vintage ---------------------------------------------------------
const rr = rng(241)
const rose = (x: number, y: number, s: number, c1: string, c2: string) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle r="60" fill="${c2}"/><circle r="50" fill="${c1}" stroke="${c2}" stroke-width="3"/><path d="M-36 -10 Q-10 -48 30 -22 Q50 14 14 38 Q-30 50 -42 12" fill="none" stroke="${c2}" stroke-width="4"/><path d="M-22 -2 Q-4 -28 22 -10 Q32 12 6 24 Q-18 28 -24 6" fill="none" stroke="${c2}" stroke-width="4"/><circle r="9" fill="${c2}"/></g>`
const leafG = (x: number, y: number, rot: number, s: number) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C40 -40 120 -40 170 0 C120 36 40 36 0 0Z" fill="#1f4a32"/><path d="M0 0 H170" stroke="#0f2a1c" stroke-width="3"/></g>`
const PETALS = Array.from({ length: 22 }, () => `<ellipse cx="${Math.round(rr() * 1600)}" cy="-20" rx="9" ry="6" fill="${rr() < 0.5 ? '#e0405a' : '#b8284a'}" style="animation:pt ${(9 + rr() * 8).toFixed(1)}s linear -${(rr() * 14).toFixed(1)}s infinite"/>`).join('')
const ROSES = `${svgOpen}
<style>@keyframes pt{from{transform:translate(0,0) rotate(0)}to{transform:translate(-120px,960px) rotate(300deg)}}.br{animation:br 8s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}@keyframes br{to{transform:scale(1.04)}}</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a0a10"/><stop offset="1" stop-color="#3f0f1f"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#bg)"/>
${leafG(0, 780, -30, 1.4)}${leafG(120, 880, -60, 1.3)}${leafG(1600, 760, 210, 1.4)}${leafG(1500, 880, 240, 1.2)}${leafG(40, 150, 20, 1.2)}${leafG(1560, 140, 160, 1.2)}
<g class="br">${rose(110, 800, 1.5, '#d9344f', '#8f1830')}${rose(290, 860, 1.1, '#e86a7e', '#a52040')}${rose(1490, 790, 1.6, '#d9344f', '#8f1830')}${rose(1330, 870, 1.1, '#f08a96', '#b02a48')}${rose(90, 120, 1.0, '#e0405a', '#8f1830')}${rose(1530, 110, 1.1, '#e86a7e', '#a52040')}</g>
${PETALS}
<rect width="1600" height="900" fill="url(#vg)"/>
</svg>`

// --- Lo-fi : bureau de nuit ------------------------------------------------
const lr = rng(251)
const CITY = Array.from({ length: 16 }, (_, i) => {
  const h = Math.round(80 + lr() * 180)
  const win = Array.from({ length: 6 }, (_, k) => (lr() < 0.5 ? `<rect x="${360 + i * 38 + 6 + (k % 2) * 14}" y="${470 - h + 10 + Math.floor(k / 2) * 22}" width="8" height="10" fill="#ffd27a" opacity=".8"/>` : '')).join('')

  return `<rect x="${360 + i * 38}" y="${470 - h}" width="34" height="${h}" fill="#1a1440"/>${win}`
}).join('')
const LOFI = `${svgOpen}
<style>.st{animation:st 4s ease-in-out infinite}@keyframes st{from{transform:translateY(0);opacity:.7}to{transform:translateY(-40px);opacity:0}}.lm{animation:lm 5s ease-in-out infinite alternate}@keyframes lm{to{opacity:.65}}.tw{animation:tw 3s ease-in-out infinite alternate}@keyframes tw{to{opacity:.2}}</style>
<defs>
<linearGradient id="room" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1238"/><stop offset="1" stop-color="#0e0a24"/></linearGradient>
<linearGradient id="nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#241a5a"/><stop offset="1" stop-color="#6a3a8a"/></linearGradient>
<linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#room)"/>
<rect x="340" y="120" width="640" height="360" rx="10" fill="url(#nt)"/>
${stars(30, 252, 300).replace(/cx="(\d+(?:\.\d+)?)"/g, (_, v) => `cx="${340 + (Number(v) / 1600) * 640}"`).replace(/cy="(\d+(?:\.\d+)?)"/g, (_, v) => `cy="${120 + (Number(v) / 900) * 360}"`)}
<circle cx="880" cy="200" r="34" fill="#fff3d6"/>
${CITY}
<g fill="none" stroke="#3a2a70" stroke-width="12"><rect x="340" y="120" width="640" height="360" rx="10"/><path d="M660 120 V480"/></g>
<path d="M300 100 Q340 300 300 500 L340 500 Q380 300 340 100Z" fill="#7a3a66" opacity=".8"/><path d="M1020 100 Q980 300 1020 500 L980 500 Q940 300 980 100Z" fill="#7a3a66" opacity=".8"/>
<rect x="0" y="700" width="1600" height="200" fill="#2a1a3a"/><rect x="0" y="700" width="1600" height="10" fill="#4a2a5a"/>
<g transform="translate(1180 460)"><polygon class="lm" points="-70,40 70,40 150,240 -150,240" fill="url(#cone)"/><path d="M0 40 V210 M-80 232 H80" stroke="#3a2a52" stroke-width="10" stroke-linecap="round"/><path d="M-60 40 Q0 -30 60 40Z" fill="#ffb86b"/><circle cx="0" cy="44" r="10" fill="#fff3d6"/></g>
<g transform="translate(180 600)"><path d="M0 100 L-10 40 H90 L80 100Z" fill="#8a4a3a"/><g fill="#2f7a4a"><ellipse cx="40" cy="20" rx="14" ry="50" transform="rotate(-25 40 20)"/><ellipse cx="40" cy="20" rx="14" ry="50" transform="rotate(25 40 20)"/><ellipse cx="40" cy="14" rx="12" ry="56"/></g></g>
<g transform="translate(860 650)"><rect x="0" y="0" width="70" height="50" rx="8" fill="#e9d8c4"/><path d="M70 14 Q100 14 100 34 Q100 52 70 50" fill="none" stroke="#e9d8c4" stroke-width="8"/><g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"><path class="st" d="M20 -8 Q12 -30 24 -50"/><path class="st" d="M40 -8 Q32 -30 44 -50" style="animation-delay:-1.3s"/></g></g>
<g transform="translate(540 676)"><rect width="230" height="14" rx="4" fill="#5a3a6a"/><rect x="10" y="-86" width="210" height="86" rx="6" fill="#2a2150"/><rect x="18" y="-78" width="194" height="70" fill="#4a3a8a"/></g>
</svg>`

export const AMBIANCE_THEMES = [
  scenic({
    id: 'cottage-feerique',
    label: 'Cottage féerique',
    description: 'Chaumière éclairée, fleurs, guirlandes et lucioles (sombre)',
    accent: '#c58bff',
    bg: '#150f2a',
    mode: 'dark',
    svg: COTTAGE,
    alt: 'Une chaumière éclairée dans un jardin fleuri au crépuscule',
  }),
  scenic({
    id: 'automne-cosy',
    label: 'Automne cosy',
    description: 'Feuilles qui tombent, cabane éclairée et citrouilles (sombre)',
    accent: '#ff9a3d',
    bg: '#2a1408',
    mode: 'dark',
    svg: AUTOMNE,
    alt: 'Une forêt d\'automne avec une cabane éclairée et des citrouilles',
  }),
  scenic({
    id: 'reve-pastel',
    label: 'Rêve pastel',
    description: 'Dégradé rose, lavande et bleu, nuages et étincelles (clair)',
    accent: '#b48cff',
    bg: '#f6eefb',
    mode: 'light',
    svg: REVE,
    alt: 'Un ciel pastel avec des nuages et des étincelles',
  }),
  scenic({
    id: 'vaporwave',
    label: 'Vaporwave',
    description: 'Soleil rose, sol à damier, colonnes grecques et palmiers (sombre)',
    accent: '#ff71ce',
    bg: '#1b0b2e',
    mode: 'dark',
    svg: VAPOR,
    alt: 'Un décor vaporwave avec un soleil rose, des colonnes et des palmiers',
  }),
  scenic({
    id: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Tours néon, panneaux holographiques, voitures volantes et pluie (sombre)',
    accent: '#00f0ff',
    bg: '#07040f',
    mode: 'dark',
    svg: CYBER,
    alt: 'Une ville cyberpunk avec des tours néon et des voitures volantes',
  }),
  scenic({
    id: 'japandi',
    label: 'Japandi',
    description: 'Minimaliste : soleil terracotta, arches et collines de sable (clair)',
    accent: '#8a6f4d',
    bg: '#f4efe6',
    mode: 'light',
    svg: JAPANDI,
    alt: 'Un décor minimaliste beige avec un soleil terracotta et des arches',
  }),
  scenic({
    id: 'roses-vintage',
    label: 'Roses vintage',
    description: 'Roses rouges sur fond bordeaux, pétales qui tombent (sombre)',
    accent: '#e0405a',
    bg: '#1a0a10',
    mode: 'dark',
    svg: ROSES,
    alt: 'Des roses rouges et des feuilles sur un fond bordeaux',
  }),
  scenic({
    id: 'lofi-bureau',
    label: 'Lo-fi : bureau de nuit',
    description: 'Fenêtre sur la ville, lampe, plante et tasse fumante (sombre)',
    accent: '#ffb86b',
    bg: '#120f24',
    mode: 'dark',
    svg: LOFI,
    alt: 'Un bureau de nuit avec une fenêtre sur la ville, une lampe et une tasse',
  }),
]
