import type { Theme } from './themes/types.js'

/** Un thème créé par `/themes new`, gardé dans le stockage du mod. */
export type UserTheme = {
  id: string
  label: string
  accent: string
  bg: string
  /** Le mode du thème : seulement clair ou seulement sombre (les deux, s'il est absent). */
  mode?: 'light' | 'dark'
}

type Hex = `#${string}`

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/** `#rgb`, `#rrggbb` ou `rrggbb` → `#rrggbb` en minuscules, ou `undefined`. */
export function parseHex(input: string): Hex | undefined {
  const raw = input.trim().replace(/^#/, '').toLowerCase()

  if (/^[0-9a-f]{3}$/.test(raw)) {
    return `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`
  }

  return /^[0-9a-f]{6}$/.test(raw) ? `#${raw}` : undefined
}

function toHsl(hex: Hex): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min

  if (d === 0) {
    return [0, 0, l]
  }
  const s = d / (1 - Math.abs(2 * l - 1))
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4

  return [(h * 60 + 360) % 360, s, l]
}

function fromHsl(h: number, s: number, l: number): Hex {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  const part = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0')

  return `#${part(r)}${part(g)}${part(b)}`
}

/** Une palette complète, claire et sombre, à partir d'une couleur d'accent et d'une couleur de fond. */
export function generateTheme(user: UserTheme, mode?: 'light' | 'dark'): Theme {
  const accent = parseHex(user.accent) ?? '#b44cff'
  const bg = parseHex(user.bg) ?? '#140a24'
  const [h, rawS, rawL] = toHsl(bg)
  const s = clamp(rawS, 0.2, 0.6)
  const l0 = clamp(rawL * 0.5, 0.05, 0.11)
  const [ah] = toHsl(accent)


  const roles = {
    accent,
    danger: '#ff4d6d' as Hex,
    success: '#3ddc97' as Hex,
    warning: '#ffb020' as Hex,
    pro: fromHsl((ah + 60) % 360, 0.9, 0.6),
  }
  const light = {
    gray: {
      anchors: {
        'surface-0': fromHsl(h, s * 0.6, 0.9),
        'surface-1': fromHsl(h, s * 0.6, 0.935),
        'surface-2': fromHsl(h, s * 0.6, 0.97),
        'text-primary': fromHsl(h, 0.5, 0.12),
        'text-secondary': fromHsl(h, 0.4, 0.14),
        'text-muted': fromHsl(h, 0.3, 0.2),
      },
    },
  }
  const dark = {
    gray: {
      anchors: {
        'surface-0': fromHsl(h, s, l0),
        'surface-1': fromHsl(h, s, l0 + 0.03),
        'surface-2': fromHsl(h, s, l0 + 0.06),
        'surface-3': fromHsl(h, s, l0 + 0.08),
        'text-primary': fromHsl(h, Math.min(s, 0.6), 0.94),
        'text-secondary': fromHsl(h, Math.min(s, 0.5), 0.91),
        'text-muted': fromHsl(h, Math.min(s, 0.4), 0.84),
      },
    },
  }

  return {
    id: user.id,
    label: user.label,
    description: `Thème personnalisé (accent ${accent}, fond ${bg})`,
    colors:
      mode === 'light'
        ? { only: 'light' as const, roles, light }
        : mode === 'dark'
          ? { only: 'dark' as const, roles, dark }
          : { roles, light, dark },
  }
}
