import type { Theme } from './types.js'
import { violetNeon } from './violet-neon.js'

// Lignes de la grille en perspective, du point de fuite (800, 560) vers le bas.
const gridLines = Array.from({ length: 25 }, (_, i) => `<line x1="800" y1="560" x2="${-1600 + i * 200}" y2="900"/>`).join('')
const gridRows = [575, 592, 615, 647, 692, 756, 846]
  .map(y => `<line x1="0" y1="${y}" x2="1600" y2="${y}"/>`)
  .join('')

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
  .float{animation:fl 7s ease-in-out infinite alternate}
  .float2{animation:fl 9s ease-in-out infinite alternate-reverse}
  .glow{animation:gl 4s ease-in-out infinite alternate}
  @keyframes fl{from{transform:translateY(-10px) rotate(-4deg)}to{transform:translateY(12px) rotate(5deg)}}
  @keyframes gl{from{opacity:.75}to{opacity:1}}
</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d0620"/><stop offset=".55" stop-color="#2b0f55"/><stop offset="1" stop-color="#7a1a8f"/>
  </linearGradient>
  <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffd400"/><stop offset=".5" stop-color="#ff5ce1"/><stop offset="1" stop-color="#b44cff"/>
  </linearGradient>
  <mask id="bars">
    <rect width="1600" height="900" fill="#fff"/>
    <rect y="330" width="1600" height="6" fill="#000"/><rect y="365" width="1600" height="10" fill="#000"/>
    <rect y="400" width="1600" height="14" fill="#000"/><rect y="435" width="1600" height="18" fill="#000"/>
  </mask>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g class="glow"><circle cx="1280" cy="330" r="170" fill="url(#sun)" mask="url(#bars)"/></g>
<rect y="560" width="1600" height="340" fill="#120626"/>
<g stroke="#ff2bd6" stroke-opacity=".55" stroke-width="2" fill="none">${gridLines}${gridRows}</g>
<line x1="0" y1="560" x2="1600" y2="560" stroke="#00e5ff" stroke-width="3" stroke-opacity=".8"/>
<g class="float" style="transform-origin:140px 160px"><polygon points="90,200 190,200 140,110" fill="none" stroke="#00e5ff" stroke-width="6"/></g>
<g class="float2"><circle cx="260" cy="330" r="22" fill="#ffd400"/></g>
<g class="float" style="transform-origin:110px 470px"><path d="M40 470 q17 -28 35 0 t35 0 t35 0 t35 0" fill="none" stroke="#39ff88" stroke-width="7" stroke-linecap="round"/></g>
<g class="float2"><rect x="1450" y="560" width="44" height="44" fill="none" stroke="#ffd400" stroke-width="6" transform="rotate(20 1472 582)"/></g>
<g class="float"><path d="M1420 120 q17 -28 35 0 t35 0 t35 0" fill="none" stroke="#00e5ff" stroke-width="7" stroke-linecap="round"/></g>
<g class="float2"><circle cx="1500" cy="450" r="16" fill="#ff2bd6"/></g>
<g class="float" style="transform-origin:90px 700px"><polygon points="50,740 130,740 90,670" fill="#b44cff" fill-opacity=".7"/></g>
</svg>`

export const retro90: Theme = {
  id: 'retro-90',
  label: 'Rétro années 90',
  description: 'Synthwave : soleil rayé, grille néon, confettis Memphis',
  colors: {
    ...violetNeon.colors,
    only: 'dark',
    roles: { accent: '#ff2bd6', danger: '#ff3860', success: '#39ff88', warning: '#ffd400', pro: '#00e5ff' },
  },
  scene: { svg: SVG, alt: 'Soleil rayé et grille néon des années 90' },
  glass: { blur: 4, tint: '#140a24', opacity: 0.75 },
}
