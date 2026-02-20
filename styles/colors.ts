const colors = {
  black: 'oklch(0 0 0)',
  white: 'oklch(1 0 360)',
  gray: 'oklch(0.3 0 360)',
  green: 'oklch(0.8689 0.2868 142.6042)',
  gray90: 'oklch(0.9219 0 0)',
  sage: 'oklch(0.8211 0.0785 143.5)',
  slate: 'oklch(0.5412 0.0311 233.4)',
  paper: 'oklch(0.8032 0.0161 67.6)',
  cream: '#F7F3EE',
} as const

const themeNames = ['light', 'dark'] as const
const colorNames = ['primary', 'secondary', 'contrast'] as const

const themes = {
  light: {
    primary: colors.cream,
    secondary: 'oklch(0.15 0 0)',
    contrast: colors.gray,
  },
  dark: {
    primary: colors.black,
    secondary: colors.white,
    contrast: colors.gray,
  },
} as const satisfies Themes

export { colors, themeNames, themes }

// UTIL TYPES
export type Themes = Record<
  (typeof themeNames)[number],
  Record<(typeof colorNames)[number], string>
>
