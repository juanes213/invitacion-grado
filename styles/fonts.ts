import { Great_Vibes, Instrument_Serif, Montserrat, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'

const mono = localFont({
  src: [
    {
      path: '../public/fonts/Dosis-VariableFont_wght.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--next-font-mono',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'monospace',
  ],
})

const chalmers = localFont({
  src: [
    {
      path: '../public/fonts/MTD-Chalmers.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--next-font-chalmers',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'monospace',
  ],
})
const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--next-font-instrument-serif',
  preload: true,
})

const montserrat = Montserrat({
  weight: ['300', '400', '500'],
  style: ['normal'],
  display: 'swap',
  variable: '--next-font-montserrat',
  preload: true,
})

const playfair = Playfair_Display({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--next-font-playfair',
  preload: true,
})

const greatVibes = Great_Vibes({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--next-font-great-vibes',
  preload: true,
})

const fonts = [mono, chalmers, instrumentSerif, montserrat, playfair, greatVibes]
const fontsVariable = fonts.map((font) => font.variable).join(' ')

export { fontsVariable }
