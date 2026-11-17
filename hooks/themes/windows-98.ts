import type { Theme } from './types.js'

const FONT = "font-family:'MS Sans Serif',Tahoma,Arial,sans-serif;font-size:17px;fill:#fff"
const UI = "font-family:'MS Sans Serif',Tahoma,Arial,sans-serif;fill:#000"

const cloud = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".9"><ellipse rx="100" ry="28"/><ellipse cx="-56" cy="-20" rx="56" ry="28"/><ellipse cx="30" cy="-30" rx="66" ry="34"/></g>`

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>.cl{animation:dr 90s linear infinite}@keyframes dr{from{transform:translateX(-240px)}to{transform:translateX(240px)}}</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f6fb5"/><stop offset="1" stop-color="#9fcdf2"/></linearGradient>
<linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a246a"/><stop offset="1" stop-color="#a6caf0"/></linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g class="cl">${cloud(420, 560, 1.7)}${cloud(1000, 700, 2.2)}${cloud(1400, 500, 1.4)}${cloud(150, 760, 1.5)}</g>
<g style="${FONT}" text-anchor="middle">
  <g transform="translate(70 40)">
    <rect x="10" y="4" width="44" height="34" fill="#c0c0c0" stroke="#000" stroke-width="2"/><rect x="15" y="9" width="34" height="22" fill="#0000a8"/>
    <rect x="22" y="40" width="20" height="6" fill="#c0c0c0" stroke="#000" stroke-width="2"/><rect x="10" y="48" width="44" height="6" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <text x="32" y="82">Poste de travail</text>
  </g>
  <g transform="translate(70 170)">
    <circle cx="32" cy="30" r="24" fill="#2f78d0" stroke="#000" stroke-width="2"/>
    <ellipse cx="32" cy="30" rx="10" ry="24" fill="none" stroke="#9fe2ff" stroke-width="2"/><line x1="8" y1="30" x2="56" y2="30" stroke="#9fe2ff" stroke-width="2"/>
    <path d="M10 44 Q32 8 58 20" fill="none" stroke="#ffd400" stroke-width="4"/>
    <text x="32" y="86">Internet</text>
  </g>
  <g transform="translate(70 300)">
    <path d="M14 14 h36 l-4 42 h-28z" fill="#c0c0c0" stroke="#000" stroke-width="2"/><rect x="10" y="8" width="44" height="6" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <line x1="25" y1="20" x2="26" y2="50" stroke="#000" stroke-width="2"/><line x1="39" y1="20" x2="38" y2="50" stroke="#000" stroke-width="2"/>
    <text x="32" y="86">Corbeille</text>
  </g>
</g>
<g transform="translate(1140 70)">
  <rect width="360" height="220" fill="#c0c0c0"/>
  <path d="M0 220 V0 H360" fill="none" stroke="#fff" stroke-width="3"/><path d="M0 220 H360 V0" fill="none" stroke="#404040" stroke-width="3"/>
  <rect x="4" y="4" width="352" height="26" fill="url(#title)"/>
  <text x="14" y="24" style="${FONT};font-weight:bold">Bienvenue</text>
  <rect x="322" y="8" width="28" height="18" fill="#c0c0c0" stroke="#404040" stroke-width="2"/>
  <text x="336" y="23" text-anchor="middle" style="${UI};font-size:16px;font-weight:bold">x</text>
  <text x="24" y="94" style="${UI};font-size:20px">Windows 98 est prêt.</text>
  <rect x="130" y="150" width="100" height="36" fill="#c0c0c0"/>
  <path d="M130 186 V150 H230" fill="none" stroke="#fff" stroke-width="3"/><path d="M130 186 H230 V150" fill="none" stroke="#404040" stroke-width="3"/>
  <text x="180" y="175" text-anchor="middle" style="${UI};font-size:18px">OK</text>
</g>
</svg>`

export const windows98: Theme = {
  id: 'windows-98',
  label: 'Windows 98',
  description: 'Ciel bleu et nuages, fenêtre à barre de titre dégradée (clair)',
  colors: {
    only: 'light',
    roles: { accent: '#0a246a', danger: '#c00000', success: '#008000', warning: '#808000', pro: '#800080' },
    light: {
      gray: {
        anchors: {
          'surface-0': '#c0c0c0',
          'surface-1': '#d4d0c8',
          'surface-2': '#e4e1da',
          'text-primary': '#000000',
          'text-secondary': '#111111',
          'text-muted': '#222222',
        },
      },
    },
  },
  scene: { svg: SVG, alt: 'Ciel bleu avec des nuages, icônes de bureau et fenêtre' },
  glass: { blur: 0, tint: '#c0c0c0', opacity: 0.8 },
}
