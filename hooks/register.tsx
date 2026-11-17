import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, ThemeSetArgs } from 'claude-code'

import { generateTheme, parseHex } from './generate.js'
import type { UserTheme } from './generate.js'
import { makeColors } from './make-colors.js'
import { CATEGORY_NAMES, categoryOf } from './themes/categories.js'
import type { CategoryName } from './themes/categories.js'
import { BUILTIN_THEMES, DEFAULT_THEME_ID } from './themes/index.js'
import type { Theme } from './themes/index.js'

const ID_PATTERN = /^[a-z0-9-]{1,64}$/
const BLOCKING = "Desktop won't paint"
const PANE = 'themes'
const SCHEDULE_CHECK_MS = 5 * 60 * 1000

/** « Mon thème 1 » → « mon-theme-1 » : un nom de thème utilisable partout. */
const slugify = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)

// Ce que le panneau lit pour se redessiner. Changer l'étiquette de `shape` si la forme change.
const statusAtom = atom({ plugin: 'themes', key: 'status' } as const, '', { shape: 'status-1' })
const revAtom = atom({ plugin: 'themes', key: 'rev' } as const, 0, { shape: 'rev-1' })

// La catégorie que le panneau affiche ; au départ, celle du thème actif.
let currentCategory: CategoryName | undefined
// Le texte tapé dans les champs du panneau (pas besoin de redessiner à chaque lettre).
let draftName = ''
let draftAccent = ''
let draftBg = ''
let draftDayHour = ''
let draftNightHour = ''
// Le thème en place, et ce que le minuteur « selon l'heure » a choisi la dernière fois.
let appliedId = ''
let lastScheduled = ''
let timer: { cancel: () => void } | undefined

type StartMode = 'last' | 'random' | 'time'
type Settings = { mode: StartMode; dayId: string; nightId: string; dayHour: number; nightHour: number }

const DEFAULT_SETTINGS: Settings = { mode: 'last', dayId: 'plage', nightId: 'galaxie', dayHour: 7, nightHour: 19 }
const MODE_LABELS: Record<StartMode, string> = { last: 'Dernier thème', random: 'Au hasard', time: "Selon l'heure" }

const isHour = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 23

async function loadSettings($: EngineInterface): Promise<Settings> {
  const raw = (await $.store.get('settings')) as Partial<Settings> | undefined

  return {
    mode: raw?.mode === 'random' || raw?.mode === 'time' ? raw.mode : 'last',
    dayId: typeof raw?.dayId === 'string' ? raw.dayId : DEFAULT_SETTINGS.dayId,
    nightId: typeof raw?.nightId === 'string' ? raw.nightId : DEFAULT_SETTINGS.nightId,
    dayHour: isHour(raw?.dayHour) ? raw.dayHour : DEFAULT_SETTINGS.dayHour,
    nightHour: isHour(raw?.nightHour) ? raw.nightHour : DEFAULT_SETTINGS.nightHour,
  }
}

async function saveSettings($: EngineInterface, settings: Settings): Promise<void> {
  await $.store.set('settings', settings)
}

const isUserTheme = (v: unknown): v is UserTheme =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as UserTheme).id === 'string' &&
  typeof (v as UserTheme).label === 'string' &&
  typeof (v as UserTheme).accent === 'string' &&
  typeof (v as UserTheme).bg === 'string'

async function loadUserThemes($: EngineInterface): Promise<UserTheme[]> {
  const raw = await $.store.get('userThemes')

  return Array.isArray(raw) ? raw.filter(isUserTheme) : []
}

/** Le thème en place maintenant, ou à défaut celui qu'on a gardé la dernière fois. */
async function activeId($: EngineInterface): Promise<string> {
  if (appliedId !== '') {
    return appliedId
  }
  const saved = await $.store.get('active')

  return typeof saved === 'string' ? saved : DEFAULT_THEME_ID
}

