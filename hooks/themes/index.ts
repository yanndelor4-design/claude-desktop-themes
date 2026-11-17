import { AMBIANCE_THEMES } from './ambiances.js'
import { EXTRA_THEMES } from './autres.js'
import { SPACE_THEMES } from './espace.js'
import { NATURE_THEMES } from './nature.js'
import { NEW_THEMES } from './nouveaux.js'
import { retro90 } from './retro-90.js'
import type { Theme } from './types.js'
import { CITY_THEMES } from './villes.js'
import { VEHICLE_THEMES } from './vehicules.js'
import { violetNeon } from './violet-neon.js'
import { windows95 } from './windows-95.js'
import { windows98 } from './windows-98.js'

export type { Theme } from './types.js'

/** Thèmes livrés avec le mod. Pour en ajouter un : un fichier dans ce dossier, puis une ligne ici. */
export const BUILTIN_THEMES: readonly Theme[] = [
  windows95,
  windows98,
  retro90,
  violetNeon,
  ...NATURE_THEMES,
  ...SPACE_THEMES,
  ...VEHICLE_THEMES,
  ...CITY_THEMES,
  ...EXTRA_THEMES,
  ...NEW_THEMES,
  ...AMBIANCE_THEMES,
]

export const DEFAULT_THEME_ID = windows95.id
