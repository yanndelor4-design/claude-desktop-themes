/** Le message affiché en haut et en bas du panneau des thèmes. */
export type PanelMessage = string

// Les valeurs que le panneau « Thèmes » garde pour se redessiner.
declare module 'claude-code' {
  interface PluginState {
    themes: {
      /** Le dernier message affiché par le panneau. */
      status: Shaped<PanelMessage>
      /** Un compteur : on l'augmente quand la liste des thèmes ou le thème actif change, pour redessiner. */
      rev: Shaped<number>
    }
  }
}