async function findTheme($: EngineInterface, id: string): Promise<Theme | undefined> {
  const builtin = BUILTIN_THEMES.find(t => t.id === id)

  if (builtin) {
    return builtin
  }
  const user = (await loadUserThemes($)).find(t => t.id === id)

  return user ? generateTheme(user, user.mode) : undefined
}

async function allThemes($: EngineInterface): Promise<{ theme: Theme; isUser: boolean }[]> {
  const users = await loadUserThemes($)

  return [
    ...BUILTIN_THEMES.map(theme => ({ theme, isUser: false })),
    ...users.map(user => ({ theme: generateTheme(user, user.mode), isUser: true })),
  ]
}

/** Les couleurs d'un thème, et ce que le moteur y reproche. */
function build(theme: Theme) {
  const { theme: colors, problems } = makeColors({ label: theme.label, id: theme.id, ...theme.colors })
  const look: ThemeSetArgs = { colors }

  if (theme.scene) {
    look.backdrop = theme.glass === undefined ? { scene: theme.id } : { scene: theme.id, glass: theme.glass }
  }

  return { look, problems }
}

/** `undefined` si les couleurs passent, sinon la raison (en français) pour laquelle Desktop ne les peindrait pas. */
function paintProblem(theme: Theme): string | undefined {
  try {
    return build(theme).problems.find(line => line.startsWith(BLOCKING))
  } catch (error) {
    return error instanceof Error ? error.message : String(error)
  }
}

const accentOf = (theme: Theme): string => {
  const accent = theme.colors.roles?.accent

  return typeof accent === 'string' ? accent : (accent?.seed ?? '#888888')
}

async function redraw($: EngineInterface, message?: string): Promise<void> {
  if (message !== undefined) {
    await update($, statusAtom, () => message)
  }
  await update($, revAtom, n => n + 1)
}

/** Applique un thème. `remember` : le garder pour le prochain démarrage (pas pour un choix au hasard ou selon l'heure). */
async function applyTheme($: EngineInterface, theme: Theme, remember = true): Promise<string> {
  const problem = paintProblem(theme)

  if (problem) {
    return `Impossible d'appliquer « ${theme.label} » : ${problem}`
  }
  const set = await $.theme.set(build(theme).look)
  appliedId = theme.id

  if (remember) {
    await $.store.set('active', theme.id)
  }

  return set.isDrawn
    ? `Thème « ${theme.label} » appliqué.${remember ? ' Il sera gardé la prochaine fois.' : ''}`
    : `Thème « ${theme.label} » choisi, mais rien ne le dessine ici : ${set.reason}`
}

async function removeTheme($: EngineInterface): Promise<string> {
  await $.theme.clear()
  await $.store.set('active', '')
  appliedId = ''

  return "Thème retiré : l'apparence d'origine est de retour."
}

async function applyRandom($: EngineInterface): Promise<string> {
  const choices = (await allThemes($)).map(x => x.theme).filter(t => t.id !== appliedId && paintProblem(t) === undefined)
  const theme = choices[Math.floor(Math.random() * choices.length)]

  if (!theme) {
    return 'Aucun thème à choisir au hasard.'
  }

  return applyTheme($, theme, false)
}

/** Le thème de jour ou de nuit qui convient à cette heure. */
function scheduledId(settings: Settings, hour: number): string {
  const { dayHour, nightHour } = settings
  const isDay = dayHour <= nightHour ? hour >= dayHour && hour < nightHour : hour >= dayHour || hour < nightHour

  return isDay ? settings.dayId : settings.nightId
}

/** Passe au thème de jour ou de nuit quand l'heure change de côté (un choix manuel dure jusque-là). */
async function checkSchedule($: EngineInterface, force: boolean): Promise<void> {
  const settings = await loadSettings($)
  const hour = new Date(await $.clock.now()).getHours()
  const id = scheduledId(settings, hour)

  if (!force && id === lastScheduled) {
    return
  }
  lastScheduled = id
  const theme = await findTheme($, id)

  if (theme) {
    await applyTheme($, theme, false)
  }
}

