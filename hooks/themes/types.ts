import type { makeColors } from '../make-colors.js'

type ColorsDefinition = Omit<Parameters<typeof makeColors>[0], 'label'>

/**
 * Un thème de la bibliothèque. Pour en ajouter un : créer un fichier dans ce
 * dossier qui exporte un `Theme`, puis l'ajouter à la liste de `index.ts`.
 */
export type Theme = {
  /** Lettres minuscules, chiffres et `-`, 1 à 64 caractères. C'est le nom tapé dans `/themes <id>`. */
  id: string
  /** Nom affiché. */
  label: string
  /** Une ligne pour la liste. */
  description: string
  /** Les couleurs, comme pour `makeColors` (sans `label`). */
  colors: ColorsDefinition
  /** Un fond animé en SVG (facultatif). */
  scene?: { svg: string; alt: string }
  /** Voile sur le fond : réglages, ou `false` pour garder les panneaux tels quels. */
  glass?: { blur?: number; tint?: string; opacity?: number } | false
}
