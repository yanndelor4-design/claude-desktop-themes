/**
 * Les catégories du panneau : il n'affiche que celle qu'on choisit, pour rester léger
 * (l'app refuse un panneau trop gros, et les dessins de tous les décors le seraient).
 * Un thème qui n'est pas listé ici va dans « Autres ». Les thèmes créés par l'utilisateur
 * sont dans « Mes thèmes ».
 */
export const CATEGORY_NAMES = ['Rétro', 'Nature', 'Espace', 'Véhicules', 'Villes', 'Mes thèmes', 'Autres'] as const

export type CategoryName = (typeof CATEGORY_NAMES)[number]

const MEMBERS: Record<Exclude<CategoryName, 'Mes thèmes' | 'Autres'>, readonly string[]> = {
  Rétro: ['windows-95', 'windows-98', 'retro-90', 'violet-neon'],
  Nature: ['plage', 'montagne', 'foret', 'coucher-soleil', 'neige', 'desert', 'ocean', 'aurore-boreale', 'volcan', 'jungle'],
  Espace: ['planetes', 'lune', 'galaxie'],
  Véhicules: ['voiture-sport', 'avion', 'f1-fleches-argent', 'circuit-f1-nuit', 'technologie'],
  Villes: ['monuments-paris', 'pyramides', 'rue-nuit', 'gratte-ciel', 'tokyo-nuit'],
}

export function categoryOf(themeId: string, isUser: boolean): CategoryName {
  if (isUser) {
    return 'Mes thèmes'
  }

  for (const [name, ids] of Object.entries(MEMBERS)) {
    if (ids.includes(themeId)) {
      return name as CategoryName
    }
  }

  return 'Autres'
}