function stopSchedule(): void {
  timer?.cancel()
  timer = undefined
}

/** Met en place le thème de départ : le dernier, un au hasard, ou celui de l'heure (avec son minuteur). */
async function applyStartup($: EngineInterface): Promise<void> {
  stopSchedule()
  lastScheduled = ''
  const settings = await loadSettings($)

  if (settings.mode === 'time') {
    await checkSchedule($, true)
    timer = $.clock.every(SCHEDULE_CHECK_MS, () => {
      void checkSchedule($, false).catch(() => undefined)
    })

    return
  }

  if (settings.mode === 'random') {
    await applyRandom($)

    return
  }
  const saved = await $.store.get('active')
  const id = typeof saved === 'string' ? saved : DEFAULT_THEME_ID
  const theme = id === '' ? undefined : await findTheme($, id)

  if (theme) {
    const problem = paintProblem(theme)

    if (problem) {
      $.ui.toast(`Thème « ${theme.label} » non appliqué : ${problem}`)
    } else {
      const set = await $.theme.set(build(theme).look)
      appliedId = theme.id

      if (!set.isDrawn) {
        $.ui.status(set.reason)
      }
    }
  }
}

async function setMode($: EngineInterface, mode: StartMode): Promise<string> {
  const settings = await loadSettings($)
  await saveSettings($, { ...settings, mode })

  if (mode === 'last') {
    stopSchedule()

    return 'Au démarrage : le dernier thème choisi.'
  }
  await applyStartup($)

  return mode === 'random'
    ? 'Au démarrage : un thème au hasard (un nouveau vient d\'être choisi).'
    : `Au démarrage : le thème du jour de ${settings.dayHour} h à ${settings.nightHour} h, celui de la nuit le reste du temps.`
}

async function setScheduleTheme($: EngineInterface, which: 'day' | 'night'): Promise<string> {
  const id = await activeId($)
  const theme = await findTheme($, id)

  if (!theme) {
    return "Choisissez d'abord un thème, puis cliquez sur ce bouton."
  }
  const settings = await loadSettings($)
  await saveSettings($, which === 'day' ? { ...settings, dayId: id } : { ...settings, nightId: id })

  if (settings.mode === 'time') {
    await applyStartup($)
  }

  return `Thème de ${which === 'day' ? 'jour' : 'nuit'} : « ${theme.label} ».`
}

async function setHours($: EngineInterface, dayText: string, nightText: string): Promise<string> {
  const dayHour = Number(dayText)
  const nightHour = Number(nightText)

  if (!isHour(dayHour) || !isHour(nightHour)) {
    return 'Les heures doivent être des nombres entiers de 0 à 23 (par exemple 7 et 19).'
  }
  const settings = await loadSettings($)
  await saveSettings($, { ...settings, dayHour, nightHour })

  if (settings.mode === 'time') {
    await applyStartup($)
  }

  return `Le thème de jour commence à ${dayHour} h, celui de nuit à ${nightHour} h.`
}

async function createFromColors($: EngineInterface, name: string, accentInput: string, bgInput: string): Promise<string> {
  const accent = parseHex(accentInput)
  const bg = parseHex(bgInput)
  const id = slugify(name)

  if (!ID_PATTERN.test(id) || !accent || !bg) {
    return 'Il faut un nom et deux couleurs au format #rrggbb.\nExemple : nom « forêt », accent #3ddc97, fond #0b1f17.'
  }

  if (BUILTIN_THEMES.some(t => t.id === id)) {
    return `« ${id} » est un thème livré avec le mod : choisissez un autre nom.`
  }
  const user: UserTheme = { id, label: name.trim().slice(0, 64), accent, bg }
  const problem = paintProblem(generateTheme(user))

  if (problem) {
    return `Ces couleurs ne passent pas (${problem}). Essayez un fond plus sombre ou un accent plus clair.`
  }
  const others = (await loadUserThemes($)).filter(t => t.id !== id)
  await $.store.set('userThemes', [...others, user])

  return `Thème « ${id} » créé et gardé. ${await applyTheme($, generateTheme(user))}`
}

