# Thèmes pour Claude Desktop

Un mod pour Claude Desktop (onglet Code) qui ajoute **35 thèmes** : des couleurs pour toute l'application et, pour la plupart, un **décor animé** en fond d'écran, tous dessinés en vectoriel (SVG), sans image à télécharger.

- Un **panneau « Thèmes »** à côté de la conversation, avec une vignette par thème, rangés par catégories.
- Un thème **choisi une fois, gardé** d'une session à l'autre.
- Un thème **au hasard** à chaque démarrage, ou **selon l'heure** (un thème de jour, un thème de nuit).
- Un **formulaire pour créer ses propres thèmes** à partir d'un nom et de deux couleurs.
- Des textes **contrastés** : chaque thème est vérifié pour que le texte reste lisible.

## Les thèmes

| Catégorie | Thèmes |
|---|---|
| Rétro | Windows 95, Windows 98, Rétro années 90, Vaporwave, Violet néon |
| Nature | Plage, Montagne, Forêt, Coucher de soleil, Neige, Désert, Océan, Aurore boréale, Volcan, Jungle |
| Espace | Planètes, Lune, Galaxie |
| Véhicules | Voiture de sport, Avion, F1 Flèches d'argent, Circuit F1 de nuit, Technologie |
| Villes | Monuments (Paris), Pyramides, Rue de nuit, Gratte-ciel, Tokyo de nuit, Cyberpunk |
| Ambiances | Cottage féerique, Automne cosy, Rêve pastel, Japandi, Roses vintage, Lo-fi : bureau de nuit |

Les décors sont des dessins originaux. Les thèmes « Windows 95 » et « Windows 98 » sont des clins d'œil dessinés à la main, sans aucun logo ni élément de Microsoft.

## Installation

Dans une session de terminal Claude Code :

```
/plugin install themes --marketplace yanndelor4-design/claude-desktop-themes
```

Dans l'application de bureau, là où `/plugin` ne fonctionne pas : cliquez sur **+** à côté de la zone de saisie, puis **Plugins**, **Ajouter une place de marché** avec `yanndelor4-design/claude-desktop-themes`, puis **Ajouter le plugin**.

### Rechargement automatique (facultatif)

Le mod se charge au démarrage. Si vous modifiez ses fichiers et voulez qu'il se recharge sans redémarrer, ajoutez dans `~/.claude/settings.json` :

```json
{
  "env": {
    "CLAUDE_CODE_PLUGIN_DIR_WATCH": "1"
  }
}
```

## Utilisation

Tapez `/themes` pour ouvrir le panneau. Les commandes :

| Commande | Effet |
|---|---|
| `/themes` | Ouvre le panneau |
| `/themes liste` | Liste les thèmes en texte |
| `/themes <nom>` | Applique un thème (par exemple `/themes foret`) |
| `/themes hasard` | Applique un thème au hasard |
| `/themes depart <dernier\|hasard\|heure>` | Choisit le thème du démarrage |
| `/themes new <nom> <#accent> <#fond>` | Crée un thème à partir de deux couleurs |
| `/themes delete <nom>` | Supprime un thème que vous avez créé |
| `/themes off` | Retire le thème |

## Ajouter un décor

Chaque catégorie de décors est un fichier de `hooks/themes/`. Un thème est un objet `Theme` (voir `hooks/themes/types.ts`) : un nom, des couleurs, et un dessin SVG de 21 000 caractères au plus (l'application refuse les fonds trop lourds). Ajoutez-le à la liste de `hooks/themes/index.ts` et à une catégorie dans `hooks/themes/categories.ts`.

Les thèmes à partir de photos ne sont pas inclus dans ce dépôt.

## Licence

MIT. Ce mod n'est pas affilié à Anthropic ni à Microsoft.
