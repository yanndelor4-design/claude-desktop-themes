import type { Theme } from './types.js'

export const violetNeon: Theme = {
  id: 'violet-neon',
  label: 'Violet néon',
  description: 'Nuit pourpre électrique, accents violets (sombre et clair)',
  colors: {
    roles: { accent: '#b44cff', danger: '#ff4d6d', success: '#3ddc97', warning: '#ffb020', pro: '#ff5ce1' },
    light: {
      gray: {
        anchors: {
          'surface-0': '#ece3fa',
          'surface-1': '#f3ecfd',
          'surface-2': '#faf6ff',
          'text-primary': '#1e0f38',
          'text-secondary': '#2a1650',
          'text-muted': '#35205c',
        },
      },
    },
    dark: {
      gray: {
        anchors: {
          'surface-0': '#140a24',
          'surface-1': '#1c1032',
          'surface-2': '#251641',
          'surface-3': '#2a1a47',
          'text-primary': '#f3e9ff',
          'text-secondary': '#eadffb',
          'text-muted': '#d6c7f0',
        },
      },
    },
  },
}
