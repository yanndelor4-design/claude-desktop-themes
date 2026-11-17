import type { Theme } from './types.js'

const FONT = "font-family:'MS Sans Serif',Tahoma,Arial,sans-serif;font-size:17px;fill:#fff"
const UI = "font-family:'MS Sans Serif',Tahoma,Arial,sans-serif;fill:#000"

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<rect width="1600" height="900" fill="#008080"/>
<g style="${FONT}" text-anchor="middle">
  <g transform="translate(70 40)">
    <rect x="10" y="4" width="44" height="34" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <rect x="15" y="9" width="34" height="22" fill="#0000a8"/>
    <rect x="22" y="40" width="20" height="6" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <rect x="10" y="48" width="44" height="6" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <text x="32" y="82">Poste de travail</text>
  </g>
  <g transform="translate(70 170)">
    <path d="M6 14 h22 l6 8 h26 v34 h-54z" fill="#ffff00" stroke="#000" stroke-width="2"/>
    <text x="32" y="86">Mes documents</text>
  </g>
  <g transform="translate(70 300)">
    <path d="M14 14 h36 l-4 42 h-28z" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <rect x="10" y="8" width="44" height="6" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
    <line x1="25" y1="20" x2="26" y2="50" stroke="#000" stroke-width="2"/>
    <line x1="39" y1="20" x2="38" y2="50" stroke="#000" stroke-width="2"/>
    <text x="32" y="86">Corbeille</text>
  </g>
</g>
<g transform="translate(1160 70)">
  <rect width="340" height="210" fill="#c0c0c0"/>
  <path d="M0 210 V0 H340" fill="none" stroke="#fff" stroke-width="3"/>
  <path d="M0 210 H340 V0" fill="none" stroke="#404040" stroke-width="3"/>
  <rect x="4" y="4" width="332" height="26" fill="#000080"/>
  <text x="14" y="24" style="${FONT};font-weight:bold">Bienvenue</text>
  <rect x="302" y="8" width="28" height="18" fill="#c0c0c0" stroke="#404040" stroke-width="2"/>
  <text x="316" y="23" text-anchor="middle" style="${UI};font-size:16px;font-weight:bold">x</text>
  <text x="24" y="90" style="${UI};font-size:20px">Windows 95 est prêt.</text>
  <rect x="120" y="140" width="100" height="36" fill="#c0c0c0"/>
  <path d="M120 176 V140 H220" fill="none" stroke="#fff" stroke-width="3"/>
  <path d="M120 176 H220 V140" fill="none" stroke="#404040" stroke-width="3"/>
  <text x="170" y="165" text-anchor="middle" style="${UI};font-size:18px">OK</text>
</g>
</svg>`

export const windows95: Theme = {
  id: 'windows-95',
  label: 'Windows 95',
  description: 'Gris argent, bleu marine, bureau turquoise (clair seulement)',
  colors: {
    only: 'light',
    roles: { accent: '#000080', danger: '#c00000', success: '#008000', warning: '#808000', pro: '#800080' },
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
  scene: { svg: SVG, alt: 'Bureau Windows 95 turquoise avec icônes et fenêtre' },
  glass: { blur: 0, tint: '#c0c0c0', opacity: 0.8 },
}
