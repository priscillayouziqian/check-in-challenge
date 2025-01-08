import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

const config = createTamagui({
  fonts: {
    body: createInterFont(),
    heading: createInterFont({
      face: {
        bold: { normal: 'InterBold' },
      },
    }),
  },
  tokens,
  themes,
  shorthands,
})

export default config 