async function deleteTheme($: EngineInterface, id: string): Promise<string> {
  const users = await loadUserThemes($)

  if (!users.some(t => t.id === id)) {
    return `Aucun thème perso « ${id} ». (Les thèmes livrés avec le mod ne se suppriment pas.)`
  }
  await $.store.set('userThemes', users.filter(t => t.id !== id))
  const wasActive = id === (await activeId($))

  if (wasActive) {
    // Le thème supprimé ne doit plus être celui qu'on recharge au démarrage.
    await $.store.delete('active')
  }

  return `Thème « ${id} » supprimé.${wasActive ? " Il reste affiché jusqu'au prochain démarrage, puis le thème par défaut reviendra." : ''}`
}

async function listText($: EngineInterface): Promise<string> {
  const users = await loadUserThemes($)
  const active = await activeId($)
  const settings = await loadSettings($)
  const line = (id: string, label: string, desc: string) => `${id === active ? '●' : '○'} ${id}  (${label}) ${desc}`

  return [
    'Thèmes disponibles (● = actif) :',
    ...BUILTIN_THEMES.map(t => line(t.id, t.label, `— ${t.description}`)),
    ...users.map(t => line(t.id, t.label, `— perso : accent ${t.accent}, fond ${t.bg}`)),
    '',
    `Au démarrage : ${MODE_LABELS[settings.mode]}${settings.mode === 'time' ? ` (jour « ${settings.dayId} » dès ${settings.dayHour} h, nuit « ${settings.nightId} » dès ${settings.nightHour} h)` : ''}`,
    'Panneau : /themes   Changer : /themes <nom>   Au hasard : /themes hasard   Départ : /themes depart <dernier|hasard|heure>',
    'Créer : /themes new <nom> <#accent> <#fond>   Supprimer : /themes delete <nom>   Aucun : /themes off',
  ].join('\n')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'themes',
      description: 'Ouvrir le panneau des thèmes (changer, créer, au hasard, selon l\'heure)',
      argumentHint: '[liste | <nom> | hasard | depart <dernier|hasard|heure> | new <nom> <#accent> <#fond> | delete <nom> | off]',
    })
    await applyStartup($)

    return next(e)
  })

  on('command.run', { command: 'themes' }, async ($, e) => {
    const [first = '', ...rest] = e.args.trim().split(/\s+/).filter(Boolean)
    const action = first.toLowerCase()

    if (action === '' || action === 'panneau' || action === 'panel' || action === 'galerie') {
      const opened = await $.ui.open({ id: PANE, title: 'Thèmes', focus: true })

      return {
        text: opened.isPlaced ? 'Panneau des thèmes ouvert.' : `Le panneau ne peut pas s'afficher ici.\n\n${await listText($)}`,
      }
    }

    if (action === 'liste' || action === 'list') {
      return { text: await listText($) }
    }

    if (action === 'off') {
      const text = await removeTheme($)
      await redraw($)

      return { text }
    }

    if (action === 'hasard' || action === 'random') {
      const text = await applyRandom($)
      await redraw($)

      return { text }
    }

    if (action === 'depart' || action === 'départ' || action === 'start') {
      const word = (rest[0] ?? '').toLowerCase()
      const mode: StartMode | undefined =
        word === 'dernier' || word === 'last' ? 'last' : word === 'hasard' || word === 'random' ? 'random' : word === 'heure' || word === 'time' ? 'time' : undefined

      if (!mode) {
        return { text: 'Usage : /themes depart <dernier|hasard|heure>' }
      }
      const text = await setMode($, mode)
      await redraw($)

      return { text }
    }

    if (action === 'new' || action === 'nouveau' || action === 'creer' || action === 'créer') {
      const text = await createFromColors($, rest[0] ?? '', rest[1] ?? '', rest[2] ?? '')
      await redraw($)

      return { text }
    }

    if (action === 'delete' || action === 'supprimer') {
      const text = await deleteTheme($, (rest[0] ?? '').toLowerCase())
      await redraw($)

      return { text }
    }

    const theme = await findTheme($, action)

    if (!theme) {
      return { text: `Thème « ${action} » introuvable. /themes liste montre ceux qui existent.` }
    }
    const text = await applyTheme($, theme)
    await redraw($)

    return { text }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    // Lus ici pour que le panneau se redessine quand ils changent.
    const message = await read($, statusAtom)
    await read($, revAtom)
    const ui = $.ui.resolve(e)
    const { Box, Text, Button, Input } = ui
    const Svg = 'Svg' in ui ? ui.Svg : undefined
    const active = await activeId($)
    const everything = await allThemes($)
    const settings = await loadSettings($)

    const run = (work: () => Promise<string>) => () => {
      void work().then(text => redraw($, text))
    }

    if (e.props.placement === 'widget') {
      const current = everything.find(x => x.theme.id === active)

      return <Text>Thème : {current ? current.theme.label : 'aucun'}</Text>
    }

    // Une seule catégorie à la fois : le panneau reste léger (celle du thème actif au départ).
    const withCategory = everything.map(x => ({ ...x, category: categoryOf(x.theme.id, x.isUser) }))
    const present = CATEGORY_NAMES.filter(name => withCategory.some(x => x.category === name))
    const activeCategory = withCategory.find(x => x.theme.id === active)?.category
    const category = currentCategory && present.includes(currentCategory) ? currentCategory : (activeCategory ?? present[0])
    const shown = withCategory.filter(x => x.category === category)
    const labelOf = (id: string) => everything.find(x => x.theme.id === id)?.theme.label ?? id

    if (draftDayHour === '') {
      draftDayHour = String(settings.dayHour)
    }

    if (draftNightHour === '') {
      draftNightHour = String(settings.nightHour)
    }
    const accentPreview = parseHex(draftAccent)
    const bgPreview = parseHex(draftBg)

    return (
      <Box flexDirection="column" gap={1}>
        <Text bold size="heading">
          Thèmes
        </Text>
        {message !== '' && <Text dimColor>{message}</Text>}
        <Box flexDirection="row" flexWrap="wrap" gap={1}>
          {present.map(name => (
            <Button
              key={`cat-${name}`}
              variant={name === category ? 'primary' : 'secondary'}
              onPress={() => {
                currentCategory = name
                void redraw($)
              }}
            >
              {name}
            </Button>
          ))}
        </Box>
        {shown.map(({ theme, isUser }) => (
          <Box key={`row-${theme.id}`} flexDirection="row" gap={1} alignItems="center">
            {Svg && theme.scene ? (
              <Svg source={theme.scene.svg} alt={theme.scene.alt} width={96} height={54} />
            ) : (
              <Text color={accentOf(theme)}>■</Text>
            )}
            <Box flexDirection="column" flexGrow={1}>
              <Text bold>
                {theme.id === active ? '● ' : ''}
                {theme.label}
              </Text>
              <Text dimColor size="caption">
                {theme.description}
              </Text>
            </Box>
            <Button key={`use-${theme.id}`} variant={theme.id === active ? 'secondary' : 'primary'} onPress={run(() => applyTheme($, theme))}>
              Appliquer
            </Button>
            {isUser && (
              <Button key={`del-${theme.id}`} dimColor onPress={run(() => deleteTheme($, theme.id))}>
                Supprimer
              </Button>
            )}
          </Box>
        ))}
        <Box flexDirection="row" flexWrap="wrap" gap={1}>
          <Button key="random" onPress={run(() => applyRandom($))}>
            Au hasard
          </Button>
          <Button key="off" onPress={run(() => removeTheme($))}>
            Retirer le thème
          </Button>
        </Box>

        <Text bold size="heading">
          Au démarrage
        </Text>
        <Box flexDirection="row" flexWrap="wrap" gap={1}>
          {(Object.keys(MODE_LABELS) as StartMode[]).map(mode => (
            <Button key={`mode-${mode}`} variant={settings.mode === mode ? 'primary' : 'secondary'} onPress={run(() => setMode($, mode))}>
              {MODE_LABELS[mode]}
            </Button>
          ))}
        </Box>
        {settings.mode === 'time' && (
          <Box flexDirection="column" gap={1}>
            <Text dimColor size="caption">
              Choisissez un thème ci-dessus, puis cliquez sur « Pour le jour » ou « Pour la nuit ».
            </Text>
            <Box flexDirection="row" flexWrap="wrap" gap={1} alignItems="center">
              <Text>Jour : {labelOf(settings.dayId)}</Text>
              <Button key="set-day" onPress={run(() => setScheduleTheme($, 'day'))}>
                Pour le jour
              </Button>
            </Box>
            <Box flexDirection="row" flexWrap="wrap" gap={1} alignItems="center">
              <Text>Nuit : {labelOf(settings.nightId)}</Text>
              <Button key="set-night" onPress={run(() => setScheduleTheme($, 'night'))}>
                Pour la nuit
              </Button>
            </Box>
            <Input
              key="day-hour"
              label="Jour dès (h)"
              value={draftDayHour}
              onInput={value => {
                draftDayHour = value
              }}
              onSubmit={value => {
                draftDayHour = value
                run(() => setHours($, draftDayHour, draftNightHour))()
              }}
            />
            <Input
              key="night-hour"
              label="Nuit dès (h)"
              value={draftNightHour}
              onInput={value => {
                draftNightHour = value
              }}
              onSubmit={value => {
                draftNightHour = value
                run(() => setHours($, draftDayHour, draftNightHour))()
              }}
            />
          </Box>
        )}

        <Text bold size="heading">
          Créer un thème
        </Text>
        <Text dimColor size="caption">
          Un nom et deux couleurs au format #rrggbb : l'accent (boutons, liens) et le fond.
        </Text>
        <Input
          key="new-name"
          label="Nom"
          placeholder="forêt"
          value={draftName}
          onInput={value => {
            draftName = value
          }}
          onSubmit={value => {
            draftName = value
          }}
        />
        <Input
          key="new-accent"
          label="Accent"
          placeholder="#3ddc97"
          value={draftAccent}
          onInput={value => {
            draftAccent = value
          }}
          onSubmit={value => {
            draftAccent = value
            void redraw($)
          }}
        />
        <Input
          key="new-bg"
          label="Fond"
          placeholder="#0b1f17"
          value={draftBg}
          onInput={value => {
            draftBg = value
          }}
          onSubmit={value => {
            draftBg = value
            void redraw($)
          }}
        />
        {(accentPreview || bgPreview) && (
          <Text>
            Aperçu : {accentPreview ? <Text color={accentPreview}>■ accent </Text> : null}
            {bgPreview ? <Text color={bgPreview}>■ fond</Text> : null}
          </Text>
        )}
        <Button
          key="new-go"
          variant="primary"
          onPress={run(async () => {
            const text = await createFromColors($, draftName, draftAccent, draftBg)

            if (text.includes('créé et gardé')) {
              draftName = ''
              draftAccent = ''
              draftBg = ''
              currentCategory = 'Mes thèmes'
            }

            return text
          })}
        >
          Créer et appliquer
        </Button>
        {message !== '' && <Text>{message}</Text>}
      </Box>
    )
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const theme = BUILTIN_THEMES.find(t => t.id === e.props.scene)

    if (!theme?.scene) {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={theme.scene.svg} alt={theme.scene.alt} isInteractive />
  })
}
