import { generateTheme } from '../generate.js'
import type { Theme } from './types.js'

/** Nombres pseudo-aléatoires stables : le même décor à chaque chargement. */
export function rng(seed: number): () => number {
  let a = seed >>> 0

  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n: number) => Math.round(n * 10) / 10

/** Des étoiles, dont certaines scintillent (classe `tw`, à animer dans le décor). */
export function stars(count: number, seed: number, maxY = 900): string {
  const r = rng(seed)

  return Array.from({ length: count }, () => {
    const x = f(r() * 1600)
    const y = f(r() * maxY)
    const size = f(0.6 + r() * 1.8)
    const op = f(0.4 + r() * 0.6)

    return `<circle${r() < 0.25 ? ' class="tw"' : ''} cx="${x}" cy="${y}" r="${size}" fill="#fff" opacity="${op}"/>`
  }).join('')
}

/** Une ligne de vagues qui se répète, à faire glisser de 200 px. */
export function wave(y: number, amp: number): string {
  return `M-200 ${y} q50 ${-amp} 100 0${' t100 0'.repeat(19)}`
}

/** Une rangée de sapins en silhouette. */
export function pines(y: number, count: number, h: number, fill: string, seed: number): string {
  const r = rng(seed)

  return Array.from({ length: count }, (_, i) => {
    const x = f((i / count) * 1700 - 50 + r() * 40)
    const hh = f(h * (0.7 + r() * 0.6))
    const w = f(hh * 0.38)

    return `<polygon points="${x},${y - hh} ${f(x - w)},${y} ${f(x + w)},${y}" fill="${fill}"/>`
  }).join('')
}

/** Un décor : les couleurs viennent de l'accent et du fond, le mode (clair ou sombre) suit le décor. */
export function scenic(o: {
  id: string
  label: string
  description: string
  accent: string
  bg: string
  mode: 'light' | 'dark'
  svg: string
  alt: string
  blur?: number
  opacity?: number
}): Theme {
  const base = generateTheme({ id: o.id, label: o.label, accent: o.accent, bg: o.bg }, o.mode)

  return {
    ...base,
    description: o.description,
    scene: { svg: o.svg, alt: o.alt },
    glass: { blur: o.blur ?? 10, tint: o.mode === 'dark' ? o.bg : '#ffffff', opacity: o.opacity ?? 0.78 },
  }
}

export const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">'
